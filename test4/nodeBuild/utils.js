/**
 *  工具函数
 */


var crypto = require('crypto')
var fs = require('fs');

var h = crypto.createHash('md5')

h.update('Next string')

var ret = h.digest('hex')
console.log(ret)

fs.readFileSync(origin)

// fs.writeFileSync(_target, fs.readFileSync(origin))
