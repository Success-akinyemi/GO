import BettingCodeModel from "../model/BettingCode.js"
import BettingPointBalanceModel from "../model/BettingPointBalance.js"
import schedule  from 'node-schedule'
import UserModel from "../model/User.js"
import TransactionModel from "../model/Transactions.js"

export async function activeBetCashback(req, res){
    const { _id } = req.user
    try {
        const userExist = await BettingPointBalanceModel.findOne({ userId: _id })
        if(userExist){
            userExist.active = true
            await userExist.save()
        }

        const newBetCashbackUser = await BettingPointBalanceModel.create({
            userId: _id, active: true
        })

        res.status(201).json({ success: true, data: 'Betting cash profile has ben activated' })
    } catch (error) {
        console.log('UNABLE TO ACTIVATE BETTING CASHBACK,', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to activate betting cashback' })
    }

}

export async function deactiveBetCashback(req, res){
    const { _id } = req.user
    try {
        const userExist = await BettingPointBalanceModel.findOne({ userId: _id })
        if(!userExist){
            return res.status(404).json({ success: true, data: 'User with Betting cash profile does not exist' })
        }
        
        userExist.active = false
        await userExist.save()
        res.status(200).json({ success: true, data: 'Betting cash profile has been Deactivated' })
    } catch (error) {
        console.log('UNABLE TO DEACTIVATE BETTING CASHBACK,', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to deactivate betting cashback' })
    }
}


export async function newBetSlipId(req, res){
    const { _id } = req.user
    const { slipId, bettingCompaning } = req.body
    try {
        const trimmedSlipId = slipId.trim()
        const getUser = BettingPointBalanceModel.findOne({ userId: _id })
        if(getUser.active === false){
            return res.status(403).json({ succes: false, data: 'You account is not active to upload ticket code'})
        }
        if(!_id){
            return res.status(404).json({ success: false, data: 'Invalid user'})
        }
        if(!slipId || !bettingCompaning){
            return res.status(404).json({ success: false, data: 'All feilds are required'})
        }

        const existingSlip = await BettingCodeModel.findOne({ slipId: trimmedSlipId })
        if(existingSlip){
            return res.status(400).json({ success: false, data: 'Betting slip with this id already exist.'})
        }

        const newSlip = await BettingCodeModel.create({
            userId: _id, slipId: trimmedSlipId, bettingCompaning
        })

        res.status(201).json({ success: true, data: 'Slip Id saved successfully'})
    } catch (error) {
        console.log('UNABLE TO SAVE BET TICKET SLIP ID,',error)
        res.status(500).json({ success: false, data: ''})
    }
} 

export async function getUserSlips(req, res){
    const { _id } = req.user
    const { id } = req.body

    let userId

    userId = _id ? _id : id
    try {
        const userSlips = await BettingCodeModel.find({ userId: userId })

        res.status(200).json({ success: true, data: userSlips})
    } catch (error) {
        console.log('UNABLE TO GET ALL USER SLIPS', error)
        res.status(500).json({ success: false, data: 'Counld not get bets slips'})
    } 
}

export async function getUserSlip(req, res){
    const { id } = req.params
    try {
        const userSlips = await BettingCodeModel.findById({ _id: id })

        res.status(200).json({ success: true, data: userSlips})
    } catch (error) {
        console.log('UNABLE TO GET USER SLIP', error)
        res.status(500).json({ success: false, data: 'Counld not get bet slip'})
    } 
}

export async function getBetPoint(req, res){
    const { _id } = req.user
    try {
        const betPoints = await BettingPointBalanceModel.findOne({ userId: _id })

        const { createdAt, _id: id, ...betPointsData  } = betPoints._doc
        res.status(200).json({ success: true, data: betPointsData})
    } catch (error) {
        console.log('UNABLE TO GET BET CASH POINT BALANCE', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to get bet cash point balance'})
    }
}

// auto daliy deduction
// Scheduler to run every 1 minute
const rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 1); // This task runs every 1 minute
let isRunning = false; 
// Schedule the task
const task = schedule.scheduleJob(rule, async () => {
    if (isRunning) {
        return;
    }

    isRunning = true;

    try {
        const users = await BettingPointBalanceModel.find({ active: true });

        for (const user of users) {
            try {
                const userModel = await UserModel.findById(user.userId);

                if (userModel) {
                    // Check if wallet balance is less than 100
                    if (userModel.walletBalance < 100) {
                        // Update the user's active status to false in BettingPointBalanceModel
                        user.active = false;
                        await user.save();
                    } else {
                        // Subtract 100 from the user's wallet balance
                        user.active = true;
                        await user.save();
                        userModel.walletBalance -= 100;
                        await userModel.save();
                        await TransactionModel.create({
                            amount: 100,
                            by: 'Bet cash back',
                            reason: 'Daily deduction for bet cash back',
                            type: 'debit',
                            for: userModel?._id
                        });
                    //console.log(`User with ID ${userModel.email} debited.`);
                    }
                } else {
                    console.log(`User with ID ${user.userId} not found.`);
                }
            } catch (userError) {
                console.log(`Error processing user with ID ${user.userId}:`, userError);
            } finally {
                isRunning = false; 
            }
        }
        console.log('User wallets and statuses updated successfully');
    } catch (error) {
        console.log('UNABLE TO UPDATE USER WALLETS AND STATUSES.', error);
    }
});



//**ADMIN ROUTE */

//active user bet slip and credit user
export async function VerifyBetSlipCode(req, res){
    const { userId, slipId } = req.body
    try {
        const findUserWithSlipId =  await BettingCodeModel.findOne({ slipId: slipId })
        if(!findUserWithSlipId){
            return res.status(404).json({ success: false, data: 'No slip with this bet id found'})
        }

        findUserWithSlipId.verified = true
        findUserWithSlipId.rejected = false
        findUserWithSlipId.save()

        const getUser = await BettingPointBalanceModel.findOne({ userId: userId })
        if(!getUser){
            return res.status(404).json({ success: false, data: 'No user with this id found'})
        }

        getUser.pointBalance += 1
        getUser.save()

        await TransactionModel.create({
            amount: 1,
            by: 'Bet cash back',
            reason: 'Bet slip verified points added',
            type: 'credit',
            for: userId
        });

        res.status(200).json({ success: true, data: 'Bet slip code verifed and user point balance updated.'})
    } catch (error) {
        console.log('UNABLE TO VERIFY BET SLIP', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to verify bet slip'})
    }
}

//reject user bet slip and credit user
export async function rejectBetSlipCode(req, res){
    const { userId, slipId } = req.body
    try {
        const findUserWithSlipId =  await BettingCodeModel.findOne({ slipId: slipId })
        if(!findUserWithSlipId){
            return res.status(404).json({ success: false, data: 'No slip with this bet id found'})
        }

        if(findUserWithSlipId.verified === true){
            findUserWithSlipId.rejected = true
            findUserWithSlipId.verified === false
            findUserWithSlipId.save()
            
            const getUser = await BettingPointBalanceModel.findOne({ userId: userId })
            getUser.pointBalance -= 1
            getUser.save()

            await TransactionModel.create({
                amount: -1,
                by: 'Bet cash back',
                reason: 'Bet slip rejected points minus',
                type: 'debit',
                for: userId
            });
            return res.status(404).json({ success: false, data: 'Bet slip code rejected.'})
        }

        findUserWithSlipId.rejected = true
        findUserWithSlipId.save()

        res.status(200).json({ success: true, data: 'Bet slip code rejected.'})
    } catch (error) {
        console.log('UNABLE TO REJECT BET SLIP', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to reject bet slip'})
    }
}

// get all bet slip verified or unverified
export async function getAllSlips(req, res){
    const { query } = req.body
    console.log('QUERY', query)
    try {

        const userSlips = query ? await BettingCodeModel.find({ verified: query }) : await BettingCodeModel.find()

        res.status(200).json({ success: true, data: userSlips})
    } catch (error) {
        console.log('UNABLE TO GET ALL USER SLIPS', error)
        res.status(500).json({ success: false, data: 'Counld not get bets slips'})
    } 
}