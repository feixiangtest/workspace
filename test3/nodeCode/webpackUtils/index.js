/**
 *
 *   webpack 构建 公用 函数
 */


const minimist = require('minimist');

function args() {
  return minimist(process.argv.slice(2));
}

exports.args         = args
