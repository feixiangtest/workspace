/**
 *  读取 op og 文件目录数据
 */
const _ = require('lodash')
const fs = require('fs')
const rd = require('rd')
const path = require('path')
// 异步列出目录下的所有文件
let opPath = '', ogPath = ''
let opFile = [], ogFile = []
try {
  opPath = path.resolve(__dirname, '../../src/web/op')
  opFile = rd.readSync(opPath)
} catch (e) { }
try {
  ogPath =path.resolve(__dirname, '../../src/web/og')
  ogFile = rd.readSync(ogPath)
} catch (e) { }

let nodeCdnUrl = global.nodeCdnUrl || ''
// 如果最后一个字符串为'/'，则删除该'/'
if (nodeCdnUrl && nodeCdnUrl.charAt(nodeCdnUrl.length - 1) === '/') {
  nodeCdnUrl = nodeCdnUrl.substr(0, nodeCdnUrl.length - 1)
}

// 同步列出目录下的所有文件
let fileJS = `const outerArr = [\n`
let firstTime = null
_.each(opFile.concat(ogFile), function (val) {
  val = val.replace(/\\/g, '/')
  if (val.slice(-4) == '.vue') {
    let one = val.slice(val.indexOf('src'))
    if(!firstTime){
      fileJS += '  \'' + one + '\''
      firstTime = true
    }else{
      fileJS += ',\n' + '  \'' + one + '\''
    }
  }
})
delete firstTime
fileJS += `\n]

const nodeCdnUrl = '${nodeCdnUrl}'

export {
  outerArr,
  nodeCdnUrl
}
`
console.info('cdnUrl = ', nodeCdnUrl)
console.info(fileJS)
fs.writeFileSync(path.resolve(__dirname, '../../src/base/config/customComponents.js'), fileJS)

