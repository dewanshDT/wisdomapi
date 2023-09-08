import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { CORS_ORIGIN, PORT } from './src/config'
import { authRouter, userRouter } from './src/routes'
import { errorHandler } from './src/middlewares'

const app = express()

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
)
app.use(express.static('public')) // configure static file to save images locally

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', (req, res) =>
  res.status(200).json({ message: 'welcome to the wisdom circle api.' }),
)

// Routes
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
