'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// const hostConfig = require('./host-config')
/* 以下是根据不同环境获取的打包CDN地址 by karl */
var argv
try {
  argv = JSON.parse(process.env.npm_config_argv).original
} catch (ex) {
  argv = process.argv
}
let cdnUrl = '' // 打包配置的CDN域名，须设置CDN不能有跨域问题，否则ajax请求存在跨域问题，导致localStorage本地缓存会失效
// 判断数组必须大于等于3，前边两位是run build
if (argv.length >= 3) {
  cdnUrl = argv[argv.length - 1]
}
global.nodeCdnUrl = cdnUrl || ''
/* 以上是根据不同环境获取的打包CDN地址 by karl */

// 引入 客户自定义组件 JS，必须放在global.nodeCdnUrl赋值之后
const customComponents = require('../nodeBuild/customComponents')
global.folderVersion = { // 文件夹替换（注意文件夹名称的唯一性，文件内容也会做搜索替换）
  before: 'RESOURCE_VERSION', // 替换前
  after: 'gpo_mobile_v17' // 替换后
} // 带版本号的文件夹名字
/**
 * gpo_mobile_v16 线上
 *
 */
global.replaceArr = [ // 打包替换字符串
  {search: 'CDNURL_VARIABLE', replace: cdnUrl || '', attr: 'g'} // CDN域名替换，将'//CDNURL_VARIABLE'字符串替换成构建的cdnUrl
]
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  cache: true,
  // 配置webpack编译入口
  // 获取多入口, 注意这个路径
  entry: {
    web: path.resolve(__dirname, '../src/web/main.js'),
    payment: path.resolve(__dirname, '../src/payment/main.js')// 支付项目
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js', //  todo 新增 不确定有效果
    publicPath: process.env.NODE_ENV === 'production'
      ? cdnUrl + config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@/web': resolve('src/web'), // src/web 路径
      '@/payment': resolve('src/payment'), // src/支付 路径
      '@/base': resolve('src/base'), // src/公用  路径
      'jquery': path.resolve(__dirname, '../node_modules/jquery/src/jquery.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        //  loader: 'happypack/loader?id=happyeslint',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        exclude: [/node_modules/], // 还有这里 优化 编译速度
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
     //   loader: ['babel-loader?cacheDirectory=true'],
        loader: 'happypack/loader?id=happybabel',
        include: [resolve('src'), resolve('test')]
        /* use: { 会更慢
          loader: 'babel-loader',
          options: {
            presets: ["env", "stage-2"],
            plugins: ['transform-runtime']
          }
        } */
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true
            }
          }]
      }
    ]
  }
}
