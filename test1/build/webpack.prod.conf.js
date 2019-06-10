'use strict'
const path              = require('path')
const utils             = require('./utils')
const webpack           = require('webpack')
const config            = require('../config')
const merge             = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var ImageminPlugin      = require('imagemin-webpack-plugin').default
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 基本依赖模块，首页html跑起来时需要加载对应css\js文件
const baseModules = {
  web: ['manifest', 'vendor', 'web-vendor', 'web'],
  payment: ['manifest', 'vendor', 'payment-vendor', 'payment']
}
global.baseModules = baseModules // localStorage本地存储功能使用
// 使用多核心CPU 加速编译
var HappyPack = require('happypack')
let os        = require('os')
console.log('多核心cpu:', os.cpus().length, '加速Webpack编译')
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
var folderName = global.folderVersion.after
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    }).concat([{
      test: /\.(html|js|vue|less|css)$/, // 但是此处对于less与css无效，不知道原因，因此less文件中不能有需要替换的字符串
      loader: 'webpack-replace-loader', // 替换文件内容
      options: {
        arr: [
          {search: global.folderVersion.before, replace: global.folderVersion.after, attr: 'g'} // 替换版本号
        ].concat(global.replaceArr) // 替换其他字符串，如：CDN域名
      }
    }])
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(folderName + '/js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath(folderName + '/js/[id].[chunkhash].js')
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        collapse_vars: true,
        reduce_vars: true,
        drop_console: true
      },
      sourceMap: false
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath(folderName + '/css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    /* new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true, // JS CSS 依赖注入 取消 使用 存 ls 本地模式
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }), */
    new HtmlWebpackPlugin({
      filename: 'pt-play.html',
      template: 'pt-play.html',
      inject: true,
      chunks: []
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'maintain.html',
      template: 'maintain.html',
      inject: true,
      chunks: []
    }),
    new HtmlWebpackPlugin({
      filename: 'blank.html',
      template: 'blank.html',
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
    /* new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }), */
    // extract webpack runtime and module manifest to its own file in order to

    new webpack.optimize.CommonsChunkPlugin({
      name: 'web-vendor',
      chunks: ['web'],
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'payment-vendor',
      chunks: ['payment'],
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['payment-vendor', 'web-vendor']
    }),
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `../dist/index.html`),
      template: path.resolve(__dirname, `../src/web/index.html`),
      chunks: baseModules.web,
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `../dist/payment.html`),
      template: path.resolve(__dirname, `../src/payment/index.html`),
      chunks: baseModules.payment,
      inject: false
    }),
    // copy custom static assets
    new CopyWebpackPlugin([ // 拷贝
      {
        from: path.resolve(__dirname, '../static/' + global.folderVersion.before),
        to: config.build.assetsSubDirectory + '/' + global.folderVersion.after, // 更换文件夹名称
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static/local'),
        to: config.build.assetsSubDirectory + '/local',
        ignore: ['.*']
      }
    ])
    // Make sure that the plugin is after any plugins that add images
    /*    new ImageminPlugin({ 暂时屏蔽
     optipng: {
     optimizationLevel: 9
     }
     })*/
  ]
})
/**
 *  屏蔽 gzip 任务
 */
if (config.build.productionGzip && false) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
