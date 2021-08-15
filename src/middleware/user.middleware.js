const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  // 获取电话和密码
  const {telephone, password} = ctx.request.body
      
  // 判断电话和密码不能为空
  if(!telephone || !password) {
    const err = new Error(errorType.TELEPHONE_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', err, ctx)
  }

  //判断这次注册的电话是没有被注册过
  const result = await service.getUserByTelephone(telephone)
  //length有值，表示手机号存在
  if(result.length){
    const error = new Error(errorType.TELEPHONE_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

async function handlePassword(ctx, next) {
  let {password} = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}