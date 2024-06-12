import mongoose from "mongoose";

const BettingSchema = new mongoose.Schema({
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
    }
},
{timestamps: true}
)

const BettingModel = mongoose.model('bettingModel', BettingSchema)
export default BettingModel