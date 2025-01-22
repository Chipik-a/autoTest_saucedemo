import dotenv from 'dotenv'
dotenv.config()

export const testUsers = {
  standardUser: {
    email: process.env.EMAIL_STANDART,
    password: process.env.PASSWORD_STANDART,
  },
  lockedUser: {
    email: process.env.EMAIL_LOCKED,
    password: process.env.PASSWORD_LOCKED,
  },
  visualUser: {
    email: process.env.EMAIL_VISUAL,
    password: process.env.PASSWORD_VISUAL
  }
}
