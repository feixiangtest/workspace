/*
 * 环境列表，第一个环境为默认环境
 * envName: 指明现在使用的环境
 * dirName: 打包的路径，只在build的时候有用
 * hostname: 这个环境下面的hostname
 * */
module.exports = {
  'sit': {
    hostname: '//sit1cpm109.bwt18.com'
  },
  'pua': { //
    hostname: '//sytl3.com'
  },
  'op': { // bwt 线上域名 公用
    hostname: '//sytl3.com'
  },
  'op1': { // bwt1 线上域名
    hostname: '//sytl3.com'
  },
  'op2': { // bwt2 线上域名
    hostname: '//sytl3.com'
  },
  'op3': { // bwt3 线上域名
    hostname: '//sytl3.com'
  },
  'og': { // og 线上域名
    hostname: '//sytl3.com'
  },
  'og03': { // og 03月新增 线上域名
    hostname: '//cdn.zhaohuizs.com'
  }
}
/**  og03 与 其他 资源 不在同一个服务器上
 *   需要单独发
 *
 */
