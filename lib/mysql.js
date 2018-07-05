const mysql = require('mysql')
const config = require('../config')

const pool = mysql.createPool({
	host: config.database.HOST,
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE,
	insecureAuth: config.database.INSECUREAUTH
})

let _query = (sql, values = []) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err)
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err)
					} else {
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}

let query = (sql, values) => {
	return _query(sql, values)
}

let findAccount = account => {
	let _sql = `select * from account where account = ${account} `
	console.log('------mysql', _sql)
	return _query(_sql)
}

let loginAccount = (account, pwd) => {
	let _sql = `select * from account where account = '${account}' and password = '${pwd}'`
	console.log('------mysql', _sql)
	return _query(_sql)
}

module.exports = {
	query,
	findAccount,
	loginAccount
}
