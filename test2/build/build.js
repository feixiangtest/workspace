'use strict'
// 检查npm和node的版本
require('./check-versions')()
// 设置环境变量NODE_ENV的值是production
process.env.NODE_ENV = 'production'
const path           = require('path')
const fs             = require('fs-extra')
let {args}           = require('../nodeCode/webpackUtils')
let {cryptClass}     = require('../nodeCode/buildFix')
const minimist       = require('minimist');

args           = args()
const _webName = args['_'][0]
// 获取 启动站点参数
if (!_webName) {
  console.log('启动命令错误')
  console.log('args', args)
  process.exit(123)
}
global.CNDURL = args['_'][1];
console.log('global.CNDURL ', global.CNDURL)
// CDN + 项目name
if (!global.CNDURL || global.CNDURL == 'undefined') {
  global.CNDURL = '/'
} else {
// 对 // 处理
  try {
    global.CNDURL = global.CNDURL.replace(/\//g, '')
  } catch (e) {
  }
  if (_webName != 'share' && global.CNDURL.length > 5) {
    global.CNDURL = `//${global.CNDURL}/${_webName}`
  }
}

// 打包读取的配置是旧的文件  multipage.project.js
setTimeout(() => {
  WebpackBuild()
}, 230) // bug

function WebpackBuild() {
  // 终端的spinner
  const ora     = require('ora')
  const rm      = require('rimraf')
// 引入显示终端颜色模块
  const chalk   = require('chalk')
// 引入webpack模块
  const webpack = require('webpack')
// 引入基本的配置文件
  const config  = require('../config')

  if (global.CNDURL !== '/' && global.CNDURL) {
    config.build.assetsPublicPath = global.CNDURL
  }
// 引入webpack在production环境下的配置文件
  const webpackConfig = require('./webpack.prod.conf')
  const spinner       = ora('building for production...')
  spinner.start()

// 删除打包目标目录下的文件 ps: 不要删除 根目录 dist/
  rm(path.join(config.build.assetsRoot), err => {
    if (err) throw err
    // 进行打包
    webpack(webpackConfig, (err, stats) => {
      // 打包完成
      spinner.stop()
      if (err) throw err
      // 输出打包的状态
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      // 如果打包出现错误
      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
      console.log(chalk.cyan('  Build complete.\n'))
      if (global.CNDURL.length > 5) {
        console.log(chalk.cyan('  build cdn url: ' + global.CNDURL + '.\n'))
      } else {
        console.log(chalk.cyan('  build cdn 本地模式'))
      }
      // 手动 清除 v1
      // rm(path.join(`../dist/${config.v}`))
    })
  })

}
