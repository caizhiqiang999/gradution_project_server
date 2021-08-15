const fs = require('fs')
const fileService = require('../service/file.service')
const { create, setMessage } = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    //参数解析
    const { telephone, password } = ctx.request.body
    console.log(password)
    //操作数据库
    const result = await create(telephone, password)
    console.log(result)
    //返回结果
    ctx.body = result
  }

  async avatarInfo(ctx, next) {
    const {userId} = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)

    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`./uploads/avatar/${avatarInfo.filename}`)
  }
  
  async message(ctx, next) {
    let { nickname, age, email } = ctx.request.body
    const userId = ctx.user.id
    // age = age.replace('T16:00:00.000Z', '')
    console.log(nickname, age, email, userId)
    const message = await setMessage(nickname, age, email, userId)
    ctx.body = message
  }
}

module.exports = new UserController()