const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const pv = require('./middleware/koa-pv')
var cors = require("koa-cors")
// const static = require("koa-static")

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
console.log(__dirname, 'xx')
app.use(require('koa-static')(__dirname + '/public'))
// app.use(pv())

app.use(cors({
  origin: function (ctx) { //设置允许来自指定域名请求
    console.log(ctx,'xx')
    // if (ctx.url === '/') {
    //   return '*'; // 允许来自所有域名请求
    // }
    return '*'; //只允许http://localhost:8080这个域名的请求
    // return 'http://192.168.3.21:8080'; //只允许http://localhost:8080这个域名的请求
  }
}));


app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// allowedMethods 有两个作用。
// 1：在跨域请求时，首先会触发option请求，如果没有allowedMethods，则不会触发option，
// 2.可以返回请求头，多出一个参数allow,提示请求方法错误
app.use(index.routes()).use(index.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app