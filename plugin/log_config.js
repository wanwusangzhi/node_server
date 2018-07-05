var path = require("path");

var baseLogPath = path.resolve(__dirname, "../logs");

//错误日志输出完整路径
var errorLogPath = "/error"
var errorName = '/error'
 
//响应日志输出完整路径
var accessLogPath = "/access";
var accessName = "/access"

module.exports = {
  "baseLogPath": baseLogPath,

  "appenders": {

    "access": {

      "type": "dateFile",

      "filename": baseLogPath + accessLogPath + accessName,

      "encoding": "utf-8",

      "pattern": "-yyyy-MM-dd.log",

      "alwaysIncludePattern": true,

      "path": baseLogPath + accessLogPath

    },

    "console": {

      "type": "console"

    },

    "error": {

      "type": "dateFile",

      "filename": baseLogPath + errorLogPath + errorName,

      "encoding": "utf-8",

      "maxLogSize": 1000000,

      "numBackups": 3,

      "pattern": "-yyyy-MM-dd.log",

      "alwaysIncludePattern": true,

      "path": baseLogPath + errorLogPath

    }

  },

  "categories": {

    "default": {

      "appenders": [

        "console",

        "error"

      ],

      "level": "ALL"

    },

    "http": {

      "appenders": [

        "access"

      ],

      "level": "info"

    }

  }

}