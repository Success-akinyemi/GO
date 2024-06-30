import TransactionModel from "../model/Transactions.js";
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

export async function creditUserWallet(req, res) {
    const { id, amount } = req.body;
    const { userId } = req.admin;

    try {
        const user = await UserModel.findById({ _id: id });
        if (!user) {
            return res.status(404).json({ success: false, data: 'User not found' });
        }

        const currentBalance = Number(user.walletBalance);
        const creditAmount = Number(amount);

        user.walletBalance = currentBalance + creditAmount;
        await user.save();

        const newTransaction = await TransactionModel.create({
            amount: creditAmount,
            by: userId,
            reason: 'Manual account funding for user',
            type: 'credit',
            for: user._id
        });

        res.status(200).json({ success: true, data: 'Wallet balance updated' });
    } catch (error) {
        console.log('UNABLE TO UPDATE USER WALLET.', error);
        res.status(500).json({ success: false, data: error.message || 'Unable to credit user wallet' });
    }
}


export async function getAllUsers(req, res){
    
    const { id } = req.params
    try {
        let allUsers 
        if(id){
            allUsers = await UserModel.findById({ _id: id })
            if(!allUsers){
                return res.status(404).json({ success: false, data: 'User not found' })
            }
        } else {
            allUsers = await UserModel.find()
        }

        res.status(200).json({ success: true, data: allUsers })
    } catch (error) {
        console.log('UNABLE TO GET ALL USERS', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to get all users'})
    }
}

export async function getAllUserNotification(req, res){
    const { _id } = req.user
    try {
        const notifications =  await TransactionModel.find({ for: _id })

        res.status(200).json({ success: true, data: notifications })
    } catch (error) {
        console.log('UNABLE TO GET NOTIFICATIONS OF USER', error)
        res.status(500).json({ success: false, data: error.merssage || 'unable to get user nortifiactions'})
    }
}

export async function getAllUserTransactions(req, res){
    const { _id } = req.user
    try {
        const transactions =  await TransactionModel.find({ acountFunding: true })

        res.status(200).json({ success: true, data: transactions, for: _id })
    } catch (error) {
        console.log('UNABLE TO GET TRANSACTIONS OF USER', error)
        res.status(500).json({ success: false, data: error.message || 'unable to get user transactions'})
    }
}

export async function updateNotifications(req, res){
    const { userId } = req.body
    try {
        // Find and update all notifications for the user
        await TransactionModel.updateMany(
            { for: userId, read: false }, // Match criteria
            { $set: { read: true } } // Update action
        );

        res.status(200).json({ success: true, data: 'Notifications updated successfully' });
    } catch (error) {
        console.log('UNABLE TO UPDATE USER NOTIFICATIONS', error)
        res.status(500).json({ succes: false, data: 'Unable to update notifications'})
    }

}