const fs    = require('fs')
const chalk = require('chalk')
const util  = require('util')
const path  = require('path')
const cp    = require('child_process')
const rm    = require('rimraf')

const {args, Q}  = require('./webpackUtils')
const testFolder = path.join(__dirname, '..', 'src')
// 项目 名字 组成的数组
let buildList    = fs.readdirSync(testFolder)

/* 以下是根据不同环境获取的打包CDN地址 by karl */
let argv   = args()['_']
// 如果npm 传入了 打包域名 就赋值
let cdnUrl = argv[0] ? argv[0] : ''
/**
 * Q 是队列任务 函数
 */
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
        if (file == 'share') return // 跳过 share 目录 share 不是独立的项目
        new cryptClass(file)
        console.log(chalk.cyan('  build cryptClass .\n'))
      })
      buildFix.copyResource() // 拷贝Resource 文件夹 到dist
      //-----设定打包资源 版本号 这个任务基于webpack 已经把文件build完成的情况下 设定延时保证 执行顺序------------------------------------------------
      setTimeout(() => {
        buildFix.VersionFix()
      }, 800)
    }, 100)
    return
  }
//-------准备 执行任务 cmd---------------------------------------------------------------
  let CMD1 = 'npm run build ' + task.name + ' ' + cdnUrl
  console.log('执行任务 cmd ==>', CMD1)
  console.log('生成配置文件 multipage.project', task.name)
  /** 站点参数---> 更新配置文件
   *  放在任务 执行的前面
   */
  fs.writeFileSync(path.resolve(__dirname, '../config/multipage.project.js'), `
module.exports = function () {
  return {
    cmd: 'buildAll',
    name: '${task.name}'	//文件夹名称 和最后打包后文件夹的名称  /src/xxx/
  }
}
`);
  let cmdProcess = cp.exec(CMD1, {})  // node子进程 执行 cmd命令 任务
  cmdProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data)
  })
  // 子进程 结束返回状态
  cmdProcess.on('close', function (data) {
    // 异常
    if (data == 1) {
      rm(path.join(path.resolve(__dirname, '../dist/')), err => {
        // todo 调试
      })
      throw CMD1 + ' 编译失败'
    }
    // 任务ok
    setTimeout(() => {
      callback(null)
    }, 9) // 和下个任务之间预留一点时间差
  })
})
// 清空 dist
rm(path.join(path.resolve(__dirname, '../dist/')), err => {
  if (err) throw err
  buildList.forEach(file => {
    if (file === 'share') return
    QFn.push({name: file}) // 执行 单个build 任务 调用 cmdProcess
  })
  QFn.push({name: 'last'}) // 标记 最后一个任务
})
