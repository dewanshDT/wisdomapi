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
router.route('/verify-email/:userId/:verificationToken').post(verifyEmail)

// Resend verification email
router.route('/resend-email-verification').post(auth, resendEmailVerification)

// Authenticate user and generate JWT token
router.route('/login').post(loginWithPassword)

// logging out with refresh token
router.route('/logout').post(logout)

// refreshing access token
router.route('/refresh-token').post(refreshToken)

export default router
