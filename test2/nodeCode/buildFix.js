/**
 * 修正打包后的 dist文件目录
 */
const path        = require('path');
const fs          = require("fs-extra");
const cheerio     = require('cheerio')
const rm          = require('rimraf')
const config      = require('../config')
const {cryptHtml} = require('../nodeCode/crypt')
const fixV        = require('./fixV/replace.js');

const source      = path.resolve(__dirname, '../resource/share')
const destination = path.resolve(__dirname, '../dist/share')
let resource      = path.resolve(__dirname, `../dist/resource`)

class cryptClass {
  constructor(webName) {
    this.webName          = webName; // 项目 名字
    let [origin, _target] = [path.resolve(__dirname, `../dist/${webName}/index.html`), path.resolve(__dirname, `../dist/${webName}/buildFile/index.html`)]
    this._target          = _target
    this.origin           = origin
    cryptClass.copyHtml(webName, origin, _target)
    this.crypt()
  }

  static copyHtml(webName, origin, _target) {
    let copyTo = path.resolve(__dirname, `../dist/${webName}/buildFile`);
    if (!fs.existsSync(copyTo)) {
      fs.mkdirSync(copyTo)
      fs.writeFileSync(_target, fs.readFileSync(origin))
    }
  }

  crypt() {
    fs.readFile(this._target, (err, data) => {
      if (err) return console.info(`读取文件${this._target}出错`)
      let _target = this._target
      /*
       todo 以后注入 到html 预留 cdn
       if (global.cnd) { // FileMap文件生成之后的文件信息
       $('title').after(`<script>window._cnd = cnd} </script>`)
       }
       */
      fs.writeFile(this.origin, cryptHtml(data + ''), function (err) {
        if (err) return console.log(`crypt ${_target} fail`)
        console.info(`crypt ${_target} success`)
      })
    })
  }
}

// 拷貝 Resource 到 dist 下面 這一層級
function copyResource() {
  const RESOURCE      = path.resolve(__dirname, '../resource/share')
  const _dist         = path.resolve(__dirname, '../dist')
  const _distRESOURCE = path.resolve(__dirname, '../dist/resource')
  const _share        = path.resolve(__dirname, '../dist/resource/share')
  if (!fs.existsSync(_dist)) {
    fs.mkdirSync(_dist)
  }
  if (!fs.existsSync(_distRESOURCE)) {
    fs.mkdirSync(_distRESOURCE)
    fs.mkdirSync(_share)
  }
  try {
    fs.copySync(RESOURCE, _share)
    console.log('Copy resource completed!')
  } catch (err) {
    console.error(err)
    console.log('Copy copyResource err!!!!!!!!!!!!!!!!!!')
  }
  return ''
}

function copySiteImg() {
  const Folder   = path.join(__dirname, '..', 'dist')
// 项目 名字 组成的数组
  let FolderList = fs.readdirSync(Folder)

  function SiteImg(file, resource) {
    let _dist           = path.resolve(__dirname, `../dist/${file}/resource/${file}`)
    const _distRESOURCE = path.resolve(__dirname, `../dist/resource/${file}`)
    if (fs.existsSync(_dist)) {
      try {
        fs.copySync(_dist, _distRESOURCE)
        console.log('Copy copySiteImg completed!')
      } catch (err) {
        console.error(err)
        console.log('Copy copySiteImg err!!!!!!!!!!!!!!!!!!')
      }
    }
  }

  FolderList.forEach(file => {
    if (file.includes('ot0')) {
      SiteImg(file)
    }
  })
}

/**
 * build all ot 002 bug
 * cdn 那边访问 002 img CDN 这些链接需要到站点下面 resource 取值
 * 手动 拷贝一份
 * @constructor
 */
function VersionFix() {
  const srcpath = path.resolve(__dirname, '../dist/resource/share/RESOURCE_VERSION')
  const dstpath = path.resolve(__dirname, `../dist/resource/share/${config.v}`)
  if (!fs.existsSync(srcpath)) { // 路径可能不存在
    // webpack 没有copy
    return console.log(srcpath + ' not exists')
  }
  fs.move(srcpath, dstpath, err => {
    if (err) return console.error(err)
    console.log(`RESOURCE_VERSION set ${config.v} success!`)
    fixV.init()
    setTimeout(() => {
      // build all ot 002 bug
      // todo 暂时这样写
      copySiteImg()
    }, 2000)
  })
}

// build 全部 之后操作 文件夹 share
exports.init         = function (remove) {
  console.log('修正打包后的dist文件目录')
}
exports.cryptClass   = cryptClass
exports.copyResource = copyResource
exports.VersionFix   = VersionFix
