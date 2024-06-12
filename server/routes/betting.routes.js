import express from 'express'
import * as controllers from '../controllers/betting.controllers.js'
import { Protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/newBetSlip').post(Protect, controllers.newBetSlipId)

//GET
router.route('/getUserSlips').get(Protect, controllers.getUserSlips)
router.route('/getUserSlip').get(Protect, controllers.getUserSlip)


export default router