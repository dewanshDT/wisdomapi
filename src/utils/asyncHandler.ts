import { NextFunction, Request, Response } from 'express'

type ReqHandlerType = (req: Request, res: Response, next: NextFunction) => void

const asyncHandler = (requestHandler: ReqHandlerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }
}

export default asyncHandler
