/**
 * 单个打包 项目
 */
const fs    = require('fs')
const chalk = require('chalk')
const util  = require('util')
const path  = require('path')
const cp    = require('child_process')
const rm    = require('rimraf')

const {args, Q}  = require('./webpackUtils')
const testFolder = path.join(__dirname, '..', 'src')
let buildList    = []

/* 输入参数 规则
 npm run buildOne ot002 www.google.com */
let argv = args()['_']

buildList[0] = argv[0] ? argv[0] : ''
/**
 * 单个打包 cdnUrl
 */
let cdnUrl = argv[1] ? argv[1] : ''
if (!buildList[0]) {
  throw '打包项目 为空'
}
let QFn = Q((task, callback) => {
  /**
   * 标记 最后一个任务
   * 判断 需要补在最上面
   */
  if (task.name == 'last') {
    const buildFix = require('../nodeCode/buildFix')
    setTimeout(() => {
      callback(null)
    }, 10)
    setTimeout(() => {
      // 执行加密
      let {cryptClass} = require('./buildFix')
      buildList.forEach(file => {
        if (file == 'share') return
        new cryptClass(file)
        console.log(chalk.cyan('  build cryptClass .\n'))
      })
      //-----设定打包资源 版本号------------------------------------------------
      setTimeout(() => {
        buildFix.VersionFix()
      }, 800)
    }, 100)
    return false
  }
//---标记 最后一个任务 end------------------------------------------------------------------
  let CMD1 = 'npm run build ' + task.name + ' ' + cdnUrl
  console.log('执行任务 cmd ==>', CMD1)
  console.log('生成配置文件 multipage.project', task.name)
  /** 站点参数---> 更新配置文件
   *  放在任务 执行的前面
   */
  fs.writeFileSync(path.resolve(__dirname, '../config/multipage.project.js'), `
module.exports = function () {
  return {
    cmd: 'buildOne',
    name: '${task.name}'	//文件夹名称 和最后打包后文件夹的名称  /src/xxx/
  }
}
`);
  let cmdProcess = cp.exec(CMD1, {})  // 子进程 执行任务
  cmdProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data)
  })

  cmdProcess.on('close', function (data) {
    if (data == 1) {
      throw CMD1 + ' 编译失败'
      // todo 调试
    }
    setTimeout(() => {
      callback(null)
    }, 9) // 和下个任务之间预留一点时间差
  })
})

rm(path.join(path.resolve(__dirname, '../dist/')), err => {
  if (err) throw err
  buildList.forEach(file => {
    if (file == 'share') return
    QFn.push({name: file}) // 执行 单个build 任务 调用 cmdProcess
  })
  QFn.push({name: 'last'}) // 标记 最后一个任务
})
