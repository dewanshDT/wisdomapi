import { HOST } from '../../config'
import { User } from '../../models'
import { ApiError, ApiResponse, asyncHandler, sendMail } from '../../utils'

const resendEmailVerification = asyncHandler(async (req, res) => {
  const user = await User.findByPk(res.locals.userId)

  const token = user?.getEmailVerificationToken()

  if (token) {
    sendMail({
      from: 'no-reply@example.com',
      to: `${user?.email}`,
      subject: 'Account Verification Link',
      text: `Hello ${user?.firstName},\n\nPlease verify your email by clicking the link below:\n${HOST}/api/auth/verify-email/${user?.id}/${token}\n\nThank You!`,
    })

    //if token is not created, send a status of 400
  } else {
    throw new ApiError(400, 'token not created')
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Sent verification email'))
})

export default resendEmailVerification
