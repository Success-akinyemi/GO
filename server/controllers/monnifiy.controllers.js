//import { encodeBase64 } from 'bcryptjs';
import schedule  from 'node-schedule'
import axios from 'axios'
import MonnifyModel from '../model/Monnify.js';
import { v4 as uuidv4 } from 'uuid';

// Scheduler to run every 45 minute
const rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 45); // This task runs every 45 minute
let isRunningMonnify = false; 
// Schedule the task
const task = schedule.scheduleJob(rule, async () => {
    if (isRunningMonnify) {
        return;
    }

    isRunningMonnify = true;

    try {
        const apikey = process.env.MONNIFY_API_KEY
        const secretKey = process.env.MONNIFY_SECRET_KEY
        const monnifyUrl = process.env.MONNIFY_API
        

        const decodeApikey = btoa(`${apikey}:${secretKey}`)
        
        const res = await axios.post(
            `${monnifyUrl}/api/v1/auth/login`,
            {},
            {
                headers: {
                    Authorization: `Basic ${decodeApikey}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        const token = res?.data.responseBody.accessToken

        if(token){
            await MonnifyModel.findOneAndUpdate(
                {},
                { apikey: token },
                { upsert: true, new: true}
            )
        }

        console.log('TOKEN SAVED SUCCESSFUL')

    } catch (error) {
        console.log('UNABLE TO GENERATE AN API AUTHORIZATION TOKEN FOR MONNIFY', error)
    } finally {
        isRunningMonnify = false
    }
});

export async function initialzePayment(req, res){

    const {amount} = req.body
    const user = req.user
    try {

        if(amount < 500){
            return res.status(400).json({ success: false, data: 'Minimuim amount to fund wallet is 500' })
        }
        const userId = user._id
        const generatedUniqueCode = `${userId}-${uuidv4()}`;
        const monnifyUrl = process.env.MONNIFY_API
        const callbackUrl = process.env.CALLBACK_URL
        const contractCode = process.env.MONNIFY_CONTRACT_CODE
        const tokenDoc = await MonnifyModel.findOne();
        const token = tokenDoc ? tokenDoc.apikey : null;

        if (!token) {
            return res.status(404).json({ success: false, data: 'Monnify token not found' });
        }

        const response = await axios.post(
            `${monnifyUrl}/api/v1/merchant/transactions/init-transaction`,
            {
                amount: amount,
                customerName: `${user.fullName}`,
                customerEmail: `${user.email}`,
                paymentReference: generatedUniqueCode,
                paymentDescription: "Wallet Funding",
                currencyCode: "NGN",
                contractCode: contractCode,
                redirectUrl: callbackUrl,
                paymentMethods:["CARD","ACCOUNT_TRANSFER", "USSD"]
            },
            {
                headers: {
                    Authorization: `bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        console.log(response.data.responseBody.checkoutUrl)
        res.send({ authorizationUrl: response.data.responseBody.checkoutUrl });

    } catch (error) {
        console.log('UANBLE TO INITIALIZE MONNIFY ONE TIME PAYMENT', error)
        console.log('UANBLE TO INITIALIZE MONNIFY ONE TIME PAYMENT', error.data)
        res.status(500).json({ success: false, data: error.message || 'Unable to intialze a payment transaction'})
    }
}

//webhooks
export async function transactionWebhook(req, res){
    console.log('MONNIFY API>>>', req)
    try {
        
    } catch (error) {
        
    }
}

export async function verifyTransactionWebhook(req, res){
    console.log('MONNIFY API>>>', req.body)
    try {
        
    } catch (error) {
        
    }
}