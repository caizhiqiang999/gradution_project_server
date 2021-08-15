//这个库是node中自带的
const crypto = require('crypto')

//这个参数必须是一个字符串
const md5password = (password) => {
  const md5 = crypto.createHash('md5')
  const result = md5.update(password).digest('hex')
  return result
}

module.exports = md5password