import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils'

// Error handler middleware
const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err

  if (error instanceof ApiError) {
    const statusCode = error.statusCode || error instanceof Error ? 400 : 500

    const message = error.message || 'Something went wrong'
    error = new ApiError(
      statusCode,
      message,
      (error as ApiError)?.errors || [],
      err.stack,
    )
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
  }

  return res
    .status(error instanceof ApiError ? error.statusCode : 500)
    .json(response)
}

export default errorHandler
