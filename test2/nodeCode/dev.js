const cp   = require('child_process')
require('./neverDie.js')

var CMD1 = 'npm run dev'
var cmdProcess = cp.exec(CMD1, {});

cmdProcess.stdout.on('data', function (data) {
  console.log('std out: ' + data);
});

cmdProcess.stderr.on('data', function (data) {
  console.log('std err: ' + data);
});
