const _        = require('lodash')
const UglifyJS = require('uglify-js')
const crypto   = require('crypto')

const readline = require('readline')
const fs       = require('fs')
const path     = require('path')
let {fileV}    = require('./config')

exports.injectFileMap = function (CSSArray, jsArray, callBack) {
  // 注入 CSSArray, jsArray ==> map 文件
  let _v    = new Date().getTime()
  let cssD5 = CSSArray[0]
  let jstxt = ''

  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, '../static/lt_h5_v3/FileMap.js'))
  })

  rl.on('line', (line) => {
    const arr = line
    if (arr.match(/^_insert/g)) { // 注入点
      jstxt += `
// insert start
window.fileV = '${fileV}';
FileMap.config.v = ${_v};
FileMap.config.home = ['','','']
FileMap.config.original['app.css'] = '/static/${fileV}/css/${cssD5}';
FileMap.config.home[3] = '${cssD5}'; // CSS MD5 清除 旧的数据
FileMap.config.map['app.css'] = '/static/${fileV}/cp/app.css.js';`
      _.each(jsArray, function (value) {
        let one = value
        jstxt += `
FileMap.config.map['${one}'] = '/static/${fileV}/cp/${one}';
        `
        if (one.match(/^mani\S*\.js$/g)) {
          jstxt += `
FileMap.config.original['manifest.js'] = '/static/${fileV}/js/${one}';
FileMap.config.home[0] = '${one}'
        `
        }
        if (one.match(/^app\S*\.js$/g)) {
          jstxt += `
FileMap.config.original['app.js'] = '/static/${fileV}/js/${one}';
FileMap.config.home[2] = '${one}'
        `
        }
        if (one.match(/^vend\S*\.js$/g)) {
          jstxt += `
FileMap.config.original['vendor.js'] = '/static/${fileV}/js/${one}';
FileMap.config.home[1] = '${one}'
        `
        }
      })
      jstxt += '// insert end'
    } else {
      if (!arr.match(/^NODE_ENV/g)) {
        jstxt += arr + '\n'
      }
    }
  })

  rl.on('close', function () {
    if (!jstxt) return false
    // jstxt = UglifyJS.minify(jstxt, {compress: {drop_console: true}}) debug
    jstxt = UglifyJS.minify(jstxt)
    if (!jstxt.error) {
      jstxt = jstxt.code
    } else {
      throw new Error('minify FileMap err')
    }
    var h = crypto.createHash('md5')

    h.update(jstxt)
    var fileMd5 = h.digest('hex')
    global.fileMd5 = fileMd5
    fs.writeFile(path.resolve(__dirname, `../dist/static/${ fileV }/FileMap.${ fileMd5 }.js`), jstxt, function (err) {
      if (err) return console.log('write fail')
      console.info('Rwrite FileMap.js sucess')
      callBack()
    })
    // 压缩 catchListen.js
    let catchListen  = fs.readFileSync(path.resolve(__dirname, `../dist/static/${ fileV }/catchListen.js`)) + ''
    let catchListenMin = UglifyJS.minify(catchListen);
    if (!catchListenMin.error) {
      catchListenMin = catchListenMin.code
    }
    fs.writeFile(path.resolve(__dirname, `../dist/static/${ fileV }/catchListen.js`), catchListenMin, function (err) {
      if (err) return console.log('write fail')
      console.info('Rwrite catchListen.js sucess')
    })
  })
}
