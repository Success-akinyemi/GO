import express from 'express'
import * as controllers from '../controllers/admin.controllers.js'
import { Protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/adminLogin').post(controllers.adminLogin)
router.route('/makeAdmin').post(controllers.makeAdmin)
router.route('/deleteAdmin').post(controllers.deleteAdmin)
router.get('/signout', controllers.signout)



//GET 
router.route('/getAllAdmin').get(controllers.getAllAdmin)


export default router