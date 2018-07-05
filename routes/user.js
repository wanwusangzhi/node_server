const mysql = require('../lib/mysql')
const router = require('koa-router')()

// router.prefix('/user')

router.get('/', async function(ctx, next) {
	// console.log(ctx.request.querystring)
	// console.log(ctx.request.body)
	console.log(ctx.request.query)

	let _query = ctx.request.query
	let _data = null
	if (_query && _query.id) {
		_data = await mysql.findAccount(_query.id)
	}

	console.log('data', _data)
	if (_data) {
		ctx.body = _data
	} else {
		ctx.body = 'this is a users response!'
	}
})

router.get('/login', async function(ctx, next) {
	let _query = ctx.request.query
	let _data = null
	_data = await mysql.loginAccount(_query.account, _query.password)
	if (_data) {
		console.log(_data)
		ctx.body = _data
	} else {
		ctx.body = 'end'
	}
})

router.get('/bar', function(ctx, next) {
	ctx.body = 'this is a users/bar response'
})

module.exports = router
