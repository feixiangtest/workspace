const path              = require('path')
const fs                = require("fs")
const config            = require('./index')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const projectInfo       = require('./multipage.project')()
console.log('启动项目 ==>', projectInfo)
global.projectInfo = projectInfo

let baseURL     = './src/' + projectInfo.name + '/pages';	//根路径
let moduleList  = getModuleList(baseURL);	//页面
let mainOptions = {};
let mainHTML    = path.join(__dirname, '..', 'src/alone/html/maintain.html');


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

//  维护页面 html 参数设置
function maintainHtml() {
  return {
    filename: config.build.assetsRoot + '/maintain.html',
    template: mainHTML,
    inject: false,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunks: []
  }
}

//获取当前目录中文件
function getModuleList(path) {
  let list   = [];
  let fsList = fs.readdirSync(path);	//所有目录
  fsList.forEach(function (item, index) {
    let module = {
      id: item,
      js: path + '/' + item + '/index.js',
      html: path + '/' + item + '/index.html',
      favicon: path + '/' + item + '/favicon.ico'
    }
    list.push(module);
  })
  return list;
}

//webpack.base.conf.js entry
function getEntries() {
  //js入口数组
  let entries = {}
  //变量模块列表
  moduleList.forEach(function (item) {
    if (item.id) {
      entries[item.id] = item.js;
    }
  })
  return entries;
}

function getDevHtmlList() {
  let devList = [];
  moduleList.forEach(function (item) {
    if (item.id) {
      let opts = {
        filename: item.html,
        template: item.html,
        favicon: resolve(item.favicon),
        inject: true,
        chunks: [item.id, "vendor", "manifest"]
      }
      devList.push(new HtmlWebpackPlugin(opts));
    }
  })

  if (projectInfo.name == 'alone') {
    devList.push(new HtmlWebpackPlugin({
      filename: config.build.assetsRoot + '/maintain.html',
      template: mainHTML,
      inject: false,
      chunks: []
    }));
  }
  return devList;
}

//webpack.dev.conf.js devServer.historyApiFallback.rewrites
function getHistoryRewrites() {
  //缓存dev的 historyApiFallback.rewrites
  let historyList = [];
  moduleList.forEach(function (item) {
    if (item.id) {
      if (item.id == 'index') {
        //  console.log('----------item.id----------------------------------------',item.html)
        let opts = {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, item.html)
        }
        historyList.push(opts);
      } else {
        let opts = {
          from: new RegExp('^\/' + item.id + ''),
          to: path.posix.join(config.dev.assetsPublicPath, item.html)
        }
        historyList.unshift(opts);
      }
    }
  })
  if (projectInfo.name == 'alone') {
    historyList.push({
      from: /^maintain*/,
      to: mainHTML
    });
  }
  return historyList;
}

/**
 *dev的Html模板
 ----------item----------------------------------------
 {
   id: 'index',
   js: './src/alone/pages/index/index.js',
   html: './src/alone/pages/index/index.html',
   favicon: './src/alone/pages/index/favicon.ico'
   }
 */
function getProdHtmlList() {
  let prodList = [];

  moduleList.forEach(function (item) {

    if (item.id) {
      let filename;
      if (item.id == 'index') {
        filename = config.build.index;
      } else {
        filename = config.build.assetsRoot + '/' + item.id + '/index.html'
      }
      let opts = {
        filename: filename,
        template: item.html,
        favicon: resolve(item.favicon),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      }
      prodList.push(new HtmlWebpackPlugin(opts));
    }

    if (projectInfo.name == 'alone') {
      prodList.push(new HtmlWebpackPlugin(maintainHtml()));
    }

  })
  return prodList;
}

module.exports = {
  getEntries,
  getDevHtmlList,
  getHistoryRewrites,
  getProdHtmlList,
  project: projectInfo
}
