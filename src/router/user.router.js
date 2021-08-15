const Router = require('koa-router')
const {
  create,
  avatarInfo,
  message
} = require('../controller/user.controller')
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware')
const {
  verifyAuth
} = require('../middleware/auth.middleware')

const userRouter = new Router()



//用户注册接口
userRouter.post('/users', verifyUser, handlePassword, create)
//获取用户头像接口
userRouter.get('/:userId/avatar', avatarInfo)
//
userRouter.post('/message', verifyAuth,  message)

module.exports = userRouter