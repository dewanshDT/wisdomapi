import { Router } from 'express'
import {
  loginWithPassword,
  logout,
  refreshToken,
  registerUser,
  resendEmailVerification,
  verifyEmail,
} from '../controllers'
import { auth } from '../middlewares'

const router = Router()

// Create a new user and hash their password
router.route('/register').post(registerUser)

// Verify email
router.route('/verify-email/:id/:token').get(verifyEmail)

// Resend verification email
router.route('/resend-email-verification').get(auth, resendEmailVerification)

// Authenticate user and generate JWT token
router.route('/login').post(loginWithPassword)

// logging out with refresh token
router.route('/logout').post(auth, logout)

// refreshing access token
router.route('/token/refresh').post(refreshToken)

export default router
