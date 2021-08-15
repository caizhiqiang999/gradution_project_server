const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const fileRouter = require('../router/file.router')
const authRouter = require('../router/auth.router')
const articleRouter = require('../router/article.router')
const commentRouter = require('../router/comment.router')
const questionRouter = require('../router/question.router')
const errorHandle = require('./error-handle')

const app = new Koa()

app.use(cors())

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
app.use(fileRouter.routes())
app.use(fileRouter.allowedMethods())
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())
app.use(articleRouter.routes())
app.use(articleRouter.allowedMethods())
app.use(commentRouter.routes())
app.use(commentRouter.allowedMethods())
app.use(questionRouter.routes())
app.use(questionRouter.allowedMethods())

app.on('error', errorHandle)

module.exports = app