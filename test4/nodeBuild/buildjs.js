const _            = require('lodash')
const readline     = require('readline')
const fs           = require('fs')
const path         = require('path')
const UglifyJS     = require('uglify-js')
let injectManifest = require('./injectManifest')
let InjectManifest = new injectManifest()
let jstxt          = ''
/**
 * path.resolve(__dirname, '路径')
 * @param data 传入参数
 * @param fn   callback
 */
exports.buildJS = function (data, fn) {
  let cssD5                       = data.CSSArray[0]
  let manifestD5, vendorD5, appD5 = null
  let _v                          = new Date().getTime()
  console.info(data.jsArray, 'jsArray')
  _.each(data.jsArray, function (value, key) {
    if (_.startsWith(value, 'app')) appD5 = value
    if (_.startsWith(value, 'manifest')) manifestD5 = value
    if (_.startsWith(value, 'vendor')) vendorD5 = value
  })
  writeManifest(manifestD5)
  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, '../static/lt_h5_v3/RequireFile.js'))
  })
  rl.on('line', (line) => {
    const arr = line
    // console.log('current', arr)
    if (arr.match(/^_insert/g)) {
      console.log('match insert', arr)
      jstxt += `
// insert start
FileMap.config.v = ${_v}
FileMap.config.map['app.css'] = FileMap.config.cdnUrl + FileMap.config.jsVersion + '/css/${cssD5}'
FileMap.config.map['manifest.js'] = FileMap.config.cdnUrl + FileMap.config.jsVersion + '/js/${manifestD5}'
FileMap.config.map['vendor.js'] = FileMap.config.cdnUrl + FileMap.config.jsVersion + '/js/${vendorD5}'
FileMap.config.map['app.js'] = FileMap.config.cdnUrl + FileMap.config.jsVersion + '/js/${appD5}'
// insert end
          `
    } else {
      jstxt += arr + '\n'
    }
  })
  rl.on('close', function () {
    let result = UglifyJS.minify(jstxt)
    if (!result.error) jstxt = result.code
    fs.writeFile(path.resolve(__dirname, '../dist/static/lt_h5_v3/RequireFile.js'), jstxt, function (err) {
      if (err) return console.log('write fail')
      console.info('write RequireFile done')
      fn()
    })
  })
}

function writeManifest (manifestD5) {
  let txt = fs.readFileSync(path.resolve(__dirname, '../dist/static/lt_h5_v3/js/' + manifestD5)) + ''
  InjectManifest.injectCdnUrl(txt, true, function (ManifestStr) {
    // fs.writeFileSync(path.resolve(__dirname, '../dist/static/lt_h5_v3/js/ManifestStr.js'), ManifestStr)
    // debug
    if (!ManifestStr) throw new Error('InjectManifest.injectCdnUrl err')
    let result = UglifyJS.minify(ManifestStr)
    if (!result.error) {
      result = result.code
    }else{
      throw new Error('minify InjectManifest err')
    }
    fs.writeFileSync(path.resolve(__dirname, '../dist/static/lt_h5_v3/js/' + manifestD5), result)
  })
}
