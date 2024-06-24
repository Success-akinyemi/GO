import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email address of user to made admin is required']
    },
    role: {
        type: String,
        default: 'staff'
        //staff, manager, grandAdmin, 
    },
    active: {
        type: Boolean,
        default: true,
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true
    },
    passwordToken: {
        type: String,
        required: [true, 'Password Token is required']
    },
    passwordCode: {
        type: String,
        required: [true, 'Password Code is required']
    }
},
{timestamps: true}
)

const AdminUserModel = mongoose.model('adminuser', AdminUserSchema)
export default AdminUserModel