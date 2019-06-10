export function vueErr (vue) { // 处理时间格式
  return vue.config.errorHandler = function (err, vm, info) {
    // handle error
    // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    window.insertLogs({
      'err': err.message,
      'stack': err.stack,
      'info': info
    }, 'vueErrorHandler')
  }
}
