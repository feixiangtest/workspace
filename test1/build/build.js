'use strict'
require('./check-versions')()
process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const BuldOnline     = require('../nodeBuild/lsBuild')
const BuldSkinLess     = require('../nodeBuild/skinLess')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) { // add err
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
   // 屏蔽任务

    console.log(chalk.cyan('skinLess build ==>'),BuldSkinLess()) // 编译皮肤less文件
    console.log(chalk.cyan('html crypt , css js save localStorage fn Build ==>', BuldOnline(global.nodeCdnUrl, global.baseModules)))

    console.log(chalk.cyan('Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
