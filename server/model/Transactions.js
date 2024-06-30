import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    type: {
        type: String
        //credit or debit
    },
    reason: {
        type: String,
    },
    amount: {
        type: Number
    },
    by:{
        type: String,
        //admin_id || payment_api, bet_cash_back, others
    },
    for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    acountFunding: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    }
},
{timestamps: true}
)

const TransactionModel = mongoose.model('transaction', TransactionSchema)
export default TransactionModel