const Koa = require('koa')
const app = new Koa()
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const log4js = require('log4js')

const config = require('./config')

const routers = require('./routes/index')
//引入（运行）日志配置文件， 生产日志目录及相应文件
require('./plugin/log')
//默认以http开头获取数据
const logUtil = require('./util/logUtil')

// error handler
onerror(app)
// mysql-session
let store = new MysqlSession({
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE,
	host: config.database.HOST
})
// 存放sessionId的cookie配置
let cookie = {
	maxAge: 3 * 24 * 60 * 1000, // cookie有效时长
	expires: '', // cookie失效时间
	path: '/', // 写cookie所在的路径
	domain: '', // 写cookie所在的域名
	httpOnly: true, // 是否只用于http请求中获取
	overwrite: false, // 是否允许重写
	secure: '',
	sameSite: '',
	signed: ''
}
// 使用session中间件
app.use(
	session({
		key: 'cid',
		store: store,
		cookie: cookie
	})
)
// middlewares
app.use(
	bodyparser({
		enableTypes: ['json', 'form', 'text']
	})
)
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))
app.use(async function(ctx, next) {
	if (!ctx.session.user_id) {
		console.log('---session', ctx.session.user_id, !ctx.session.user_id)
		ctx.session = {
			user_id: new Date().getTime(),
			count: 0,
			other: true
		}
	} else {
		console.log('---sessionexit', ctx.session)
		ctx.session = {
			user_id: new Date().getTime(),
			count: ++ctx.session.count,
			other: true
		}
	}
	await next()
})

app.use(
	views(__dirname + '/views', {
		extension: 'pug'
	})
)

// logger
app.use(async (ctx, next) => {
	const start = new Date()
	try {
		await next()
		logUtil.logHttp(ctx, start)
	} catch (e) {
		logUtil.logError(ctx, e, start)
	}
})

// routes
app.use(routers.routes(), routers.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
})

module.exports = app
