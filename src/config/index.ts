import { config } from 'dotenv'
config()

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || ''
export const ACCESS_TOKEN_EXPIRY = '100m'
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || ''
export const DB_USER_NAME = process.env.DB_USER_NAME || ''
export const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD || ''
export const DB_NAME = process.env.DB_NAME || ''
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'localhost:3000'
export const HOST = process.env.HOST || 'http://localhost:8000'
export const PORT = process.env.PORT || 8000

export { sequelize } from './database'
