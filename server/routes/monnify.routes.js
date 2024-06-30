import express from 'express'
import * as controllers from '../controllers/monnifiy.controllers.js'
import { Protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/makePaymentMonnify').post(Protect, controllers.initialzePayment)
router.route('/transactionWebhook').post(controllers.transactionWebhook)
router.route('/verifyTransactionWebhook').post(controllers.verifyTransactionWebhook)

export default router