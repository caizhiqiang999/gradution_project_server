const { create, getMomentById, getMomentList, getArticleByuserId, remove, searchArt } = require('../service/article.service')
const fileService = require('../service/file.service')
const errorType = require('../constants/error-types')
const fs = require('fs')

class ArticleController {
  async create(ctx, next) {
    // 获取数据
    const userId = ctx.user.id
    const title = ctx.request.body.title
    const content = ctx.request.body.content
    //操作数据库
    const result = await create(userId, title, content)
    //返回结果
    ctx.body = result
  }

  async detail(ctx, next) {
    // 获取数据
    const articleId = ctx.params.articleId
    // 根据id查数据
    const [result] = await getMomentById(articleId)
    ctx.body = result[0]
  }

  async list(ctx, next) {
    // 获取数据(offset,size)
    const {offset, size} = ctx.query
    // 查询列表
    const [result] = await getMomentList(offset, size)
    ctx.body = result
    
  }

  async fileInfo(ctx, next) {
    let {filename} = ctx.params
    const fileInfo = await fileService.getFileByFilename(filename)
    // const {type} = ctx.query
    // console.log(type)
    // const types = ['small', 'middle', 'large']
    // if(types.some(item => item === type)) {
    //   filename = `${filename}-${type}`
    //   console.log(filename)
    // }
    ctx.response.set('content-type', fileInfo.mimetype)
    ctx.body = fs.createReadStream(`./uploads/picture/${filename}`)
  }

  async getArticleById(ctx, next) {
    const userId = ctx.user.id
    const result = await getArticleByuserId(userId)
    ctx.body = result
  }

  async remove(ctx, next) {
    // 获取momentId
    const {articleId} = ctx.params
    // 删除内容
    const result = await remove(articleId)
    ctx.body = result
  }
  async search(ctx, next) {
    const { find } = ctx.request.body
    console.log(find)
    const result = await searchArt(find)
    ctx.body = result
  }
}

module.exports = new ArticleController()