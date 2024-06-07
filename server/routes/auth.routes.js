import express from 'express'
import * as controllers from '../controllers/auth.controllers.js'

const router = express.Router()

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.post('/forgotPassword', controllers.forgotPassword)
router.route('/:id/verify/:token').post(controllers.verifyNewUser)
router.get('/signout', controllers.signout)

//PUT ROUTES
router.route('/resetPassword/:resetToken').put(controllers.resetPassword)

export default router