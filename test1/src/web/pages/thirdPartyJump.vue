<template>
  <div id="thirdparty">

  </div>
</template>
<script>
export default {
  mounted () {
    this.$nextTick(function () {
      let param = this.$route.query
      param['loading'] = 'pass'
      this.$store.dispatch('third.action', param).then(res => {
        console.info('res:', res)
        if (res.status === '2') { // 跳转到微信完善资料
          window.layer.msgWarn('为了您的资金安全，请您完善资料信息！！', function () {
            window.router.push('/wap/memberCenter/completeAccount')
          })
        }
        let reg = new RegExp('^http')
        let reg2 = new RegExp('^https')

        // 自动额度转换 排除沙巴、彩票、体育、OG
        if (param.key !== 'og' && param.key !== 'ibc' && param.key !== 'ty' && param.key !== 'cp') {
          this.autoTransferMoney(param.key)
        }

        if ((param.key === 'cp' || param.key === 'ty') && res.data && res.data.isHttps) {
          window.location.href = 'https://' + res.data.tourl
          return
        }
        if (param.key === 'bb' ||
            param.key === 'ag' || param.key === 'og' || param.key === 'mg' ||
            param.key === 'opus' || param.key === 'ibc' || param.key === 'dios' || param.key === 'pt') {
          var fo = res.data.tourl
          fo = fo.substr(fo.indexOf('<form'))
          fo = fo.substring(0, fo.indexOf('</body>'))
          window.$('#thirdparty').append(fo)
          window.$('form').submit()
        } else if (param.key !== 'cp') {
          // 新增需求屏蔽登录提示窗口
          // window.layer.msgWarn(res.msg, function () {
          if (reg.test(res.data.tourl) || reg2.test(res.data.tourl)) {
            window.location.href = res.data.tourl
          } else {
            window.location.href = '//' + res.data.tourl
          }
          // })
        } else {
          if (reg.test(res.data.tourl) || reg2.test(res.data.tourl)) {
            window.location.href = res.data.tourl
          } else {
            window.location.href = '//' + res.data.tourl
          }
        }
      })
    })
  },
  methods: {
    /**
     * 自动额度转换
     */
    autoTransferMoney (gameKey) {
      window.$.ajax({
        'type': 'post',
        'url': '/api/wap/moneyConversion/autoTransferMoney?t=' + new Date().getTime(),
        'dataType': 'json',
        'async': false,
        'contentType': 'application/json',
        'data': JSON.stringify({
          key: gameKey
        }),
        'success': function (_res) {
          if (Number(_res.status) === 0) {
            window.layer.msgWarn(_res.msg)
          }
        }
      })
    }
  }
}
</script>

