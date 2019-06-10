/**
 * 设置生产环境下的CDN 域名
 * @returns {string}
 */
function baseUrl () {
  let cdnUrl = ''
  try {
    const WebpackConfig = require('./nodeCode/WebpackConfig.js')()
    cdnUrl              = WebpackConfig.cdnUrl
    if (!cdnUrl) cdnUrl = '/'
  } catch (e) {
    cdnUrl = '/'
  }
  return process.env.NODE_ENV === 'production'
    ? cdnUrl
    : '/'
}

// vue.config.js
module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  assetsDir: 'agentStatic',
  productionSourceMap: false,
  // 构建时开启多进程处理 babel 编译
  parallel: require('os').cpus().length > 1,
  baseUrl: baseUrl()
  // chainWebpack: config => {
  //   const svgRule = config.module.rule('svg')

  //   // 清除已有的所有 loader。
  //   // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
  //   svgRule.uses.clear()

  //   // 添加要替换的 loader
  //   svgRule
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: 'icon-svg-[name]'
  //     })
  // }
}
