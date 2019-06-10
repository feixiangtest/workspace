let gulp    = require('gulp')
let uglify  = require('gulp-uglify')
const fs    = require("fs-extra");
var path    = require('path')
let concat  = require('gulp-concat')
let babel   = require("gulp-babel")
let vuePack = require('./nodeCode/vueAST')
var gutil   = require('gulp-util');
let jspath  = './resource/share/RESOURCE_VERSION/dist'
const cp    = require('child_process')
// 压缩，合并 js
gulp.task('h5', function () {
  let h5js = [
    './resource/share/RESOURCE_VERSION/js/other/jquery-3.3.1.min.js',
    './resource/share/RESOURCE_VERSION/js/other/jquery.base64.js',
    './resource/share/RESOURCE_VERSION/js/other/_.js',
    './resource/share/RESOURCE_VERSION/js/other/layer.m.js',
    './resource/share/RESOURCE_VERSION/js/h5/myLayer.js',
    './resource/share/RESOURCE_VERSION/js/h5/dateRange.js' // 时间选择 插件
  ]
  return gulp.src(h5js)
             .pipe(concat('_5.js'))
             .pipe(gulp.dest(jspath))
             .pipe(uglify())
             .pipe(gulp.dest(jspath))
})

gulp.task('pc', function () {
  let h5js = [
    './resource/share/RESOURCE_VERSION/js/other/jquery-3.3.1.min.js',
    './resource/share/RESOURCE_VERSION/js/other/jquery.slide.min.js',
    './resource/share/RESOURCE_VERSION/js/other/jquery.base64.js',
    './resource/share/RESOURCE_VERSION/js/other/_.js',
    './resource/share/RESOURCE_VERSION/js/self/utils.js',
    './resource/share/RESOURCE_VERSION/js/other/layer.m.js',

    './resource/share/RESOURCE_VERSION/js/self/request.js',// 单独写的包
    './resource/share/RESOURCE_VERSION/js/self/common.js',
    './resource/share/RESOURCE_VERSION/js/self/requestUrl.js',
    './resource/share/RESOURCE_VERSION/js/self/const.js',
    './resource/share/RESOURCE_VERSION/js/self/login.js',
    './resource/share/RESOURCE_VERSION/js/self/myLayer.js',
    './resource/share/RESOURCE_VERSION/js/self/thirdPartyJump.js'
  ]
  return gulp.src(h5js)
             .pipe(concat('_$.js'))
             .pipe(gulp.dest(jspath))
             .pipe(uglify())
             .pipe(gulp.dest(jspath))
})

gulp.task('vueToJs', function () {
  return gulp.src(['src/share/components/**/*.vue'])
             .pipe(vuePack())
             .pipe(gulp.dest('resource/gulp'))
})

gulp.task('packVue', ['vueToJs'], function () {
  let _v = 'resource/share/RESOURCE_VERSION/dist'
  return gulp.src([
    'resource/gulp/_vHead.js',
    'resource/gulp/balance/balance.js', // 会员登录 刷新余额 resource\gulp\doc\keyBoard.js

    'resource/gulp/modal/regAgree.js', // 协议提示框 全局注册

    'resource/gulp/copy/float.js', //  全局注册
    'resource/gulp/copy/loginNotice.js', // 会员同意协议之后的登录logo 全局注册
    'resource/gulp/copy/bottomCopy.js', // 底部维护公告 全局注册

    'resource/gulp/copy/popUpAd.js', // 站点弹出广告 全局注册， 有依赖关系 导入了 其他vue 组件
    'resource/gulp/copy/commonAlert.js', // 底部维护公告 全局注册 commonAlert 和 popUpAd 有依赖关系不要换位置
    'resource/gulp/copy/firstNotice.js', // 首页第一次登陆的文案 全局注册
    'resource/gulp/copy/mobileAlert.js', // 全局注册
    'resource/gulp/copy/popUpMessage.js', // 有依赖关系 不要换位置 全局注册

    'resource/gulp/doc/checkCodeTg.js', // 登录异常 验证码弹框 在全局注册
    'resource/gulp/doc/keyBoard.js', // 取款密码的键盘 全局注册
    'resource/gulp/doc/complainForm.js', // 投诉建议 全局注册
    'resource/gulp/doc/contactForm.js', // 联络我们 表单组件 全局注册
    'resource/gulp/doc/gameProtocol.js', // 游戏协议组件
    'resource/gulp/doc/historyNews.js', // news 弹窗

    'resource/gulp/doc/popLoginBox.js', // // 登录弹框 有依赖 忘记密码forgetPassword 不要换位置
    'resource/gulp/doc/forgetPassword.js', // 忘记密码
    //   'resource/gulp/bug/vueF5.js'
  ])
             .pipe(concat('_v.js'))
             .pipe(babel())
             .pipe(gulp.dest(_v))
             .pipe(uglify())
             .on('error', function (err) {
               gutil.log(gutil.colors.red('[Error]'), err.toString());
             })
             .pipe(gulp.dest(_v))
})

gulp.task('clean-resource', function () {
  /*  return gulp.src('resource/gulp/!*', {read: false})
   .pipe(clean())*/
});

gulp.task('default', ['h5', 'pc', 'packVue'], function () {
  setTimeout(() => {
    cp.exec('npm run clean', {})
  }, 300)
})
