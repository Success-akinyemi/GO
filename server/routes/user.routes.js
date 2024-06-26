import express from 'express'
import * as controllers from '../controllers/user.controllers.js'
import { AdminProtect, Protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/updateUser').post(controllers.updateUser)
router.route('/creditUserWallet').post(AdminProtect, controllers.creditUserWallet)
router.route('/updateNotifications').post(Protect, controllers.updateNotifications)


//GET
router.route('/getAllUsers').get(AdminProtect, controllers.getAllUsers)
router.route('/getAllUser/:id').get(AdminProtect, controllers.getAllUsers)
router.route('/getAllUserNotification').get(Protect, controllers.getAllUserNotification)



export default router