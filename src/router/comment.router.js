const Router = require('koa-router')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')
const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller')
const commentRouter = new Router({prefix: '/comment'})

// 评论接口
commentRouter.post('/', verifyAuth, create)
// 评论评论的接口
commentRouter.post('/:commentsId/reply', verifyAuth, reply)
//修改评论
commentRouter.patch('/:commentsId', verifyAuth, verifyPermission, update)
// 删除评论
commentRouter.delete('/:commentsId', verifyAuth, verifyPermission, remove)


//获取评论的列表
commentRouter.get('/', list)

module.exports = commentRouter