import { User } from '../../models'
import { ApiError, ApiResponse, asyncHandler } from '../../utils'

const userById = asyncHandler(async (req, res) => {
  const id = res.locals.userId

  const user = await User.findByPk(id)

  if (!user) throw new ApiError(400, 'User not found :(')

  return res
    .status(200)
    .json(new ApiResponse(200, user.getUser(), 'user found!'))
})

export default userById
