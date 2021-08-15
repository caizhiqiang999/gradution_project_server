const jwt = require('jsonwebtoken')
const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
  // 获取用户名和密码
  const {telephone, password} = ctx.request.body
  // 判断用户名和密码是否为空
  if(!telephone || !password) {
    const err = new Error(errorType.TELEPHONE_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', err, ctx)
  }
  // 判断用户是否存在
  const result = await service.getUserByTelephone(telephone)
  const user = result[0]
  // 如果用户不存在
  if(!user){
    const error = new Error(errorType.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  // 判断密码是否和数据库中的一致
  if(md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  // 获取token,如果没有token,authorization是undefined
  const authorization = ctx.headers.authorization
  if(!authorization) {
    const error = new Error(errorType.UNAUTHORZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  // 验证token
  try{
    //验证成功的话，result里是之前token里所携带的数据（id/name...）
    const result = jwt.verify(token, '123456')
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorType.UNAUTHORZATION)
    ctx.app.emit('error', error, ctx)
  }
}
  // 这个东西非常重要，验证权限
const verifyPermission = async (ctx, next) => {
  // 获取表名
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  
  const resourceId = ctx.params[resourceKey]
  const {id} = ctx.user

  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id)
    if(!isPermission) throw new Error()
    await next()
  } catch (err) {
    const error = new Error(errorType.UNPREMISSION)
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}