const Router = require('koa-router')
const {
  create,
  detail,
  list,
  fileInfo,
  getArticleById,
  remove,
  search
} = require('../controller/article.controller')
const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware')

const articleRouter = new Router({prefix: '/article'})

//根据输入框中的值查询文章
articleRouter.post('/search', search)
//根据用户id获取文章
articleRouter.get('/user', verifyAuth, getArticleById)
//发表文章接口
articleRouter.post('/', verifyAuth, create)
//根据ID,获取文章接口
articleRouter.get('/:articleId', detail)
//获取所有文章接口, 需要offset和size
articleRouter.get('/', list)
//获取文章配图
articleRouter.get('/images/:filename', fileInfo)
//根据文章id删除文章
articleRouter.post('/:articleId', verifyAuth, verifyPermission, remove)

module.exports = articleRouter