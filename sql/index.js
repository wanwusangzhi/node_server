let mysql = require('../lib/mysql')
let sqls = require('./sqls.sql')
let exec = require('./exec.sql')

async function run() {
	let result = []
	console.log(`准备执行${sqls.length}个创建表脚本`)
	for(var i = 0; i < sqls.length; i++) {
		console.log(`正在执行第${i + 1}条语句...`)
		await mysql.query(sqls[i]).then(res => {
			console.log(`[SUCCESS]已完成第${i + 1}条语句`)
			result.push(i)
		}).catch(err => {
			console.log(`[ERROR]失败: 第${i + 1}条语句执行失败`)
		})
	}
	console.log(`数据库创建完成, 共${sqls.length}个数据库, 完成${result.length}条, 失败${sqls.length - result.length}`)
	console.log(``)

	console.log(`准备初始化数据, 共${exec.length}条语句`)
	result = []
	for(var i = 0; i < exec.length; i++) {
		console.log(`正在执行第${i + 1}条语句...`)
		await mysql.query(exec[i]).then(res => {
			console.log(`[SUCCESS]已完成第${i + 1}条语句`)
			result.push(i)
		}).catch(err => {
			console.log(`[ERROR]失败: 第${i + 1}条语句执行失败`)
		})
	}
	console.log('sql脚本执行结束！')
	process.exit(1)
}
run()
module.exports = {
	run
}