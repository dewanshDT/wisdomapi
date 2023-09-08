import jwt from 'jsonwebtoken'
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  generateAccessToken,
} from '../../utils'
import { REFRESH_TOKEN_SECRET } from '../../config'
import { Token } from '../../models'

const refreshToken = asyncHandler(async (req, res) => {
  const { token } = req.body

  if (!token) throw new ApiError(400, 'token is required', [])

  const refreshToken = await Token.findOne({
    where: {
      token: token,
    },
  })

  if (!refreshToken) throw new ApiError(403, 'Invalid token')

  if (refreshToken) {
    jwt.verify(
      refreshToken.token,
      REFRESH_TOKEN_SECRET,
      (error: any, payload: any) => {
        if (error) throw new ApiError(403, 'Invalid token')

        const accessToken = generateAccessToken(payload.userId)

        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { accessToken: accessToken },
              'token refreshed successfully',
            ),
          )
      },
    )
  }
})

export default refreshToken
