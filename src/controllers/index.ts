// user routes
export { default as userById } from './user/userById'

// auth routes
export { default as registerUser } from './auth/registerUser'
export { default as loginWithPassword } from './auth/loginWithPassword'
export { default as logout } from './auth/logout'
export { default as refreshToken } from './auth/refreshToken'
export { default as verifyEmail } from './auth/verifyEmail'
export { default as resendEmailVerification } from './auth/resendEmailVerification'
