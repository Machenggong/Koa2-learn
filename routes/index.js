const router = require('koa-router')()
var fs = require('fs')
const parseXlsx= require('excel') ;
const Xlsx= require('node-xlsx') ;
const { nextTick } = require('process');
 



router.get('/', async (ctx, next) => {
  global.console.log('全局输出')
  ctx.cookies.set('pvid', Math.random())
  await ctx.render('index', {
    title: 'Hello !',
    cookies: ctx.cookies.get('pvid')
  })

})

router.get('/string', async (ctx,next)=>{
  ctx.user = "text";
  next();
},async (ctx, next) => {
  console.log(ctx)
  console.log(ctx.user,'ussxxxxxxxxxxxxxxx')
  ctx.body = {
    status:200,
    text:'koa2 string'
  }
})

router.get('/json', async (ctx, next) => {
  var ad = "json Data"
  var ad1 = JSON.stringify(ad);
  console.log(typeof ad)
  console.log(ad1)
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/areas', async (ctx, next) => {
  let jsonData={}
  await new Promise((resolve, reject) => {
    fs.readFile('public/untils/area.js', (err, data) => {
      if (err) {
        ctx.throw(err)
      } else {
        jsonData = data
        resolve()
      }
    })
  })
  const buffer = new Buffer(jsonData, 'utf-8');
  ctx.body={
    title:buffer
  }
})

router.get('/asyncTest', async (ctx, next) => {
  const a = await new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('a')
    }, 1000)
  })
  const b = await 12 // await后面是一个promise对象，如果直接写结果，它也会自动转换成一个promise对象    => await new Promise.resolve(12)
  ctx.body = {
    a,
    b
  }
})

module.exports = router