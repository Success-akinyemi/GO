import AdminUserModel from "../model/Admin.js"
import BettingCodeModel from "../model/BettingCode.js"
import BettingPointBalanceModel from "../model/BettingPointBalance.js"
import UserModel from "../model/User.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function makeAdmin(req, res){
    //const { userId } = req.admin
    const userId = '66619f6e9d933d45705fb3de'
    const { id, role } = req.body
    try {
        const isUser = await UserModel.findById({ _id: id })
        if(!isUser){
            return res.status(404).json({ success: false, data: 'User with this ID does not exist in users database' })
        }

        const adminExist = await AdminUserModel.findOne({ userId: id })
        
        if(adminExist){
            return res.status(401).json({ success: false, data: `Admin user already exist with role as: ${adminExist.role}`})
        }

        const hashedPasswordCode = bcryptjs.hashSync(`${process.env.DEFAULT_ADMIN_PASSWORDCODE}`, 10)
        const hashedPasswordToken = bcryptjs.hashSync(`${process.env.DEFAULT_ADMIN_PASSWORDTOKEN}`, 10)
        const makeAdmin = AdminUserModel.create({
            userId: id, email: isUser.email, active: true, role, updatedBy: userId, passwordCode: hashedPasswordCode, passwordToken: hashedPasswordToken
        })

        res.status(201).json({ success: true, data: `new Admin updated.`})
    } catch (error) {
        console.log('UNABLE TO GET USER AND MAKE ADMIN',error)
        res.status(500).json({ success: false, data: error.message || 'Unable to get user and make admin.'})
    }
}

export async function updateAdmin(req, res){
    const { userId } = req.admin
    const { id, role, active } = req.body
    try {
        const isUser = await UserModel.findById({ _id: id })
        if(!isUser){
            return res.status(404).json({ success: false, data: 'User with this ID does not exist in users database' })
        }

        const adminExist = AdminUserModel.findOne({ userId: id })
        if(!adminExist){
            return res.status(401).json({ success: false, data: `Admin user does not exist`})
        }

        const makeAdmin = AdminUserModel.findByIdAndUpdate(
            adminExist._id,
            {
                $set: {
                    role: role,
                    active: active,
                    updatedBy: userId,
                }
            },
            { new: true }
        );

        res.status(200).json({ success: true, data: `Admin profile updated.`})
    } catch (error) {
        console.log('UNABLE TO USER USER AND ADMIN PROFILE',error)
        res.status(500).json({ success: false, data: error.message || 'Unable to update user admin profile.'})
    }
}

export async function deleteAdmin(req, res){
    //const { userId } = req.admin
    const { id } = req.body
    try {
        const adminExist = await AdminUserModel.findOne({ userId: id })
        if(!adminExist){
            return res.status(404).json({ success: false, data: `Admin user does not exist.`})
        }

        const deleteAdmin = await AdminUserModel.findByIdAndDelete({ _id: adminExist._id })

        res.status(200).json({ success: true, data: `Admin user deleted.`})
    } catch (error) {
        console.log('UNABLE TO DELETE ADMIN',error)
        res.status(500).json({ success: false, data: error.message || 'Unable to delete admin.'})
    }
}

export async function adminLogin(req, res){
    const { email } = req.body
    const { passwordToken, passwordCode } = req.body

    try {
        
        const user = await AdminUserModel.findOne({ email: email })
        if(!user){
            return res.status(404).json({ success: false, data: 'Invalid user'})
        }
        const validPasswordCode = bcryptjs.compareSync(passwordCode, user.passwordCode)
        if(!validPasswordCode){
            console.log('INVALID CODE')
            return res.status(401).json({ success: false, data: 'Invalid credentials'})
        }
        const validPasswordToken = bcryptjs.compareSync(passwordToken, user.passwordToken)
        if(!validPasswordToken){
            console.log('INVALID TOKEN')
            return res.status(401).json({ success: false, data: 'Invalid credentials'})
        }

        const { passwordCode: code, passwordToken: tokenCode , ...userData } = user._doc
        
        const token = jwt.sign({ id: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE})
        const expiryDate = new Date(Date.now() + 10 * 60 * 60 * 1000)
        res.cookie('gotoken', token, { httpOnly: true, expires: expiryDate, sameSite: 'None', secure: true } ).status(200).json({ success: true, token: token, isVerified: true, data: {success: true, data: userData }})
    } catch (error) {
        console.log('UNABLE TO LOGIN ADMIN', error)
        res.status(500).json({ success: false, data: 'Unable to Login' || error.message})
    }
}

//update passwordToken and passwordCode

export async function getAllAdmin(req, res){
    try {
        const allAdmins = await AdminUserModel.find()

        res.status(200).json({ success: true, data: allAdmins })
    } catch (error) {
        console.log('UNABLE TO GET ALL USERS', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to get all uers'})
    }
}

export async function signout(req, res){
    res.clearCookie('gotoken').status(200).json({success: true, data: 'Signout success'})
}