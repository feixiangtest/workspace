const path          = require('path');
const fs            = require("fs-extra");
const folderVersion = require("../../config/folderVersion")
var filePath        = path.resolve(__dirname, '../../dist')

function goDeep(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) return console.log(err)
    files.forEach(function (filename) {
      var fileMaybe = path.join(filePath, filename);
      fs.stat(fileMaybe, function (er, stats) {
        if (er) return console.log('fs.stat' + er);
        var isFile = stats.isFile()
        if (isFile && (fileMaybe.indexOf('.css') > 1 || fileMaybe.indexOf('.js') > 1)) {
          fs.readFile(fileMaybe, 'utf8', function (err, files) {
            if (err) return console.log(err)
            var result = files.replace(folderVersion.replace[0], folderVersion.replace[1]);
                result = result.replace(folderVersion.replaceH5[0], folderVersion.replaceH5[1]);
            // 检查 H5 打包 h5resource 错误问题
            if (fileMaybe.indexOf('.js') > 1 && fileMaybe.indexOf('manifest.') > 0) {
              result = result.replace(/\/h5/, '/h5/');
              result = result.replace(/\/h5\/\//, '/h5/');
            }
            if (result == files) return
            fs.writeFile(fileMaybe, result, 'utf8', function (err) {
              if (err) return console.log(err);
              // console.log('遍历的文件夹 修正 版本号问题 ' + fileMaybe)
            })
          })
        }
        if (stats.isDirectory()) goDeep(fileMaybe)
      })
    });
  });
}

exports.init = async function () {
  await goDeep(filePath)
}
