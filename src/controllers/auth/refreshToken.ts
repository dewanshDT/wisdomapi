import jwt from 'jsonwebtoken'
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  generateAccessToken,
} from '../../utils'
import { REFRESH_TOKEN_SECRET } from '../../config'

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) throw new ApiError(400, "'refreshToken' is required", [])

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (error: any, payload: any) => {
    if (error) throw new ApiError(403, "Invalid 'refreshToken'")

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
  })
})

export default refreshToken
