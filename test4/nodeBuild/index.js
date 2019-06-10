'use strict'
/*
 *   遍历 dist 生成的css js 的 name
 *   动态 生成 require.js 文件 去缓存 正确的js文件
 *   只能运行1次
 *   目前不用了 这是是旧的代码
 *   path.resolve(__dirname, '路径')
 * */
const cheerio         = require('cheerio')
const path            = require('path')
const _               = require('lodash')
const {buildJS}       = require('./buildjs')
const currentPath     = path.dirname(__filename)
// js 资源版本号
let fileV             = 'lt_h5_v3'
let fs                = require('fs')
let distPath          = path.resolve(__dirname, `../dist/static/${ fileV }`)
let jsArray           = []
let CSSArray          = []
let [origin, _target] = [path.resolve(__dirname, '../dist/index.html'), path.resolve(__dirname, '../dist/buildFile/index.html')]

function readFile (path, saveLet) {
  var files = fs.readdirSync(path)
  files.forEach(function (filename) {
    //  filename.match(/\S*\.js$/g)
    filename.match(/^app\S*\.js$/g) ||
    filename.match(/^mani\S*\.js$/g) ||
    filename.match(/^vend\S*\.js$/g) ||
    filename.match(/\S*\.css$/g) ? saveLet.push(filename) : ''
  })
}

function injectIndex () {
  fs.readFile(_target, function (err, data) {
    if (err) return console.info('读取 indexBuild.html 文件出错')
    var $ = cheerio.load(data + '')
    // 使用MD5值 css + js 动态生成 ===>requireFile.js 文件
    buildJS({CSSArray, jsArray}, function () {
      _.each(CSSArray, function (value, key) {
        $('#nodeHead').append(';loadCss(\'app.css\')')
      })
      $('#nodeBody').append(`
;loadJs('manifest.js');loadJs('vendor.js');loadJs('app.js');appendJS()`)
      fs.writeFile(origin, cryptIndex($.html()), function (err) {
        if (err) return console.log('write fail')
        console.info('write indexBuild.html done')
        try {
          fs.unlinkSync('../dist/static/config/cnd.json')
        } catch (e) {

        }
      })
    })
  })
}

// 文件生成 在 buildFile 目录下执行
function BuldOnline (simpe = null) {
  readFile(distPath + '/css', CSSArray)
  readFile(distPath + '/js', jsArray)
  if (!fs.existsSync(path.resolve(__dirname, '../dist/buildFile'))) {
    fs.mkdirSync(path.resolve(__dirname, '../dist/buildFile'))
    fs.writeFileSync(_target, fs.readFileSync(origin))
  }
  if (!simpe) { // cdn 使用本地缓存模式
    injectIndex()
  } else {
    fs.readFile(_target, function (err, data) {
      if (err) return console.info('读取 indexBuild.html 文件出错')
      let $ = cheerio.load(data + '')
      fs.writeFile(origin, cryptIndex($.html()), function (err) {
        if (err) return console.log('write fail')
        console.info('crypt index.html done')
      })
    })
  }
}
/**
 * @param content
 * @returns {string}
 * encrypt , cryptKey 没完成
 */
function cryptIndex (content) {
  let data  = crypt(content)
  var _html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <script>
          function deC(str){var _Decode=String.fromCharCode;a=str.split(" "),b="";for(var i=0;i<a.length;i++)a[i]&&(b+=_Decode(a[i]));return b}~function(data,DecodeFN){document.write(deC(data))}("${data}");
          </script>
      </head>
      <body>
      </body>
      </html>
  `

  function crypt (str, encrypt) {
    var strAscii = []
    for (var i = 0; i < str.length; i++) {
      strAscii[i] = str.charCodeAt(i)
    }
    var getAscii = ''
    for (var i = 0; i < strAscii.length; i++) {
      if (encrypt) {
        strAscii[i] = strAscii[i] - cryptKey
      }
      getAscii += strAscii[i]
      getAscii += ' '
    }
    return getAscii
  }
  return _html
}
module.exports = BuldOnline
