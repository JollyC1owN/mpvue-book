// 引入koa
let Koa = require('koa')
// 引入koa-router
let KoaRouter = require('koa-router')
// 实例化
let koa = new Koa()
let koaRouter = new KoaRouter()
// 引入数据
let datas = require('./datas/data.json')
// 微信小程序引入的fly
var Fly = require('flyio/src/node/index')
var fly = new Fly
// 根据接口返回内容
koaRouter.get('/', (ctx, next) => {
  // 获取参数
  let req = ctx.query.req
  console.log(req)
  // 返回内容
  ctx.body = '测试123234234'
})
// 搜索图书的接口
koaRouter.get('/searchBooks', (ctx, next) => {
  // 获取参数
  let req = ctx.query.req
  // 输出参数
  console.log(req)
  // 返回数据
  ctx.body = datas
})
// 获取凭证的接口
koaRouter.get('/getOpenId', async (ctx, next) => {
  let code = ctx.query.code
  // 081eqMYL1KMXY71fu6ZL1MUNYL1eqMYJ
  console.log(code)
  // appid
  let appId = 'wx8dc92766a09575de'
  // 密钥
  let appSecret = '8cc9978fb559e68c8b37ae4b71ee2788'
  // 地址
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
  let result = await fly.get(url)
  console.log(typeof result.data)
  console.log(JSON.parse(result.data).openid)
  // 返回数据
  ctx.body = JSON.parse(result.data).openid
})
// 声明使用
koa
  .use(koaRouter.routes()) // 使用所有的路由
  .use(koaRouter.allowedMethods()) // 使用所有的方法
// 监听端口
koa.listen('4000', () => {
  console.log('服务器启动成功')
  console.log('当前服务器地址为:http://localhost:4000')
})
