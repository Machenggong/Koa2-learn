const router = require('koa-router')()
var fs = require('fs')
const parseXlsx = require('excel');
const Xlsx = require('node-xlsx');
const {
  nextTick
} = require('process');
const {
  request
} = require('http');




router.get('/', async (ctx, next) => {
  global.console.log('全局输出')
  ctx.cookies.set('pvid', Math.random())
  await ctx.render('index', {
    title: 'Hello !',
    cookies: ctx.cookies.get('pvid')
  })

})

// 如果是get请求： 获取用户输入的参数：ctx.request.query,  如果是post请求，获取用户的输入参数：ctx.request.body
router.get('/string', async (ctx, next) => {
  ctx.user = "text";
  // let src = [1,2,3,4,5]
  // let x = src.filter(item=> item !== 3)
  // let y = src.reduce((pre,item,index)=>{
  //   console.log(pre,'presssssssssssssss')
  //   return pre += item
  // },0)
  // console.log(x)
  // console.log(y)
  let code = "http%3A%2F%2Fwww.w3school.com.cn%2FMy%20first%2F";
  console.log(decodeURIComponent(code))
  next();
}, async (ctx, next) => {
  // console.log(ctx.request.query,'aaaaaaaaaaaa')
  // console.log(ctx.request.querystring,'bbbbbbbbbbbb')
  // console.log(ctx.user, 'ussxxxxxxxxxxxxxxx')
  // console.log(ctx.req,'ddddddddddddddd')
  ctx.body = {
    status: 200,
    query: ctx.request.query,
    querystring: ctx.request.querystring,
    ctx_query: ctx.query,
    ctx_querystring: ctx.querystring
  }
})


router.post('/postdata', async (ctx, next) => {
  global.console.log(ctx.request.body,"xaa")
  let { id , name } = JSON.parse(ctx.request.body)
  ctx.body = {
    status:200,
    msg:"post请求成功",
    data:{
      id: id,
      name:name
    }
  }
})
router.get('/json', async (ctx, next) => {
  var ad = "json Data"
  console.log(typeof ad)
  console.log(ctx.cookies.get("userName"),'name')
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/setcookie', async (ctx, next) => {
  ctx.cookies.set("userName", 'mcg_serve', {
    domain: "",
    // path: "/setcookie",
    maxAge: 1000 * 20,
    expires: new Date('2021-1-28'),
    httpOnly: false,
    overwrite: false
  })
  next()
}, async (ctx, next) => {
  console.log(ctx.cookies.get("userName"), '1')
  ctx.body = {
    title: 'Cookie写入成功'
  }
})

router.get('/areas', async (ctx, next) => {
  let jsonData = {}
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
  ctx.body = {
    title: buffer
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