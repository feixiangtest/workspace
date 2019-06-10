/**
 *  处理 loader.js  cdnUrl = xxxx
 */
const fs       = require('fs-extra')
const path     = require('path')
const UglifyJS = require('uglify-js')
const jsfile   = path.resolve(__dirname, '../../dist/resource/share/Loader.js')

function setCDN() {
  let projectInfo = require('../../config/multipage.project.js')()
  fs.readFile(jsfile, 'utf8', function (err, files) {
    files = files + '';
    files = files.replace(/cdnUrl: ''/g, `cdnUrl: '${projectInfo.cdnUrl}'`);
    files = UglifyJS.minify(files, {compress: {drop_console: true}})

    if (!files.error) {
      files = files.code
    } else {
      return console.log('压缩Loader.js文件错误信息：', files.error)
    }

    fs.writeFile(jsfile, files, function (err) {
      if (err) return console.log(`cryp fail`)
      console.info(`重写 Loader files success`)
    })

    fs.move(path.resolve(__dirname, '../../dist/resource/share/cdn.js'), path.resolve(__dirname, '../../dist/resource/share/cdn.config'), err => {
      if (err) return console.error(err)
    })
  })

}

exports.setCDN = setCDN
