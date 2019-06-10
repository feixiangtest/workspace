'use strict'
/*
* 环境列表，第一个环境为默认环境
* envName: 指明现在使用的环境
* dirName: 打包的路径，只在build的时候有用
* hostname: 这个环境下面的hostname
* */
module.exports = {
  'dev1':{
    hostname: '//cdndev1gpom.bwt18.com'
  },
  'sit':{
    hostname: '//cdnsit1gpom.bwt18.com'
  },
  'uat1':{
    hostname: '//cdnuat1gpom.bwt18.com'
  },
  'uat2':{
    hostname: '//cdnuat2gpom.bwt18.com'
  }
}
