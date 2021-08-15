const jwt = require('jsonwebtoken')

class AuthController {
  async login(ctx, next){
    const { id, telephone, nickname, avatar_url } = ctx.user
    //颁发token
    const token = jwt.sign({id, telephone}, '123456', {
      expiresIn: 60 * 60 * 24
    })
    ctx.body = {
      id,
      telephone,
      nickname,
      token,
      avatar_url
    }
  }
}

module.exports = new AuthController()