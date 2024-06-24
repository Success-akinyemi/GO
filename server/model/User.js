import mongoose from "mongoose";
import crypto from 'crypto'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import { type } from "os";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please add a username']
    },
    userName: {
        type: String,
        unique: [true, 'user name already exist'],
        required: [true, 'Please add a user name'] ,
    },
    email: {
        type: String,
        required: [true, 'Please add a email'] ,
        unique: [true, 'Email already exist']
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: [true, 'phone number already exist']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    profileImage: {
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/success-clone.appspot.com/o/user_1177568.png?alt=media&token=3c4010b0-526b-4f76-ae30-d0e74d76716e'
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    referrals: {
        type: Array
    },
    referralLink: {
        type: String,
        default: ''
    },
    verified: {
        type: Boolean,
        default: false
    },
    walletBalance: {
        type: Number,
        default: 0
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
{timestamps: true}
)

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        return next();
    };
  
    try {
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.matchPasswords = async function(password){
    return await bcryptjs.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function(){
    return jsonwebtoken.sign({ id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE})
}

UserSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

    return resetToken
}


const UserModel = mongoose.model('user', UserSchema)
export default UserModel