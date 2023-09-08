import { Router } from 'express'
import { userById } from '../controllers'
import { auth } from '../middlewares'

const router = Router()

// get user data from id
router.route('/me').get(auth, userById)

export default router
