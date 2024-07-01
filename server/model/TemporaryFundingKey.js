import mongoose from "mongoose";

const TemporaryFundingKeySchema = new mongoose.Schema({
    paymentReference: {
        type: String,
        required: [true, 'payment reference is required']
    },
    transactionReference: {
        type: String,
        required: [true, 'transaction reference is required']
    },
    verified:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 3600 //1Hour
    }
},
{timestamps: true}
)

const TemporaryFundingKeyModel = mongoose.model('temporaryFundingKey', TemporaryFundingKeySchema)
export default TemporaryFundingKeyModel