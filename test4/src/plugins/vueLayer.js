export default function () {
  var t = '<span class="iconfont">&#xe610;</span>'
  var layer = window.layer
  layer.icon = {}
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
  layer.url = function (content, e) {
    return layer.open({
      className: 'layerConfirm',
      title: '温馨提示',
      content: content,
      btn: ['确定'],
      end: function () {
        typeof e === 'string' ? window.router.replace(e) : window.router.go(e)
      }
    })
  }
  layer.alert = function (content, callback) {
    return layer.open({
      className: 'layerConfirm',
      title: '温馨提示',
      shadeClose: !1,
      content: content,
      btn: ['确定'],
      yes: function (index, layero) {
        if (callback) callback()
        layer.close(index)
      }
    })
  }
  layer.confirm = function (t, callbackA, callbackB) {
    return layer.open({
      className: 'layerConfirm',
      title: '温馨提示',
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
}
