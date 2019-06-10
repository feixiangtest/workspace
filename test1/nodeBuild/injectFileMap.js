const _ = require('lodash')
const UglifyJS = require('uglify-js')
const babel = require('babel-core')

const readline = require('readline')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const md5 = crypto.createHash('md5')
const cp = require('child_process')
/**
 * 插入FileMap文件
 * @param sameSourceCDN 资源CDN
 * @param baseModules {Object} 基本依赖模块，首页html跑起来时需要加载对应css\js文件
 * @param cssArray
 * @param jsArray
 */
exports.injectFileMap = function (sameSourceCDN, baseModules, cssArray, jsArray, successFunc) {
	console.log(global.folderVersion.after, sameSourceCDN, baseModules, cssArray, jsArray, successFunc)
  let fileV = global.folderVersion.after || ''
  // 注入 cssArray, jsArray ==> map 文件
  let _v = new Date().getTime()
  let jstxt = ''
  let lineNo = 0 // 标记是多少行
  // 如果最后一个字符串为'/'，则删除该'/'
  if (sameSourceCDN && sameSourceCDN.charAt(sameSourceCDN.length - 1) === '/') {
    sameSourceCDN = sameSourceCDN.substr(0, sameSourceCDN.length - 1)
  }

  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, `../dist/static/${fileV}/FileMap.js`))
  })

  rl.on('line', (line) => {
    const arr = line
    lineNo++
    if (lineNo > 1) {
      if (arr.match(/^_insert/g)) { // 注入点
        jstxt += `
// insert start
window.fileV = '${fileV}'
window.FileMap._isPro = true // 是否线上模式
window.FileMap.config.v = ${_v}
window.FileMap.config.webModules = ${JSON.stringify(baseModules.web || [])}
window.FileMap.config.paymentModules = ${JSON.stringify(baseModules.payment || [])}
window.FileMap.config.sameSourceCDN = '${sameSourceCDN}'`
        // 遍历css文件数组
        _.each(cssArray, function (value) {
          let chunkName = value
          jstxt += `
window.FileMap.config.map['${chunkName}'] = '${sameSourceCDN}/static/${fileV}/css/${chunkName}'`
        })
        // 遍历js文件数组
        _.each(jsArray, function (value) {
          let chunkName = value
          jstxt += `
window.FileMap.config.map['${chunkName}'] = '${sameSourceCDN}/static/${fileV}/js/${chunkName}'`
        })
        jstxt += `
// insert end`
      } else {
        if (!arr.match(/^NODE_ENV/g)) {
          jstxt += arr + '\n'
        }
      }
    }
  })

  rl.on('close', function () {
    if (!jstxt) return false

    let md5Val = md5.update(jstxt).digest('hex')
    let targetFileName = `FileMap.${md5Val}.js` // 文件名添加MD5值
    let targetFileUrl = `/static/${fileV}/${targetFileName}`
    let targetFileCdnUrl = sameSourceCDN + targetFileUrl
    global.fileMapInfo = {fileName: targetFileName, url: targetFileCdnUrl}
    // 写入FileMap.xxx.js文件（可能包含es6语法）
    fs.writeFile(path.resolve(__dirname, `../dist${targetFileUrl}`), jstxt, function (err) {
      if (err) return console.log('fileMap文件写入(转es5前写入)错误信息：', err)
      console.info('Rwrite FileMap.js es5 success')
      var CMD = 'node ' + path.resolve(__dirname, `../node_modules/babel-cli/bin/babel.js`) + ' ' + path.resolve(__dirname, `../dist${targetFileUrl}`) + ' --out-file ' + path.resolve(__dirname, `../dist${targetFileUrl}`)
      cp.exec(CMD, (e) => {
        if (e) return console.log('es6 转 es5 错误信息:', e)
        console.log('fileMap es6 转 es5 完成')
        fs.readFile(path.resolve(__dirname, `../dist${targetFileUrl}`), 'utf8', function (err, data) {
          if (err) return console.log('readFile fileMap es5 error')
          var es5Txt = UglifyJS.minify(data, {compress: {drop_console: true}})
          if (!es5Txt.error) {
            es5Txt = es5Txt.code
          } else {
            return console.log('压缩fileMap.js文件错误信息：', es5Txt.error)
          }
          fs.writeFile(path.resolve(__dirname, `../dist${targetFileUrl}`), es5Txt, function (error) {
            if (error) return console.log('fileMap文件写入(转es5后写入)错误信息：', error)
            console.info('Rwrite FileMap.js es6 success')
            if (typeof successFunc === 'function') {
              successFunc()
            }
          })
        })
      })
    })
  })
}
