/**
 * babel example.js --out-file compiled.js
 * node ./node_modules/babel-cli/bin/babel.js src --out-dir lib
 */
const cp = require('child_process')

cp.exec('ls', (e, stdout, stderr) => {
  console.log('stdout ', stdout)
  console.log('stderr ', stderr)
})
