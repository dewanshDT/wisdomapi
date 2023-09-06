import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '../config'

function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed' })
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    res.locals.user = user
    next()
  })
}

export default auth
