# OT前端项目
    基于webpack + vue
    使用webpack管理多个不同的项目
    包含五大模块：
        1 pc站点（ot001,ot002....）
        2 pc站点 会员中心（core）
        3 pc站点 帮助中心、维护页面（alone）
        4 手机端（h5）
        5 公共文件（share）            
    每个项目中都有个 pages 文件夹，用来存放项目入口文件
    webpack 基于每个项目都有独自的config 文件来启动项目
    
# 新环境安装说明：
* Node.js，https://nodejs.org/en/download/
* Visual studio Code, https://code.visualstudio.com/?wt.mc_id=DX_841432

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

# nginx说明
配置文件模板 nginx.conf.default
1.devtool/nginx-1.12.0/conf内的nginx.conf.default重命名为nginx.conf
2.查看内的注释说明

# 启动项目的一些准备工作：
# 使用vscode启动项目后使用终端按步骤执行以下命令
# 1.下载Yarn,Yarn是Facebook最近发布的一款依赖包安装工具。Yarn是一个新的快速安全可信赖的可以替代NPM的依赖管理工具
    npm install -g yarn
    安装过 yarn 跳过 安装
# 2.下载Gulp,本项目依靠gulp帮忙将公共的vue文件统一打包，share内为公共的vue资源 
    npm install -g gulp
    安装过 gulp 跳过 安装
# 3.下载项目依赖的插件
    yarn
# 4.启动项目devtool文件夹内的nginx工具，访问项目必须通过nginx转发才可正常运行
    启动nginx
# 5.启动站点项目（注：如果是启动手机端则将ot001修改为h5即可，nginx也需要对应调整，具体可看nginx.config.default）
    npm run web ot001
# 6.启动会员中心和帮助中心（PC会员端才需要执行此命令，h5不需要启动会员中心和帮助中心）
    npm run member

# 前端文档
    https://lq782655835.github.io/blogs/team-standard/0.standard-ai-summary.html

# 项目详细文档
    1 查看 OtWebSite\项目备注\
    2 构建命令 查看 OtWebSite\项目备注\脚本\1. 脚本命令.md

