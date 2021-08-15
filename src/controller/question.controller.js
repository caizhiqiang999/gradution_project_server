const questionService = require('../service/question.service')

class questionController {
  async create(ctx, next) {
    const id = ctx.user.id
    const { content } = ctx.request.body

    const result = await questionService.createQuestion(id, content)
    ctx.body = result
  }

  async getData(ctx, next) {
    // 获取数据(offset,size)
    const {offset, size} = ctx.query
    // 查询列表
    const [result] = await questionService.getQuestionList(offset, size)
    ctx.body = result
  }

  async setAnswer(ctx, next) {
    const {questionId, content} = ctx.request.body
    const {id} = ctx.user

    const result = await questionService.setAnswer(questionId, content, id)
    ctx.body = result

  }
}

module.exports = new questionController()