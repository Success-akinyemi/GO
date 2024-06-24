import express from 'express'
import * as controllers from '../controllers/user.controllers.js'

const router = express.Router()

router.route('/updateUser').post(controllers.updateUser)
router.route('/creditUserWallet').post(controllers.creditUserWallet)


export default router