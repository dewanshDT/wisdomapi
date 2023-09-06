import { User } from '../../models'
import { ApiError, ApiResponse, asyncHandler } from '../../utils'

const verifyEmail = asyncHandler(async (req, res) => {
  const { token, id } = req.params

  console.log('################', id, '############', token)

  if (!token) {
    throw new ApiError(400, 'Email verification token is missing')
  }

  const user = await User.findByPk(id)
  if (user?.checkEmailVerificationToken(token))
    return res
      .status(200)
      .json(
        new ApiResponse(200, { isEmailVerified: true }, 'Email is verified!'),
      )
  else throw new ApiError(409, 'Token is invalid')
})

export default verifyEmail
