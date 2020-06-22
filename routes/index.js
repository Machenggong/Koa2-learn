const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  global.console.log('全局输出')
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/asyncTest', async (ctx, next) => {
  const a = await new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('a')
    }, 1000)
  })
  const b = await 12   // await后面是一个promise对象，如果直接写结果，它也会自动转换成一个promise对象    => await new Promise.resolve(12)
  ctx.body = {
    a,
    b
  }
})

module.exports = router