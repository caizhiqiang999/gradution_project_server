const service = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const {articleId, content} = ctx.request.body
    const {id} = ctx.user

    const result = await service.create(articleId, content, id)
    ctx.body = result

  }

  async reply(ctx, next) {
    const {articleId, content} = ctx.request.body
    const {commentsId} = ctx.params
    const {id} = ctx.user

    const result = await service.reply(articleId, content, id, commentsId)
    ctx.body = result
  }

  async update(ctx, next) {
    const {commentsId} = ctx.params
    const {content} = ctx.request.body
    const result = await service.update(commentsId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const {commentsId} = ctx.params
    const result = await service.remove(commentsId)
    ctx.body = result
  }

  async list(ctx, next) {
    const {articleId} = ctx.query
    const result = await service.list(articleId)
    ctx.body = result
  }
}
module.exports = new CommentController()