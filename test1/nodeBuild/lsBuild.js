/**
 * 注意事项 如果修改了 webpack build 脚本代码 重新打包 MD5值 是不会变化的
 * 没有修改到 vue的代码
 *
 */
// API + 第三方框架
const cheerio  = require('cheerio')
const path     = require('path')
let fs         = require('fs')
const UglifyJS = require('uglify-js')
const _        = require('lodash')

// build 脚本 + config 文件
const {cryptHtml}     = require('./crypt')
const {injectFileMap} = require('./injectFileMap')
let Manifest          = require('./injectManifest')
const wrapFn          = require('./jsonp')
let distPath          = path.resolve(__dirname, `../dist/static/${ global.folderVersion.after }`)
const currentPath     = path.dirname(__filename)

// 初始化 var
let jsArray           = []
let cssArray          = []
let jsList            = []
let [origin, _target] = [path.resolve(__dirname, '../dist/index.html'), path.resolve(__dirname, '../dist/buildFile/index.html')]
let [origin2, _target2] = [path.resolve(__dirname, '../dist/payment.html'), path.resolve(__dirname, '../dist/buildFile/payment.html')]

let WrapFn    = new wrapFn()
let ManifestF = new Manifest()
let sameSourceCDN = '' // 打包配置的CDN域名，须设置CDN不能有跨域问题，否则ajax请求存在跨域问题，导致localStorage本地缓存会失效
let tBaseModules = {} // 基本依赖模块，首页html跑起来时需要加载对应css\js文件，localStorage本地存储功能使用

// 读取文件列表
var readdirs = function (path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (err, files) {
      resolve(files)
    })
  })
}

var readJS = function (path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        reject(err, data)
      } else {
        resolve(data)
      }
    })
  })
}

var injectManifest = function (path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) reject(err, 'injectManifest err')
      ManifestF.injectCdnUrl(data, function (ManifestStr) {
        if (!ManifestStr) throw new Error('InjectManifest.injectCdnUrl err')
        // fs.writeFileSync('./Manifest-debug.js', ManifestStr) // debug  UglifyJS.minify Manifest 文件
        // 执行 压缩js 脚本
        result = ManifestStr
/*        let result = UglifyJS.minify(ManifestStr)
        if (!result.error) {
          result = result.code
        } else {
          throw new Error('minify InjectManifest err')
        }
        */
        // -----------------------------------------------
        fs.writeFileSync(path, result)
        resolve('injectManifest ok')
      })
    })
  })
}

let webPackBuild = {
  init: function () { // 创建目录 buildFile cp
    if (!fs.existsSync(path.resolve(__dirname, '../dist/buildFile'))) {
      fs.mkdirSync(path.resolve(__dirname, '../dist/buildFile'))
      fs.writeFileSync(_target, fs.readFileSync(origin))
      fs.writeFileSync(_target2, fs.readFileSync(origin2))
    }
    this.getJSCSS()
  },
  getJSCSS: function () {
    let that = this;
    (async () => { // 获取 js css 路径下面 css js 名
      cssArray = await readdirs(distPath + '/css')
      jsArray  = await readdirs(distPath + '/js')
      let jsArray1 = []
      _.each(jsArray,(val,key)=>{
          if(!val.includes('.map')) jsArray1.push(val)
      })
      jsArray = jsArray1
      that.injectFileMap() // 包装 css js 源文件
      that.injectManifest(jsArray) // 包装 manifest.xxx.js
    })()
  },
  injectFileMap: function () {
    injectFileMap(sameSourceCDN, tBaseModules, cssArray, jsArray, webPackBuild.injectHtml)
  },
  injectManifest: function (jsArray) {
    let manifestPath = '' // manifest.xxx.js的路径
    _.each(jsArray, function (value) {
      if (value.match(/^manifest\S*\.js$/g)) {
        manifestPath = path.resolve(__dirname, distPath + '/js/' + value)
        return true
      }
    })
    injectManifest(manifestPath)
  },
  injectHtml: function () {
    webPackBuild.injectIndex(_target, origin)
    webPackBuild.injectIndex(_target2, origin2)
  },
  injectIndex: function (readFile, writeFile) {
    /** 注入修改 入口html */
    fs.readFile(readFile, function (err, data) {
      if (err) return console.info(`读取文件${readFile}出错`)
      let $ = cheerio.load(data + '')
      if (global.fileMapInfo) { // FileMap文件生成之后的文件信息
        $('title').after(`<script>window._fileMapInfo = {'fileName': '${global.fileMapInfo.fileName}', 'url': '${global.fileMapInfo.url}'} </script>`)
      }
      fs.writeFile(writeFile, cryptHtml($.html()), function (err) {
        if (err) return console.log(`crypt ${readFile} fail`)
        fs.writeFileSync(readFile, $.html()) // 备份，用于定位，便于调试
        console.info(`crypt ${readFile} success`)
      })
    })
  }
}

/**
 * 文件生成 在 buildFile 目录下执行
 * @param nodeCdnUrl {String} 资源CDN
 * @param baseModules {Array} 基本依赖模块，首页html跑起来时需要加载对应css\js文件，localStorage本地存储功能使用
 * @constructor
 */
function BuldOnline (nodeCdnUrl, baseModules) {
  sameSourceCDN = nodeCdnUrl || ''
  tBaseModules = baseModules || {}
  webPackBuild.init()
}

module.exports = BuldOnline
// BuldOnline() 单 文件调试
