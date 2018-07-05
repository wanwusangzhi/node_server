'use strict'
const path = require('path')
const log4js = require('log4js')
const logCf = require('./log_config')


function createDir(logDir) {
	/*生成logs目录*/
	try {
		require('fs').mkdirSync(logDir)  //新建目录， ./logs
	} catch(err) {
		if(err.code !== 'EEXIST') {
		    console.log('Could not set up log directory, error was: ', err)
		    // process.exit(1)
		}
	}
}


//根据log 配置文件(log_config.json)配置日志文件
var initLogDir = function() {
  if(logCf.baseLogPath) {
    createDir(logCf.baseLogPath)
    if (logCf.appenders) {
      Object.keys(logCf.appenders).forEach(item => {
        if (logCf.appenders[item].path) {
          createDir(logCf.appenders[item].path)
        }
      })
    }
  }
}
initLogDir()

log4js.configure(logCf)
//注册日志： 日志名（前缀）startup
const logger = log4js.getLogger('http')
//输入日志
logger.info('log config finished! server is running')

/**
 * const logger = log4js.getLogger('categoriesName or personal tips')
 * logger.info/debug...(message)
 */
