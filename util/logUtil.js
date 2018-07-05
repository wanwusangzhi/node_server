var log4js = require('log4js')

var errorLogger = log4js.getLogger('error')
var httpLogger = log4js.getLogger('http')

var LogUtil = {}

LogUtil.logError = (ctx, err, resTime) => {
	if (ctx && error) {
		errorLogger.error(formatErrorLogger(ctx, err, resTime))
	}
}

LogUtil.logHttp = (ctx, resTime) => {
	if (ctx && !/^4|5/.test(ctx.status)) {
		httpLogger.info(formatHttpLogger(ctx, resTime))
	} else {
		errorLogger.error(formatErrorLogger(ctx, {}, resTime))
	}
}

var formatErrorLogger = function(ctx, err, resTime) {
	var logText = new String()

	// 响应日志开始
	logText += '\n' + '******************* error log start *******************' + '\n'

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //响应状态码
    logText += 'response status:' + ctx.status +'\n'

	// 错误名称
	logText += '\n' + 'err name: ' + err.name + '\n'

	// 错误信息
	logText += '\n' + 'err message: ' + err.message + '\n'

	// 错误详情
	logText += '\n' + 'err stack: ' + err.stack + '\n'

    //响应结束时间
	const ms = new Date() - new Date(resTime)
    logText += '\n' + 'err end time: ' + `${ms}ms` +'\n'

	// 响应日志结束
	logText += '\n' + '******************* error log end *******************' + '\n'

	return logText
}

var formatHttpLogger = function(ctx, resTime) {
	var logText = new String()

	// 响应日志开始
	logText += '\n' + '******************* http log start *******************' + '\n'

	//添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //响应状态码
    logText += 'response status:' + ctx.status +'\n'

    //响应内容
    logText += 'response body:' +'\n' + JSON.stringify(ctx.body) +'\n'

    //响应结束时间
	const ms = new Date() - new Date(resTime)
    logText += 'response end time:' + `${ms}ms` +'\n'

    //响应日志结束
    logText += '*************** http log end ***************' +'\n'

    return logText
}

// 格式化请求日志
var formatReqLog = function(req, resTime) {
	var logText = new String();

    //访问方法
    logText += 'request method:' + req.method +'\n'

    //请求原始地址
    logText += 'request originalUrl: ' + req.originalUrl +'\n'

    //客户端ip
    logText += 'request client origin: ' + req.origin +'\n'

    //客户端ip
    logText += 'request client ip: ' + req.ip +'\n'

    //请求参数
    logText += 'request query: ' + JSON.stringify(req.query) +'\n'

	//请求参数
    logText += 'request body:' + JSON.stringify(req.body) +'\n'

    //服务器响应时间
    logText += 'response time:' + resTime +'\n'

    return logText;

}
module.exports = LogUtil