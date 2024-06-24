import UserModel from "../model/User.js";

export async function updateUser(req, res){
    console.log('USER',  req.body.userId)
    const user = await UserModel.findById({ _id: req.body.userId})
    if(!user){
        return res.status(404).json({ success: false, data: 'No user exist'})
    }
    if(req.body.phoneNumber){
        const existingPhoneNumber = await UserModel.findOne({ phoneNumber });
        if (existingPhoneNumber) {
            return res.status(400).json({ success: false, data: 'Phone Number already exists. Please use another Phone Number' });
        }
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $set: {
                    username: req.body.userName,
                    fullName: req.body.fullName,
                    gender: req.body.gender,
                    phoneNumber: req.body.phoneNumber,
                    gender: req.body.gender
                }
            },
            { new: true }
        );


        const { resetPasswordToken, resetPasswordExpire, password: hashedPassword, ...userData } = user._doc
        res.status(201).json({ success: true, data: {success: true, data: userData }})
    } catch (error) {
        console.log('ERROR UPDATING USER', error)
        res.status(500).json({ success: false, data: error.message})
    }
}

export async function creditUserWallet(req, res){
    const { id, amount } = req.body
    try {
        const user = await UserModel.findById({ _id: id })
        if(!user){
           return res.status(404).json({ success: false, data: 'User not found'})
        }

        user.walletBalance += amount
        await user.save()

        res.status(200).json({ success: true, data: 'Wallet balance updated'})
    } catch (error) {
        console.log('UNABLE TO UPDATE USER WALLET.',error)
        res.status(500).json({ success: false, data: error.message || 'Unable to credit user wallet'})
    }
}