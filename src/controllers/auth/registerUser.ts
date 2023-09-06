import { Token, User } from '../../models'
import {
  sendMail,
  ApiError,
  asyncHandler,
  ApiResponse,
  generateAccessToken,
} from '../../utils'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  HOST,
  REFRESH_TOKEN_SECRET,
} from '../../config'

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, mobileNumber, password } = req.body
  const passwordHash = await bcrypt.hash(password, 10)

  //saving the user
  const user = await User.create({
    firstName,
    lastName,
    email,
    mobileNumber,
    password: passwordHash,
  })

  //if user details is captured
  //create a token with crypto.js

  if (user) {
    const emailVerificationToken = user.getEmailVerificationToken()

    //if token is created, send the user a mail
    if (emailVerificationToken) {
      //send email to the user
      //with the function coming from the mailing.js file
      //message containing the user id and the token to help verify their email
      sendMail({
        from: 'no-reply@example.com',
        to: `${email}`,
        subject: 'Account Verification Link',
        text: `Hello ${firstName},\n\nPlease verify your email by clicking the link below:\n${HOST}/api/users/verify-email/${user.id}/${emailVerificationToken}\n\nThank You!`,
      })

      //if token is not created, send a status of 400
    } else {
      throw new ApiError(400, 'token not created', [])
    }

    const accessToken = generateAccessToken(user.id)
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET)
    Token.create({
      userId: user.id,
      token: refreshToken,
    })

    //send users details
    return res.status(201).json(
      new ApiResponse(
        201,
        {
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        'user registered',
      ),
    )
  } else {
    throw new ApiError(409, 'Details are not correct', [])
  }
})

export default registerUser
