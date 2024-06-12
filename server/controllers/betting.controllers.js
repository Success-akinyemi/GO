import BettingModel from "../model/Betting.js"

export async function newBetSlipId(req, res){
    const { id } = req.user
    const { slipId, bettingCompaning } = req.body
    try {
        if(!id){
            return res.status(404).json({ success: false, data: 'Invalid user'})
        }
        if(!slipId || !bettingCompaning){
            return res.status(404).json({ success: false, data: 'All feilds are required'})
        }

        const existingSlip = await BettingModel.findOne({ slipId: slipId })
        if(existingSlip){
            return res.status(400).json({ success: false, data: 'Betting slip with this id already exist.'})
        }

        const newSlip = await BettingModel.create({
            userId: id, slipId, bettingCompaning
        })

        res.status(201).json({ success: true, data: 'Slip Id saved successfully'})
    } catch (error) {
        console.log('UNABLE TO SAVE BET TICKET SLIP ID,',error)
        res.status(500).json({ success: false, data: ''})
    }
} 

export async function getUserSlips(req, res){
    const { id } = req.user
    try {
        const userSlips = await BettingModel.find({ userId: id })

        res.status(200).json({ success: true, data: userSlips})
    } catch (error) {
        console.log('UNABLE TO GET USER SLIPS', error)
        res.status(500).json({ success: false, data: 'Counld not get betting slips'})
    } 
}

export async function getUserSlip(req, res){
    const { id } = req.body
    try {
        const userSlips = await BettingModel.findById({ _id: id })

        res.status(200).json({ success: true, data: userSlips})
    } catch (error) {
        console.log('UNABLE TO GET USER SLIP', error)
        res.status(500).json({ success: false, data: 'Counld not get betting slip'})
    } 
}