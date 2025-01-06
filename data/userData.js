import dotenv from 'dotenv'
dotenv.config()

export const testUsers = {
  standartUser: {
    email: process.env.EMAIL_STANDART,
    password: process.env.PASSWORD_STANDART,
  },
  lockedUser: {
    email: process.env.EMAIL_LOCKED,
    password: process.env.PASSWORD_LOCKED,
  },
}
