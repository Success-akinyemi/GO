import TokenModel from "../model/Token.js";
import UserModel from "../model/User.js";
import { registerMail } from "../utils/mailer.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'
import Mailgen from 'mailgen'

const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Go',
        link: `${process.env.MAIL_WEBSITE_LINK}`
    }
})

async function generateUniqueUserName() {
    let unique = false;
    let userName = '';

    while (!unique) {
        // Generate a random number between 10000 and 99999
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        userName = `User${randomNum}`;

        // Check if the generated userName already exists in the database
        const existingUser = await UserModel.findOne({ userName });
        if (!existingUser) {
            unique = true;
        }
    }

    return userName;
}

export async function register(req, res) {
    console.log(req.body);
    const { email, fullName, password, phoneNumber, ConfirmPassword, referredBy } = req.body;
    console.log(email, fullName, password, phoneNumber, ConfirmPassword, referredBy);

    if (!email || !password || !fullName || !phoneNumber || !ConfirmPassword) {
        return res.status(400).json({ success: false, data: 'Please provide all required fields' });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, data: 'Passwords must be at least 6 characters long' });
    }

    if (password !== ConfirmPassword) {
        return res.status(400).json({ success: false, data: 'Passwords do not match' });
    }

    const specialChars = /[!@#$%^&*()_+{}[\]\\|;:'",.<>?]/;
    if (!specialChars.test(password)) {
        return res.status(400).json({ success: false, data: 'Passwords must contain at least one special character' });
    }

    try {
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, data: 'Email already exists. Please use another email' });
        }

        const existingPhoneNumber = await UserModel.findOne({ phoneNumber });
        if (existingPhoneNumber) {
            return res.status(400).json({ success: false, data: 'Phone Number already exists. Please use another Phone Number' });
        }

        // Generate a unique username
        const userName = await generateUniqueUserName();

        const user = await UserModel.create({ fullName, email, password, phoneNumber, userName });
        console.log('USER CREATED');

        const referralLink = `${process.env.CLIENT_URL}/registration?ref=${user._id}`;
        user.referralLink = referralLink;
        await user.save();

        if (referredBy) {
            const referrer = await UserModel.findById(referredBy);
            if (referrer) {
                referrer.referrals.push(user._id);
                await referrer.save();
                user.referredBy = referrer._id;
                await user.save();
            } else {
                console.log('REFERRER NOT FOUND');
            }
        }

        const token = await new TokenModel({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        }).save();

        const verifyUrl = `${process.env.MAIL_WEBSITE_LINK}/${user._id}/verify/${token.token}`;

        try {
            await registerMail({
                username: user.fullName,
                userEmail: user.email,
                subject: 'SIGNUP SUCCESSFUL',
                intro: 'PLEASE VERIFY EMAIL',
                instructions: 'You Have Successfully Signed Up, Please Click on the Button Below to verify your Email Address. Note Email is Valid for One (1) Hour.',
                outro: `
                If you cannot click the reset button, copy and paste the url here in your browser ${verifyUrl}
                  \n  
                If you did not Sign Up, please ignore this email and report.
                `,
                verifyUrl: verifyUrl,
                text: 'Verify Email',
            });

            return res.status(200).json({ success: true, data: `Verification Email Sent to ${email}` });
        } catch (error) {
            console.log('ERROR SENDING VERIFY EMAIL', error);
            return res.status(500).json({ success: false, data: 'Email could not be sent' });
        }
    } catch (error) {
        console.log('ERROR REGISTERING USER', error);
        res.status(500).json({ success: false, data: 'Unable to create account' });
    }
}

export async function verifyNewUser(req, res, next){
    const { id } = req.params
    const { token } = req.params
    console.log('PARAMS ID', id)
    console.log('TOKEN', token)
    try {
        const user = await UserModel.findById({ _id: id})
        console.log('ID', user._id)
        if(!user){
            return res.status(400).json({ success: false, data: 'Invalid Link'})
        }

        const token = await TokenModel.findOne({
            userId: user._id,
            token: req.params.token
        })

        if(!token){
            return res.status(400).json({ success: false, data: 'Invalid Link'})
        }

        //await UserModel.updateOne({ _id: user._id, verified: true})
        user.verified = true;
        await user.save()
        
        await TokenModel.deleteOne({ _id: token._id })

        sendToken(user, 200, res)
    } catch (error) {
        console.log('COULD NOT VERIFY USER', error)
        res.status(500).json({ success: false, data: 'Unable to Verify User Account' })        
    }
}

export async function login(req, res){
    const { email, password } = req.body;
    console.log(email, password)

    if(!email || !password){
        return res.status(401).json({ success: false, data: 'Please provide an email and password'})
    }

    try {
        const user = await UserModel.findOne({ email }).select('+password');
        
        if(!user){
            return res.status(401).json({ success: false, data: 'Invalid User'})
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            return res.status(401).json({ success: false, data: 'Invalid Password'})
        }

        if(!user.verified){
            console.log('working')
            let token = await TokenModel.findOne({ userId: user._id})
            if(!token){
                const token = await new TokenModel({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save()
        
                const verifyUrl = `${process.env.MAIL_WEBSITE_LINK}/${user._id}/verify/${token.token}`
        
                try {
                    // send mail
                    const emailContent = {
                        body: {
                            intro: 'PLEASE VERIFY EMAIL',
                            action: {
                                instructions: `Your Supergig Account is not yet valid, Please Click on the Button Below to verify your Email Address. Note Email is Valid for One (1) Hour.`,
                                button: {
                                    color: '#33b5e5',
                                    text: 'Verify Your Email',
                                    link: verifyUrl
                                },
                            },
                            outro: `
                                If you cannot click the reset button, copy and paste the url here in your browser ${verifyUrl}
        
                                If you did not SignUp to Supergig, please ignore this email and report.
                            `
                        },
                    };
        
                    const emailTemplate = mailGenerator.generate(emailContent)
                    const emailText = mailGenerator.generatePlaintext(emailContent)
                    
                    await sendEmail({
                        to: user.email,
                        subject: 'Verify Your Email',
                        text: emailTemplate
                    })
        
                    return res.status(200).json({success: true, isVerified: false , data: `Verification Email Sent. Check your email address and verify your account`})
                } catch (error) {
                    console.log('ERROR SENDING VERIFY EMAIL', error)
                    return res.status(500).json({ success: false, data: 'Email could not be sent'})
                }
            } else{
                return res.status(200).json({ success: false, isVerified: false, data: 'Account Not Verified. An Email Has been sent to You Please Verify Account'})
            }
        }


        //sendToken(user, 200, res)
        const token = user.getSignedToken();
        const expiryDate = new Date(Date.now() + 10 * 60 * 60 * 1000)
        const { resetPasswordToken, resetPasswordExpire, password: hashedPassword, ...userData } = user._doc
        //res.status(200).json({ success: true, token: token, isVerified: true, data: {success: true, data: userData }})
        res.cookie('token', token, { httpOnly: true, expires: expiryDate, sameSite: 'None', secure: true } ).status(200).json({ success: true, token: token, isVerified: true, data: {success: true, data: userData }})
    } catch (error) {
        console.log('ERROR LOGGING USER', error)
        res.status(500).json({ success: false, data: error.message})
    }
}

export async function forgotPassword (req, res, next){
    const { email} = req.body

    if(!email){
        return res.status(404).json({ success: false, data: 'Provide your registered email address'})
    }

    try {
        const user = await UserModel.findOne({ email });

        if(!user){
            return res.status(404).json({ success: false, data: 'Email Does Not Exist'})
        }

        const resetToken = user.getResetPasswordToken()

        await user.save()

        const resetUrl = `${process.env.MAIL_WEBSITE_LINK}/newPassword/${resetToken}`

        try {
            // send mail
            const emailContent = {
                body: {
                    intro: 'You have Requested a password reset.',
                    action: {
                        instructions: 'Please click the following button to reset your password. Link Expires in 10 mintues',
                        button: {
                            color: '#33b5e5',
                            text: 'Reset Your Password',
                            link: resetUrl
                        },
                    },
                    outro: `
                        If you cannot click the reset button, copy and paste the url here in your browser ${resetUrl}

                        If you did not request this reset, please ignore this email.
                    `
                },
            };

            const emailTemplate = mailGenerator.generate(emailContent)
            const emailText = mailGenerator.generatePlaintext(emailContent)
            
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Request',
                text: emailTemplate
            })

            res.status(200).json({success: true, msg: 'Email sent', data: email })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()
            return res.status(500).json({ success: false, data: 'Email could not be sent' })
        }
    } catch (error) {
        console.log('ERROR GENERATING RESET LINK', error)
        res.status(500).json({ success: false, data: error.message})
    }
}

export async function resetPassword (req, res, next){
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    try {
        const user = await UserModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now()}
        })

        if(!user){
            return  res.status(400).json({ success: false, data: 'Invalid Reset Token'})
        }

        user.password = req.body.password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined

        await user.save();

        res.status(201).json({
            success: true,
            data: 'Password Reset success'
        })
    } catch (error) {
        console.log('ERROR RESETING USER PASSWORD', error)
        res.status(500).json({ success: false, data: error.message})
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token, isVerified: true})
}

export async function signout(req, res){
    res.clearCookie('accessToken').status(200).json({success: true, data: 'Signout success'})
}
