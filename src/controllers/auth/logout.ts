import { Token } from '../../models'
import { ApiError, ApiResponse, asyncHandler } from '../../utils'

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) throw new ApiError(400, "'refreshToken' is required", [])

  const num = await Token.destroy({ where: { token: refreshToken } })
  if (num)
    return res
      .status(204)
      .json(new ApiResponse(204, {}, 'logged out successfully'))
  else throw new ApiError(403, 'invalid refresh token', [])
})

export default logout
