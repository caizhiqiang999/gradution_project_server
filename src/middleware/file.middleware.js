const Multer = require('koa-multer')
// const Jimp = require('jimp')
const path = require('path')

const avatarUpload = Multer({
  dest: './uploads/avatar'
})
const avatarHandler = avatarUpload.single('file')

const pictureUpload = Multer({
  dest: './uploads/picture'
})
const pictureHandler = pictureUpload.single('file')

const pictureResize = async (ctx, next) => {
  const files = ctx.req.files
  for(let file of files) {
    //对图片进行处理(sharp/jimp)
    const destPath = path.join(file.destination, file.filename)
    Jimp.read(file.path).then(image => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
      image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
    })
  }
  await next()
}

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize
}
