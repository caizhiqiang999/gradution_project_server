const Router = require('koa-router')

const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  create,
  getData,
  setAnswer
} = require('../controller/question.controller')

const questionRouter = new Router({prefix: '/question'})



//发表问题接口
questionRouter.post('/', verifyAuth, create)
//获取问题列表接口
questionRouter.get('/answer', verifyAuth, getData)
//回答问题接口
questionRouter.post('/item', verifyAuth, setAnswer)

module.exports = questionRouter