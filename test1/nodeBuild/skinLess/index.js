/*
   定义默认任务 Task  打包皮肤
   url  皮肤less 路径
   dist 生成路径
*/
const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const rev = require('gulp-rev')
const less = require('gulp-less')
const each = require('gulp-each')
const replace = require('gulp-replace')

const readline = require('readline')
const crypto = require('crypto')

let skinOp = path.resolve(__dirname, `../../src/base/assets/less/skin_op/`)
let skinOg = path.resolve(__dirname, `../../src/base/assets/less/skin_og/`)
let skinDefault = path.resolve(__dirname, `../../src/base/assets/less/skin_default/`)
let targetPath = path.resolve(__dirname, `../../dist/static/${global.folderVersion.after}/css/`)

/**
 * 借用 gulp 任务 编译less
 * @param url
 * @param dist
 * @constructor
 */
function Task (url, dist, siteType) {
  let jsonFileUrl = dist + '/rev-manifest.json'
  gulp.src(url)
    .pipe(less({
      globalVars: { // 设置全局变量
        folderV: global.folderVersion.after
      }
    }))
    .pipe(rev()) // 文件名字添加hash值，生成的文件名格式如：index-6e13a8bc64.css
    .pipe(gulp.dest(dist))
    .pipe(rev.manifest()) // 生成 rev-manifest.json文件映射对应的文件名
    .pipe(gulp.dest(dist))
    // 发现通过.pipe(rev())方式得到的文件hash值有bug，内容有小部分更改之后，hash值不会改变，因此更改为使用内容的md5值来替换文件名的hash值
    .on('end', () => {
      // 判断文件是否存在
      if (!fs.existsSync(jsonFileUrl)) {
        return
      }
      // 读取生成的固定json文件
      fs.readFile(jsonFileUrl, function (err, data) {
        if (err) throw err
        // 智能添加后缀'/'
        let folderUrl = dist
        if (dist && dist.charAt(dist.length - 1) !== '/') {
          folderUrl += '/'
        }
        let jsonObj = JSON.parse(data)
        for (let key in jsonObj) { // 循环获取对应的css文件url
          let prefix = 'skin_' + siteType
          let oldName = jsonObj[key]
          if (oldName.split('/').length > 1) {
            prefix += oldName.split('/')[0]
          }
          let content = fs.readFileSync(folderUrl + oldName) // 同步得到文件内容
          let md5Name = crypto.createHash('md5').update(content).digest('hex') // 生成md5值
          let newName = oldName.replace(/index-(\S)+.css/g, prefix + '.' + md5Name + '.css') // 将名称重新使用md5值
          // 重命名
          fs.rename(folderUrl + oldName, folderUrl + newName, function (err) {
            if (err) {
              console.log('样式文件名称替换报错，旧文件名：' + folderUrl + oldName + '，新文件名：' + folderUrl + newName)
              throw err
            }
          })
          jsonObj[key] = newName // 更改json对象中原有的文件名称
        }
        fs.writeFileSync(jsonFileUrl, JSON.stringify(jsonObj))
        console.log(`${jsonFileUrl}包含的文件编译并重命名成功`)
      })
    })
}

function skinLessBuild () {
  Task(skinOp + '/*/index.less', targetPath + '/skin_op', 'op')
  Task(skinOg + '/*/index.less', targetPath + '/skin_og', 'og')
  Task(skinDefault + '/index.less', targetPath + '/skin_default', 'default')
}

module.exports = skinLessBuild
// webpack build 任务结束后 才可以调用 skinLessBuild()
