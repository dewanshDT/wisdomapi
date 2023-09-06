import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Token, User } from '../../models'
import { ApiError, ApiResponse, asyncHandler } from '../../utils'
import { REFRESH_TOKEN_SECRET } from '../../config'
import generateAccessToken from '../../utils/generateAccessToken'

const loginWithPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })

  // throw error when user doesn't exist or password incorrect
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(
      401,
      'Authentication Failed, username or password incorrect',
      [],
    )
  }

  // generate accessToken and refreshToken when user is found
  const accessToken = generateAccessToken(user.id)
  const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET)
  Token.create({
    userId: user.id,
    token: refreshToken,
  })

  return res.status(200).json(
    new ApiResponse(200, {
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  )
})

export default loginWithPassword
