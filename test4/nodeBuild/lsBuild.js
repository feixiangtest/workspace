/**
 * 注意事项 如果修改了 webpack build 脚本代码 重新打包 MD5值 是不会变化的
 * 没有修改到 vue的代码
 *
 */
// API + 第三方框架
const cheerio  = require('cheerio')
const path     = require('path')
const fs         = require('fs')
const UglifyJS = require('uglify-js')
const _        = require('lodash')

// build 脚本 + config 文件
const {cryptHtml}     = require('./crypt')
const {injectFileMap} = require('./injectFileMap')
let Manifest          = require('./injectManifest')
const wrapFn          = require('./jsonp')
let {fileV}           = require('./config')
let distPath          = path.resolve(__dirname, `../dist/static/${ fileV }`)
const currentPath     = path.dirname(__filename)

// 初始化 var
let jsArray           = []
let CSSArray          = []
let jsList            = []
let [origin, _target] = [path.resolve(__dirname, '../dist/index.html'), path.resolve(__dirname, '../dist/buildFile/index.html')]
let _target2          = path.resolve(__dirname, '../dist/buildFile/index1.html')
let WrapFn            = new wrapFn()
let ManifestF         = new Manifest()

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
        let result = UglifyJS.minify(ManifestStr)
        if (!result.error) {
          result = result.code
        } else {
          throw new Error('minify InjectManifest err')
        }
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
    }
    if (!fs.existsSync(path.resolve(__dirname, distPath + '/cp'))) {
      fs.mkdirSync(path.resolve(__dirname, distPath + '/cp'))
    }
    // this.injectIndex()  重复执行了
    this.getJSCSS()
  },
  getJSCSS: function () {
    let that = this;
    (async () => { // 获取 js css 路径下面 css js 名
      CSSArray = await readdirs(distPath + '/css')
      jsArray  = await readdirs(distPath + '/js')
      that.injectFileMap() // 包装 css js 源文件
      that.wrapCP() // 拷贝 css js 到cp 目录

    })()
  },
  injectFileMap: function () {
    injectFileMap(CSSArray, jsArray, () => { // 处理 index 转码
      webPackBuild.injectIndex() // index
    })
  },
  injectIndex: function () {
    /** 注入修改 index.html */
    fs.readFile(_target, function (err, data) {
      if (err) return console.info('读取 indexBuild.html 文件出错')
      let $ = cheerio.load(data + '')
      $('title').after(`<script>window._lsBuildLoadFile = {'fileMapUrlMd5': '${global.fileMd5}', 'cdnUrlTimestamp': '${new Date().getTime()}'} </script>`)

      fs.writeFile(origin, cryptHtml($.html()), function (err) {
        if (err) return console.log('crypt index.html fail')
        console.info('crypt index.html sucess')
      })
      fs.writeFile(_target, $.html(), function(){})
    })
  },
  wrapCP: function () { // 异步: 使用 async + callback
    let manifestPath = null
    _.each(jsArray, function (value) {
      if (value.match(/^mani\S*\.js$/g)) {
        manifestPath = path.resolve(__dirname, distPath + '/js/' + value)
        return true
      }
    })

    ~(async () => {
      let getM = await injectManifest(manifestPath)
      _cpJS() // 拷贝 /js/*.js 到 /cp/ 目录下
    })()

    ;(async () => { // 拷贝 /css/*.css 到 /cp/ 目录下
      let a11y = await readJS(path.resolve(__dirname, distPath + '/css/' + CSSArray[0]))
      fs.writeFile(path.resolve(__dirname, distPath + '/cp/app.css.js'), WrapFn.init(a11y, CSSArray[0], 'css'), function (err) {
        if (err) throw err('write fail')
      })
    })()

    function _cpJS () {
      _.each(jsArray, function (value) {
        let _path = path.resolve(__dirname, distPath + '/js/' + value)
        fs.readFile(_path, 'utf8', function (err, data) {
          if (err) throw err('_cpJS readFile fail')
          fs.writeFile(path.resolve(__dirname, distPath + '/cp/' + value), WrapFn.init(data, value), (err) => {
            if (err) throw err('_cpJS write fail')
          })
        })
      })
      console.log('copy css + js to cp sucess')
    }
  }
}

// 文件生成 在 buildFile 目录下执行
function BuldOnline () {
  webPackBuild.init()
}

module.exports = BuldOnline
// BuldOnline() 单 文件调试
