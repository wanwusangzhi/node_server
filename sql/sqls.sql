let account = `CREATE TABLE if not exists account(
	id INT(11) NOT NULL AUTO_INCREMENT,
	account_id INT(64) UNSIGNED NOT NULL,
	account VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	type INT(1) NOT NULL,
	create_time TIMESTAMP NULL,
	update_time TIMESTAMP NULL,
	PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;`

let user = `CREATE TABLE if not exists user (
	id INT NOT NULL AUTO_INCREMENT,
	account_id INT(64) NOT NULL,
	name VARCHAR(100),
	sex INT(1) UNSIGNED,
	create_time TIMESTAMP,
	update_time TIMESTAMP,
	PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;`

module.exports = [
	account,
	user
]