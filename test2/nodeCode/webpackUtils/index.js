/**
 *
 *   webpack 构建 公用 函数
 */
const cp       = require('child_process')
const rm       = require('rimraf')
const async    = require('async')
const minimist = require('minimist');

//  子进程 挂掉 是日志输出太多造成的
// 时间长 会挂
function childProcess(cmd, cb, done) {
  if (!cmd) throw 'cmd no found'
  var cmdProcess = cp.exec(cmd, {});
  cmdProcess.stdout.on('data', function (data) {
    cb(data) //  这里 console 不会显示
  });
  cmdProcess.on('close', function (data) {
    done(data)
  });
}

// 队列任务
function Q(expression, num = 1) {
  return async.queue(function (task, callback) {
    expression(task, callback)
  }, num)
}

// 获取 cmd 参数
function args() {
  let argv = [...process.argv.slice(2)]
 //  修复  // 会变成 /
  try {
    argv[1] = argv[1].replace(/\//g, '')
    argv[1] = '//' + argv[1]
  } catch (e) {
  }
  return minimist(argv);
}

exports.args         = args
exports.Q            = Q
exports.childProcess = childProcess
