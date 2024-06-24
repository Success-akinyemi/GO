import express from 'express'
import * as controllers from '../controllers/betting.controllers.js'
import { AdminProtect, Protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/activeBetCashback').post(Protect, controllers.activeBetCashback)
router.route('/deactiveBetCashback').post(Protect, controllers.deactiveBetCashback)
router.route('/newBetSlip').post(Protect, controllers.newBetSlipId)
router.route('/VerifyBetSlipCode').post(AdminProtect, controllers.VerifyBetSlipCode)



//GET
router.route('/getUserSlips').get(Protect, controllers.getUserSlips)
router.route('/getUserSlip/:id').get(Protect, controllers.getUserSlip)
router.route('/getBetPoint').get(Protect, controllers.getBetPoint)

router.route('/getAllSlips').get(AdminProtect, controllers.getAllSlips)


export default router