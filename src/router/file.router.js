const Router = require('koa-router')

const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller')
const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  avatarHandler,
  pictureHandler,
  pictureResize
} = require('../middleware/file.middleware')

const fileRouter = new Router({prefix: '/upload'})

//头像上传接口
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)
//上传文章配图
fileRouter.post('/picture',verifyAuth, pictureHandler, savePictureInfo)

module.exports = fileRouter