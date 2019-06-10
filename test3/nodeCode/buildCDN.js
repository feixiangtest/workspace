const util   = require('util')
const fs     = require('fs')
const path   = require('path')
const cp     = require('child_process')
const {args} = require('./webpackUtils')

let argv   = args()['_']
let cdnUrl = argv[0] ? argv[0] : ''
if (!cdnUrl) {
  cdnUrl = '/'
}
fs.writeFileSync(path.resolve(__dirname, './WebpackConfig.js'), `
module.exports = function () {
  return {
    cdnUrl: '${cdnUrl}'
  }
}
`)

//-------准备 执行任务 cmd---------------------------------------------------------------
let CMD1 = 'yarn run build'
console.log('执行任务 cmd ==>', CMD1)
setTimeout(() => {
  let cmdProcess = cp.exec(CMD1, {})  // 子进程 执行任务
  cmdProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data)
  })

  cmdProcess.on('close', function (data) {

  })
}, 200)
