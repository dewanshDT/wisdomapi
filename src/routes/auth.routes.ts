import { Router } from 'express'
import {
  loginWithPassword,
  logout,
  refreshToken,
  registerUser,
} from '../controllers'

const router = Router()

// Create a new user and hash their password
router.route('/register').post(registerUser)

// Authenticate user and generate JWT token
router.route('/login').post(loginWithPassword)

// logging out with refresh token
router.route('logout').post(logout)

// refreshing access token
router.route('/refresh-token').post(refreshToken)

export default router
