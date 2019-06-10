'use strict'
const path            = require('path')
const utils           = require('./utils')
const config          = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const hostConfig      = require('./host-config')
let argv              = ''
try {
  argv = JSON.parse(process.env.npm_config_argv).original
} catch (ex) {
  argv = process.argv
}
let cdnUrl = ''
/*
 jenkes 打包 不控制  cdn 的域名 不要放开注释!!!
 cdn 的域名 是通过 cdn.js来控制
 if(argv.length>=3 && argv[2].length > 5){
 cdnUrl = argv[2]
 }
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  cache: true,
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? cdnUrl + config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery': path.resolve(__dirname, '../node_modules/jquery/src/jquery.js'),
      'components': path.resolve(__dirname, '../src/components'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'config': path.resolve(__dirname, '../src/config'),
      'service': path.resolve(__dirname, '../src/service'),
      'filter': path.resolve(__dirname, '../src/filter'),
      'store': path.resolve(__dirname, '../src/store'),
      'pages': path.resolve(__dirname, '../src/pages'),
      'utils': path.resolve(__dirname, '../src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
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
        loader: ['babel-loader?cacheDirectory=true'],
        include: [resolve('src'), resolve('test')]
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
        }, {
          loader: 'less-loader', options: {
            strictMath: true,
            noIeCompat: true
          }
        }]
      }
    ]
  }
}
