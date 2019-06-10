const fs           = require('fs')
const util         = require('util')
const path         = require('path')
const rm           = require('rimraf')
const webpackUtils = require('./webpackUtils')


let Q = webpackUtils.Q((task, callback) => {
  webpackUtils.childProcess('npm run web ' + task.name, (data) => {
    console.log('stdout: ' + data);
    if (data.includes('successful') && runNext) {
      setTimeout(() => { // 任务执行完毕 执行下一个
        runNext = null
        callback(null)
      }, 10)
    }
  }, (data) => {
    console.log('close: ' + data);
  })

  function runNext() {
  }
}, 1)
run()
function run(){
  // 分别跑  dev 环境 1 会员中心 的代码 2 alone 的代码
  Q.push({name: 'core'}); // dev 环境 webpack  运行 会员中心 的代码
  Q.push({name: 'alone'});// dev 环境 webpack  运行 alone 的代码
}
