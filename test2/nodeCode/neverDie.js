const path = require('path')
const fs   = require('fs')

const {args, childProcess} = require('./webpackUtils')

// 获取 启动站点参数
const _webName = args()['_'][0]
// 没有启动参数 停下程序
if (!_webName) {
  console.log('启动命令错误','args', args)
  process.exit(123)
}
// 创建启动项目 -->配置文件
fs.writeFileSync(path.resolve(__dirname, '../config/multipage.project.js'), `
module.exports = function () {
  return {
    name: '${_webName}'	//文件夹名称 和最后打包后文件夹的名称  /src/xxx/
  }
}
`)
