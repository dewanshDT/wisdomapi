import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET } from '../config'

const generateAccessToken = (userId: string) =>
  jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  })

export default generateAccessToken
