import express from 'express'
import * as controllers from '../controllers/user.controllers.js'

const router = express.Router()

router.route('/updateUser').post(controllers.updateUser)

export default router