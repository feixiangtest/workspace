/**
 maintain 控制CDN 请求 chunkId
 chunkId 是否存在localStorage
 */
const beautify = require('js-beautify').js
const readline = require('readline')
const stream   = require('stream')

/** 注意
 *  服务器 打包 变量 名字 和本地 不一致
 *  关于修改的 位置的代码  var  name 必须动态获取 才能保证正确
 *  新增的代码 需要 varSrcName
 */
function getJSCord (varSrcName) {
  let injectJS = `
    var GetUrl = ${varSrcName}.src
    var chunkId = GetUrl.split('js/')[1];

    console.info(chunkId , 'chunkId')
    if(localStorage[chunkId]){ 
         window.FileMap.__addJS( '(' + localStorage[chunkId] + ')(); ', chunkId)
         ${varSrcName} = document.createElement('script')
    }else {
        console.log('manifest 放过')
        ${varSrcName}.setAttribute('id', '__webpack_' + chunkId )
    }
`
  return injectJS
}
function getStrByKeyword (arr, keyStr) {
  for (let str of arr) {
    if (str.includes(keyStr)) {
      return str
    }
  }
}
function getParamNameByStr (str) {
  if (!str) {
    return ''
  }
  let s = str.split(')')[0]
  let arr = s.split('(')
  if (arr.length > 1) {
    return arr[arr.length - 1].toLowerCase()
  }
  return ''
}

class injectManifest {

  injectCdnUrl (str, callback) {
    str = injectManifest.injectLSave(str, callback)
    return str
  }

  static injectLSave (str, callback) {
    let lineNo       = 0
    let jsStr        = ''
    let varSrcName   = ''
    let _requireName = false
    let chunkbuf     = new Buffer(beautify(str, {indent_size: 2, space_in_empty_paren: true}))
    let bufferStream = new stream.PassThrough()
    bufferStream.end(chunkbuf)
    let rl = readline.createInterface({
      input: bufferStream
    })
    rl.on('line', (line) => {
      let arr = line
      lineNo++
      if (arr.match(/appendChild/g)) {
        let hStr = getStrByKeyword(arr.split(';'), 'appendChild')
        let replaceStr = getStrByKeyword(hStr.split(','), 'appendChild')
        let scriptParamName = getParamNameByStr(replaceStr)
        let rpStr = `(window.FileMap.addLoadBusinessTask(${scriptParamName}) === false ? (${replaceStr}) : '')`
        arr = arr.replace(replaceStr, rpStr)
      }
      jsStr += arr + '\n'
    })
    rl.on('close', function () {
      callback(jsStr)
    })
    // rl.on('line', (line) => {
    //   const arr = line
    //   lineNo++
    //   if (lineNo == 2) {
    //     let requireName = arr.replace(/\s+/g, '')
    //     requireName     = requireName.split('function')[1][0] // 切割 得到 n(r){  取1个的名字
    //     _requireName    = requireName
    //   }
    //
    //   if (arr.match(/charset/g) && !varSrcName) {
    //     let a1     = arr.replace(/\s+/g, '')
    //     varSrcName = a1.split('.type')[0] // get f.src name
    //   }
    //   /**
    //    获取压缩后的  n 的 具体 name 是什么
    //    webpack  压缩后 require function
    //    function __webpack_require__ (moduleId) {
    //    不一定是  n.p
    //                 动态获取名字
    //    * @type {string}
    //    * console.log('匹配 ([]);')
    //    */
    //
    //   if (arr.match(/setTime/g)) {
    //     let injectJS = getJSCord(varSrcName)
    //     jsStr += arr + '\n'
    //     jsStr += injectJS + '\n'
    //   } else {
    //     jsStr += arr + '\n'
    //   }
    //   // 底部
    //   if (arr.match(/\}\(\[\]\)/g)) {
    //   //  jsStr += `;window.FileMap.config.cdnUrl?${_requireName}.p=window.FileMap.config.cdnUrl:''` + '\n'
    //     // todo 可能有bug 替换一下
    //     jsStr += `;window.FileMap.config.cdnUrl?${varSrcName}.p=window.FileMap.config.cdnUrl:''` + '\n'
    //   }
    //
    // })
    // rl.on('close', function () {
    //   if (!varSrcName) {
    //     throw new Error('InjectManifest 获取 变量出错')
    //   }
    //   callback(jsStr)
    // })
  }
}

module.exports = injectManifest
