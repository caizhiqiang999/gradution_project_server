const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message

  switch (error.message) {
    case errorTypes.TELEPHONE_OR_PASSWORD_IS_REQUIRED:
      status = 400
      message = '手机号或密码不能为空'
      break;
    case errorTypes.TELEPHONE_ALREADY_EXISTS:
      status = 409
      message = '手机号已经存在'
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400
      message = '用户不存在'
      break;
    case errorTypes.PASSWORD_ERROR:
      status = 400
      message = '密码错误'
      break;
    case errorTypes.UNAUTHORZATION:
      status = 401
      message = '未授权'
      break;
    case errorTypes.UNPREMISSION:
      status = 401
      message = '不具备操作权限'
      break;
    case errorTypes.CONTENTERROE:
      status = 403
      message = '内容有误，无法提交'
      break;
    default:
      status = 404
      message = 'NOT FOUND'
  }
  ctx.status = status
  ctx.body = message
};

module.exports = errorHandler