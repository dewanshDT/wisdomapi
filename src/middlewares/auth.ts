import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '../config'

interface URequest extends Request {
  user?: string | JwtPayload
}

export function authenticateToken(
  req: URequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed' })
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    res.locals.userId = user
    next()
  })
}
