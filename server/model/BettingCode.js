import mongoose from "mongoose";

const BettingCodeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    slipId: {
        type: String,
        required: [true, 'Slip Id is required'],
        unique: [true, 'Slip with this Id already exist']
    },
    bettingCompaning: {
        type: String,
        required: [true, 'betting company is required'],
    },
    amountStaked:{
        type: Number,
    },
    verified: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        default: false
    }
},
{timestamps: true}
)

const BettingCodeModel = mongoose.model('bettingCodeModel', BettingCodeSchema)
export default BettingCodeModel