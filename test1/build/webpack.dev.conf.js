/**
 *  webpack 开发模式 配置
 */
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 基本依赖模块，首页html跑起来时需要加载对应css\js文件
const baseModules = {
  web: ['manifest', 'vendor', 'web-vendor', 'web'],
  payment: ['manifest', 'vendor', 'payment-vendor', 'payment']
}
global.baseModules = baseModules // localStorage本地存储功能使用

var HappyPack = require('happypack')
let os = require('os')
console.log('多核心cpu:', os.cpus().length,'加速Webpack编译')
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }).concat([{
      test: /\.(html|js|vue|less|css)$/, // 但是此处对于less与css无效，不知道原因，因此less文件中不能有需要替换的字符串
      loader: 'webpack-replace-loader', // 替换文件内容
      options: {
        arr: global.replaceArr || [] // 替换字符串，如：CDN域名
      }
    }])
  },
  externals:{
    'Vue': 'window.Vue'
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'pt-play.html',
      template: 'pt-play.html',
      inject: true,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: 'maintain.html',
      template: 'maintain.html',
      inject: true,
      chunks: []
    }),

    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
    //  cache: true,
      verbose: true
    }),

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'web-vendor',
      chunks: ['web'],
      minChunks: function (module) {
        return module.context && (module.context.indexOf('node_modules') !== -1 || module.context.indexOf('base') !== -1)
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'payment-vendor',
      chunks: ['payment'],
      minChunks: function (module) {
        return module.context && (module.context.indexOf('node_modules') !== -1 || module.context.indexOf('base') !== -1)
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['payment-vendor', 'web-vendor']
    }),
    //  开发模式
    // HtmlWebpackPlugin 去找对应的 路径
    // 默认首页
    new HtmlWebpackPlugin({
      filename: 'index.html',  //  输出的地方?
      template: path.resolve(__dirname, '../src/web/index.html'),
      chunks: baseModules.web,
      inject: true
    }),
    // 支付首页
    new HtmlWebpackPlugin({
      filename: 'payment.html',
      template: path.resolve(__dirname, '../src/payment/index.html'),
      chunks: baseModules.payment,
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
