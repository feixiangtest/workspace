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
      title: '<p><i class="yo-icon icon-bulb"></i>温馨提示</p>',
      content: content,
      btn: ['确定'],
      end: function () {
        typeof e === 'string' ? window.router.replace(e) : window.router.go(e)
      }
    })
  }
  layer.popup = function (obj, e) {
    return layer.open({
      shadeClose: !1,
      className: 'layerConfirm',
      title: obj.title ? '<p><i class="yo-icon icon-bulb"></i>' + obj.title + '</p>' : '<p><i class="yo-icon icon-bulb"></i>温馨提示</p>',
      content: '<div class="yo-tancen"><p>' + obj.content + '</p></div>',
      btn: ['确定']
    })
  }
  layer.alert = function (content, callback) {
    window.$('input, textarea').blur()
    return layer.open({
      className: 'layerConfirm',
      title: '<p><i class="yo-icon icon-bulb"></i>温馨提示</p>',
      shadeClose: !1,
      content: '<div class="yo-tancen"><p>' + content + '</p></div>',
      btn: ['我知道了'],
      yes: function (index, layero) {
        try { callback() } catch (e) { }
        layer.close(index)
      }
    })
  }
  layer.confirm = function (params, callbackA, callbackB) {
    var type = typeof params
    var obj
    switch (type) {
      case 'object':
        obj = params
        break
      default:
        obj = {
          content: params
        }
    }
    return layer.open({
      className: obj.className || 'layerConfirm layerConfirm2',
      title: obj.title || '<p><i class="yo-icon icon-bulb"></i>温馨提示</p>',
      shadeClose: obj.shadeClose || !1,
      content: obj.content || '',
      btn: obj.btn || ['确定', '取消'],
      yes: function (index) {
        try { callbackA() } catch (e) { }
        layer.close(index)
      },
      no: function (index) {
        try { callbackB() } catch (e) { }
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
