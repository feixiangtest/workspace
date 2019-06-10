/**
 * * 依赖影响： pc  h5
 * 注意：非公用不要加，谨慎添加修改
 */
;(window.common = (function () {
  Date.prototype.format = function (fmt) {
    var o = {
      'M+': this.getMonth() + 1, // 月份
      'd+': this.getDate(), // 日
      'h+': this.getHours(), // 小时
      'm+': this.getMinutes(), // 分
      's+': this.getSeconds(), // 秒
      'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
      'S': this.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
  var a = {
    CONST: {},
    loginStatus: '', // 共享登录状态，1为已登录，其它为未登录
    userType: '', // 共享会员类型，
    cookieDays: 'd1', // 设置cookie到期时间
    attr: 10,
    // ajax请求返回的状态码
    statusConst: {
      'SUCCESS': '0', // 数据返回成功
      'FAILURE': '1', // 返回失败
      'VERSION': '9', // 版本号一致
      'ISLOGIN': '5', // 未登录或者IP不一致
      'COMPLETEACCOUNT': '2' // 微信帐号完善资料状态，当返回这个值时必须完善资料后才可跳转其他
    },
    isFree: function () { // 处理时间格式
      if (window.store.state.user.userInfo && window.store.state.user.userInfo.account && window.store.state.user.userInfo.account.indexOf('TEST') >= 0) {
        return true
      }
      return null
    },
    // 获取url参数部分
    getUrlPara: function () {
      var url = document.location.toString()
      var arrUrl = url.split('?')
      var para = arrUrl[1]
      return para
    },
    /** 设置Cookie time=过期时间
     *name cookie名称
     *value cookie值
     *time 第一个字母s,h,d分别表示秒，小时，
     *如 s20 代表20秒，
     *如 h12 代表12小时，
     *如 d25 代表25天，
     */
    setCookie: function (name, value, time) {
      // 如果不传time，那就就为临时cookie
      if (!time) {
        document.cookie = name + '=' + escape(value) + ';path=/'
        return
      }
      var strsec = this.getsec(time)
      var exp = new Date()
      exp.setTime(exp.getTime() + strsec * 1)
      var path = '/'
      document.cookie = name + '=' + escape(value) + ';path=' + path + ';expires=' + exp.toGMTString()
    },
    getsec: function (str) {
      var str1 = str.substring(1, str.length) * 1
      var str2 = str.substring(0, 1)
      if (str2 === 's') {
        return str1 * 1000
      } else if (str2 === 'h') {
        return str1 * 60 * 60 * 1000
      } else if (str2 === 'd') {
        return str1 * 24 * 60 * 60 * 1000
      }
    },
    // 删除cookie
    delCookie: function (name) {
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var cval = this.getCookie(name)
      var path = '/'
      if (cval != null) {
        document.cookie = name + '=' + cval + ';path=' + path + ';expires=' + exp.toGMTString()
      }
    },
    // 读取Cookie
    getCookie: function (cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1)
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
      }
      return ''
    },
    // 获取当前时间格式 YYYY-MM-DD
    getNowDate: function () {
      return new Date().toJSON().substr(0, 10)
    },
    // 获取区间日期，第一个参数为月份的第一天，还是最后一天（firstDay,lastDay)，第二个参数是传入的月份为当前月份所要减去的数字,传0就是当月，传-1就是上月
    getAreaDate: function (v, m) {
      var timezone = 4 // 目标时区时间，美东时区
      var offsetGMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
      var nowDate = new Date().getTime() // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
      var now = new Date(nowDate + offsetGMT * 60 * 1000 - timezone * 60 * 60 * 1000)// 设置为美东时间
      var oneDay = 1000 * 60 * 60 * 24
      console.log(now, 'now')
      if (v === 'firstDay') {
        var monthFirstDay = new Date(now.getFullYear(), now.getMonth() + m, 1)
        return monthFirstDay.format('yyyy-MM-dd')
      } else if (v === 'lastDay') {
        if (m === 0) {
          return now.format('yyyy-MM-dd')
        } else {
          var nextMonthFirstDay = new Date(now.getFullYear(), now.getMonth() + 1 + m, 1)
          return new Date(nextMonthFirstDay - oneDay).format('yyyy-MM-dd')
        }
      }
    },
    // 获取往后推几天的时间格式 YYYY-MM-DD
    getBeforeDate: function (val) {
      var nowTime = new Date()
      var nowDate = nowTime.getDate()
      var countDate = nowDate - Number(val)
      nowTime.setDate(countDate)
      return new Date(nowTime).toJSON().substr(0, 10)
    },
    /**
     *关闭当前窗口
     */
    closeLtWindow: function () {
      /* --------------- 关闭当前窗口（需做根据不同浏览器使用不同的关闭方法） start --------------------------------------------- */
      if (navigator.userAgent.indexOf('MSIE') > 0) { // IE
        if (navigator.userAgent.indexOf('MSIE 6.0') > 0) { // IE6
          window.opener = null
          window.close()
        } else { // IE6+
          window.open('', '_top')
          window.top.close()
        }
      } else if (navigator.userAgent.indexOf('Firefox') > 0 || navigator.userAgent.indexOf('Presto') > 0) { // FF和Opera
        // window.location.href = 'about:blank'
        window.close()// 火狐默认状态非window.open的页面window.close是无效的
      } else {
        window.opener = null
        window.open('', '_self', '')
        window.close()
      }
      /* --------------- 关闭当前窗口（需做根据不同浏览器使用不同的关闭方法） end --------------------------------------------- */
    },
    /**
     * 忘记密码调用此方法
     */
    forgetPWD: function () {
      // window.open('/alone/forgetPassword', '_blank', 'toolbar=yes, width=390, height=664')
      window.store.state.shareApi.showForget = true
    },
    // 保存底部文案表单内容
    saveContact: function (params) {
      window.$.http('/member/sysAboutMe/saveContact', params, {
        type: 'POST'
      }).then(function (_res) {
        if (_res.status === window.common.statusConst.SUCCESS) {
          window.layer.msgWarn('送出成功！')
        } else {
          window.layer.msgWarn(_res.msg)
        }
      }).catch(function (err) {
        window.layer.msgWarn(err.msg)
      })
    },
    /*
     * 浮动图逻辑处理统一用此方法处理
     */
    floatJump: function (item, key, $this) {
      console.log(item, 'item')
      // 如果是外部链接， 选择外部链接时，由于没有选择打开方式，hrefTargetSim 可能为空。
      if (item.junctionSim.indexOf('http') >= 0) {
        // 如果是弹框
        if (item.hrefTargetSim === 'open') {
          // 弹框参数
          var _params = {
            height: item.gbkHeight,
            width: item.gbkWidth,
            top: 0,
            left: 0,
            toolbar: 'no',
            menubar: 'no',
            scrollbars: 'no',
            resizable: 'no',
            location: 'no',
            status: 'no'
          }
          window.open(item.junctionSim, item.titleSim, _params)
        } else {
          // 如果不是弹框
          window.open(item.junctionSim, item.hrefTargetSim)
        }
      } else { // 如果是内部链接
        var isLogin = window.store.state.user.isLogin
        // var isShowReg = window.store.state.shareApi.isShowReg
        // 和后台对应关系
        console.log(item.junctionSim, 'item.junctionSim')
        switch (item.junctionSim) {
          case '0':// 在线存款
            // 如果未登录了进行弹窗处理
            if (!isLogin) {
              // 直接调用跳转方法
              $this.$jumpLive('ag')
              return
            }
            window.open('/center/bankTransaction/onlinePayment')
            break
          case '1':// 跳转AG平台
            $this.$jumpLive('ag')
            break
          case '2':// 跳转OG平台
            $this.$jumpLive('og')
            break
          case '3':// 跳转欧博平台
            $this.$jumpLive('ab')
            break
          case '4':// 跳转BBIN平台
            $this.$jumpLive('bb')
            break
          case '5':// 跳转优惠活动
            window.router.push('/promotion')
            break
          case '6':// 跳转在线客服
            $this.$openChatWin()
            break
          case '7':// 跳转帮助中心
            window.open('/alone/help/home')
            break
          case '8':// 跳转会员中心
            // 如果未登录了进行弹窗处理
            if (!isLogin) {
            // 直接调用跳转方法
              $this.$jumpLive('ag')
              return
            }
            window.open('/center/myAccount/baseConsole')
            break
          case '9':// 关闭当前浮动图
            if (key === 'DLJFDT_ZC') {
              window.$('#leftBox').css('display', 'none')
            } else {
              window.$('#rightBox').css('display', 'none')
            }
            break
          case '10':// 免费试玩
            // 如果已经登录了直接跳出
            if (isLogin) {
              return
            }
            $this.$freeLogin()
            break
          case '11':// 立即注册
            // 如果已经登录了直接跳出
            if (isLogin) {
              return
            }
            // 请求是否开启注册功能
            window.store.dispatch('user.register', {}).then(function (res) {
              if (res.data.regStatus) {
                window.layer.msgWarn('本平台暂未开放注册功能，请联系客服')
              } else {
                window.router.push('/register')
              }
            })
            break
          case '12':// 视讯页面
            window.router.push('/live')
            break
          case '13':// 跳转BG平台
            $this.$jumpLive('bg')
            break
          default:
            if (item.junctionSim.indexOf('SX_') > -1) {
              $this.$jumpLive(item.junctionSim.split('SX_')[1].toLowerCase())
            }
            console.log('跳转链接是', item.junctionSim, item.junctionSim.split('SX_')[1].toLowerCase())
        }
      }
    }
  }

  /**
   * url参数转换成json格式
   */
  function urlToJson () {
    var search = location.search.length > 0 ? location.search.substring(1) : ''
    if (!search) return {}
    var args = {}
    var items = search.split('&')
    var item = null
    for (var i = 0; i < items.length; i++) {
      item = items[i].split('=')
      args[item[0]] = item[1]
    }
    return args
  }

  /**
   *  介绍人 逻辑 设置
   */
  function getIntr (obj) {
    if (obj.Intr && obj.Intr !== 'undefined') {
      // sessionStorage.Intr = obj.Intr
      a.setCookie('IntrForParam', obj.Intr, 'd30')
      a.setCookie('Intr', obj.Intr, 'd30')
      // push 到 注册页面
      if (location.href.indexOf('register') > 0) {
        return ''
      }
      location.href = '//' + location.host + '/register'
    }
  }

  var obj = urlToJson()
  getIntr(obj)

  return a
}()))
