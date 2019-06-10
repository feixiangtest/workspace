/**
 * 单个打包 share
 */
const path = require('path');
const fs   = require("fs-extra");
const rm   = require('rimraf')

let {copyResource, VersionFix} = require('./buildFix')

// 排除 干扰
rm(path.resolve(__dirname, '../dist/resource'), err => {
  if (err) throw err
  copyResource()
  VersionFix()
})
