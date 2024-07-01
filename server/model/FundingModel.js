import mongoose from "mongoose";

const FundingSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'amount is required']
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'Paid by field is required']
    },
    email: {
        type: String
    },
    settlementAmount: {
        type: Number,
    },
    paidOn: {
        type: String
    },
    paymentMethod: {
        type: String
    },    
    paymentReference: {
        type: String
    },
    transactionReference: {
        type: String
    },
    paymentDescription:{
        type: String
    },
},
{ timestamps: true }
)

const FundingModel = mongoose.model('funding', FundingSchema)
export default FundingModel