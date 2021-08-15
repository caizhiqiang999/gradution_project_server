const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const {
  APP_HOST,
  APP_PORT
} = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    //获取图像相关信息
    const {mimetype, filename, size} = ctx.req.file
    const {id} = ctx.user
    console.log(ctx.req.file)
    //将图片保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id)
    //将图片保存到users表中
    // const avatarUrl = `${APP_HOST}:${APP_PORT}/${id}/avatar`
    const avatarUrl = `${APP_HOST}:${APP_PORT}/${filename}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, id)
    ctx.body = '上传头像成功'
  }

  async savePictureInfo(ctx, next) {
    //获取图像相关信息
    console.log('hahaha')
    const file = ctx.req.file
    console.log(ctx.req.file)
    const res = "<img class='img' src='http://localhost:8000/article/images/" + file.filename + "'>"
    const {id} = ctx.user
    //将图片保存到数据库中
    const {mimetype, filename, size} = file
    await fileService.createFile(filename, mimetype, size, id)
    ctx.body = res
  }
}

module.exports = new FileController()