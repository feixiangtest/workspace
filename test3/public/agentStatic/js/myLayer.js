(function () {
  var t = '<span class="iconfont">&#xe610;</span>'
  var layer = window.layer
  layer.icon = {}
  layer._status = {}
  layer.load = function () {
    layer.open({
      type: 2
    })
  }
  layer.msg = function (t, e) {
    return this.open({
      content: t,
      time: e ? e - 1 : 3,
      style: 'fill:#ececec',
      className: 'msg'
    })
  }
  layer.msgWarn = function (content, callback) {
    if (!content) return
    return this.alert(content, callback)
  }
  layer.msgTip = function (e, a) {
    return this.msg(t + e, a)
  }
  layer.msgWait = function (t, e) {
    layer.wait = layer.open({
      type: 2,
      shadeClose: 0,
      className: 'msgWait'
    })
    return layer.wait
  }
  layer.url = function (content, callbackA) {
    return layer.open({
      className: 'layerConfirm legendCode',
      title: '安全码',
      content: content,
      btn: ['确定'],
      yes: function (index) {
        if (callbackA) callbackA()
        layer.close(index)
      }
      // end: function () {
      //   typeof e === 'string' ? window.router.replace(e) : window.router.go(e)
      // }
    })
  }
  layer.alert = function (content, callback, title = '', className = '') {
    document.onkeydown = function (event) {
      var e = event || window.event
      if (e && (e.keyCode === 32 || e.keyCode === 27)) { // 空格 esc 键
        if (!document.getElementById('layerMOkBtn')) return
        document.getElementById('layerMOkBtn').onclick()
        return false
      }
    }
    if (layer._status.open) return ''
    layer._status.open = true
    document.documentElement.style.overflow = 'hidden'
    return layer.open({
      className: 'layerConfirm ' + className,
      title:  title ? title : '<i class="yo-icon icon-warm"></i>&nbsp;温馨提示',
      shadeClose: !1,
      content: content,
      btn: ['确定'],
      yes: function (index, layero) {
        if (callback) callback()
        layer.close(index)
        layer._status.open = false
        document.documentElement.style.overflow = ''
      }
    })
  }
  layer.confirm = function (t, callbackA, callbackB) {
    return layer.open({
      className: 'layerConfirm yolayerBut',
      title: '<i class="yo-icon icon-warm"></i>&nbsp;温馨提示',
      shadeClose: !1,
      content: t,
      btn: ['确定', '取消'],
      yes: function (index) {
        if (callbackA) callbackA()
        layer.close(index)
      },
      no: function (index) {
        if (callbackB) callbackB()
        layer.close(index)
      }
    })
  }
  layer.closeAll = function () {
    for (var t = document.getElementsByClassName('layermbox'), e = 0; e < t.length; e++) {
      var a = t[e].getAttribute('index')
      a && layer.close(a)
    }
  }
  window.layer = layer
}())
