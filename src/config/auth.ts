import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { User } from '../entity/common/User'

export const signInToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.SERVER_TOKEN_SECRET,
    {
      expiresIn: '2d',
    },
  )
}

export const tokenForVerify = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      password: user.password,
    },
    process.env.SERVER_TOKEN_ISSUER,
    { expiresIn: '15m' },
  )
}

export const isAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1]
    if (token) {
      jwt.verify(token, process.env.SERVER_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return res.status(404).json({
            message: error,
            error,
          })
        } else {
          res.locals.jwt = decoded
          next()
        }
      })
    }
  } catch (error) {
    res.status(401).send({
      message: error,
    })
  }
}

export const isAdmin = async (req, res, next) => {
  const admin = await User.findOne({})
  if (admin) {
    next()
  } else {
    res.status(401).send({
      message: 'User is not Admin',
    })
  }
}

module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
}
