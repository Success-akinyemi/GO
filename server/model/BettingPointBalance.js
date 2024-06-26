import mongoose from "mongoose";

const BettingPointBalanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    pointBalance: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: false
    }
},
{timestamps: true}
)

const BettingPointBalanceModel = mongoose.model('BettingPointBalance', BettingPointBalanceSchema)
export default BettingPointBalanceModel