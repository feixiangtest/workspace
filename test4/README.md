# 下載本倉庫後，先參考「新安裝說明-環境」進行安裝後，在根目錄，透過cmd執行以下指令，就有一個建構在Nodejs Server上的Vue專案
    cmd: npm install
    cmd: npm run dev

# 新安裝說明：
# 環境：
* Node.js，https://nodejs.org/dist/v7.10.0/node-v7.10.0-x64.msi
* Visual studio Code, https://go.microsoft.com/fwlink/?LinkID=623230

## VSCode 套件，可在Extensions搜寻框内输入「@recommended:workspace」，就会显示要装的套件
* 五個 Visual Studio Code 的實用工具與技巧 | How-To | Editor 編輯者 #9，https://www.youtube.com/watch?v=zzon9KS90Dk&feature=youtu.be
* vetur,vue tools,https://marketplace.visualstudio.com/items?itemName=octref.vetur
* markdown編輯，https://code.visualstudio.com/docs/languages/markdown
* Beautify，程式碼格式化套件，https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify
* ESLint，程式碼檢核方式，https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
* Better Merage，Git Merage 工具，https://marketplace.visualstudio.com/items?itemName=pprice.better-merge
* Copy Relative Path，复制档案的相对路径，https://marketplace.visualstudio.com/items?itemName=alexdima.copy-relative-path
* Path Intellisense，自动显示档案路径，https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense
* VSCode， 文件图标拓展，https://marketplace.visualstudio.com/items?itemName=emmanuelbeziat.vscode-great-icons

## Chrome 套件
* Vue DevTools 開發工具,https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?utm_source=chrome-ntp-icon
* 觀看LocalStorage套件，https://chrome.google.com/webstore/detail/html5-storage-manager-all/giompennnhheakjcnobejbnjgbbkmdnd?hl=en-US
* JSON Editor 格式化，https://chrome.google.com/webstore/detail/json-editor/lhkmoheomjbkfloacpgllgjcamhihfaj?utm_source=chrome-ntp-icon

# 新安裝Vue，透過Node.js的NPM 套件管理員
1. 安裝VUE-CLI，來安裝VUE 命令行工具，參考網址：https://cn.vuejs.org/v2/guide/installation.html
``` bash
# 範例如下：
# 全局安装 vue-cli
cmd: npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
cmd: vue init webpack my-project，Pick an ESLint preset,選擇：Airbnb
# 安装依赖，走你
cmd: npm install
cmd: npm run dev
```
## Build Setup

``` bash
# 安裝相依套件，install dependencies
npm install

# 啟動開發Server，serve with hot reload at localhost:8080
npm run dev

# 生產建置，build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 單元測試， run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# add 開發用plugin 到package.json
npm install xxxx套件 --save-dev

npm install --save vue-awesome-swiper


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 從零開始
* 官方：https://cn.vuejs.org/v2/guide/
* 教學網站：http://www.runoob.com/vue2/vue-tutorial.html
* Vue 鐵人大賽，http://ithelp.ithome.com.tw/articles/10184834
* Vue 大神影片，https://www.youtube.com/watch?v=jXdZlbH_ut8

## VUE 官方
* Vue，https://cn.vuejs.org/v2/guide/
* Vuex，https://vuex.vuejs.org/zh-cn/
* Vue router，https://router.vuejs.org/zh-cn/

## 相關資訊
* jenkin with node.js ，http://blog.smlsun.com/2014/04/jenkins-plugins-nodejs.html
* Vue 大型專案架構，https://www.slideshare.net/hinablue/vue-js
* Vue DevTools，重要設定是『debug mode要關掉』https://kuro.tw/posts/2016/12/08/%E9%80%8F%E9%81%8E-VueCLI-%E5%BB%BA%E7%BD%AE%E5%B0%88%E6%A1%88%E6%99%82%EF%BC%8C%E8%87%AA%E5%8B%95%E5%88%87%E6%8F%9B-devtools-%E7%9A%84-debug-%E7%92%B0%E5%A2%83/
* export default 和 export 区别：http://www.jianshu.com/p/edaf43e9384f
* ECMAScript 6入门，http://es6.ruanyifeng.com/

#ECMAScript 6
* ECMAScript 6 入门，http://es6.ruanyifeng.com/?search=require&x=0&y=0#docs/intro

## Vue 大神
* Kuro， https://kuro.tw/

## SampleCode
* 基于 vue2 + vuex 构建一个具有 45 个页面的大型单页面应用，https://github.com/bailicangdu/vue2-elm/blob/master/src/router/router.js

## 異常錯誤處理
* When Error: listen EADDRINUSE :::8080 發生時，到工作管理員將Node.js: Server-side Javascript的進程關閉掉,就可以正常重新啟動服務器

vue-cli#2.0 webpack 配置分析, https://zhuanlan.zhihu.com/p/24322005
Nginx gzip static静态压缩, http://blog.csdn.net/sadhopedream/article/details/20950519

## 版本记录
    nodev8.0.0
## webpack 命令
     node build/dev-min.js   测试线上环境
     或者 npm devmin
     node 
## npm 打包命令
  打包 bwt npm run build "//sytl3.com"
  
  打包 og npm run build "//sytl3.com"
