<template>
    <div id="completeAccount" class="yo-page-body">
    <div class="header yo-home-nav">
      <div class="center">
        <div class="hea-menu hea-left">
          <a href="javascript:;" @click="Goback()"><i class="yo-icon icon-arrows-left"></i></a>
        </div>
        <div class="header-text titile">
          <h1>绑定银行卡</h1>
        </div>
      </div>
    </div>
    <div class="accountMain centerBox">
      <dl style="padding-bottom: 10px;">
        <div class="formIput">
          <span class="itemTxt">选择银行</span>
          <span class="paybankName lightGray"  @click="optclick()" >{{optValue}}</span>
          <span class="radio_span yo-arrri"><i class="yo-icon icon-arrows-right"></i></span>
        </div>
        <optCom :optDate="optMsg"  v-on:listenToChildEvent="showMsgOptcom"></optCom>
      </dl>
       <dl>
        <div class="formIput">
          <span class="itemTxt">真实姓名</span>
          <div class="specialbox">
            <input type="text" name="" readonly class="typeinput input-one" v-model="realName">
          </div>
        </div>
      </dl>
      <dl>
        <div class="formIput">
          <span class="itemTxt">卡号</span>
          <div class="specialbox">
            <input type="text" name="" placeholder="请输入银行卡号" class="typeinput input-one"
                  maxlength="20" @blur="check_bankAccount()" v-model="bindInfo.bankAccount"
            >
          </div>
          <!--<AddErr :regDate="errMsg" message="bankAccount"/>-->
        </div>
          <span class="depTips red" v-if="this.errMsg.bankAccount && this.errMsg.bankAccount.status">{{this.errMsg.bankAccount.txt}}</span>
      </dl>
      <dl>
        <div class="formIput">
          <span class="itemTxt">开户行省</span>
          <div class="specialbox">
            <input type="text" name="" placeholder="请输入开户行省" class="typeinput input-one"
                  maxlength="16" @blur="check_province()" v-model="bindInfo.prov"
            >
          </div>
          <!--<AddErr :regDate="errMsg" message="prov"/>-->
        </div>
        <span class="depTips red" v-if="this.errMsg.prov && this.errMsg.prov.status">{{this.errMsg.prov.txt}}</span>
      </dl>
      <dl>
        <div class="formIput">
          <span class="itemTxt">开户行市</span>
          <div class="specialbox">
            <input type="text" name="" placeholder="请输入开户行市" class="typeinput input-one"
                  maxlength="16" @blur="check_city()" v-model="bindInfo.city"
            >
          </div>

          <!--<AddErr :regDate="errMsg" message="city"/>-->
        </div>
        <span class="depTips red" v-if="this.errMsg.city && this.errMsg.city.status">{{this.errMsg.city.txt}}</span>
      </dl>
      <div class="yo-pad10 yo-pad-bot20">
        <button type="button" class="yo-anOne button " id="bankSetBtn" @click="submint()">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
import bindmethod from '@/base/utils/bindmethod'
export default {
  data () {
    return {
      realName: '',
      optValue: '请选择银行卡',
      optMsg: {   // 下拉组件需要传递的值
        opt_title: '选择银行卡类别',
        optsType: false,  // 点击组件改变状态值  展示或 关闭组件
        Diferent: true,
        DataList: []  // 需要展示的数据集
      },
      // 绑定信息
      bindInfo: {
        bankId: '',
        bankAccount: '',
        prov: '',
        city: ''
      },
      errMsg: {    // 输入框上的弹出ui传递的数据
        account: {},
        errName: 'complete'
      },
      switch: true, // 页面按钮开关,为了防止多次提交请求
      // 银行数据
      bankList: []
    }
  },
  methods: {
    // 返回上一页
    Goback () {
      this.$router.go(-1)
    },
    // 接收opt组件回调
    showMsgOptcom (data, index) {
      this.optValue = data
      this.optMsg.optsType = false
      this.bindInfo.bankId = this.bankList[index].id
    },
    optclick () {
      this.optMsg.optsType = true
    },
    // submint 提交
    submint () {
      // var $this = this
      var {msgWarn} = bindmethod
      var bindInfo = this.bindInfo
      if (!bindInfo.bankId) {
        msgWarn('请您选择银行!')
        return false
      }
      if (!bindInfo.bankAccount || !/[0-9]{10,}$/.test(bindInfo.bankAccount)) {
        msgWarn('请您填写正确银行账号！')
        return false
      }
      if (!bindInfo.prov || !/^[\u4e00-\u9fa5]{1,}$/.test(bindInfo.prov)) {
        msgWarn('请您填写正确省份！')
        return false
      }
      if (!bindInfo.city || !/^[\u4e00-\u9fa5]{1,}$/.test(bindInfo.city)) {
        msgWarn('请您填写正确城市！')
        return false
      }
      let submint = document.getElementById('bankSetBtn')
      submint.innerHTML = '确认中...'
      if (this.switch) {
        this.switch = false
        // 保存银行卡信息
        this.$store.dispatch('saveMemberinfo', this.bindInfo).then(res => {
          if (res.status === '1') {
            msgWarn('银行卡绑定成功!', () => {
              window.router.push('/wap/memberCenter/index')
            })
          } else if (res.msg) {
            msgWarn('失败：' + res.msg)
          }
          this.switch = true
          submint.innerHTML = '确认'
        })
      }
    },
    // 验证卡号
    check_bankAccount () {
      var bankAccount = this.bindInfo.bankAccount
      if (bankAccount === '') {
        if (!/[0-9]{10,}$/.test(bankAccount)) {
          this.$set(this.errMsg, 'bankAccount', {
            status: true,
            txt: '银行账号格式不正确！'
          })
          return false
        }
      }
      let [_errArr, _key, _state] = [['银行账号格式不正确！', '银行账号不能为空！'], 'bankAccount', () => {
        if (bankAccount || bankAccount == null) {
          if (!/[0-9]{10,}$/.test(bankAccount)) {
            this.$set(this.errMsg, 'bankAccount', {
              status: true,
              txt: _errArr[0]
            })
            return false
          }
        } else {
          this.$set(this.errMsg, 'bankAccount', {
            status: true,
            txt: _errArr[1]
          })
          return false
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'bindInfo')
    },
    // 验证省
    check_province () {
      var prov = this.bindInfo.prov
      if (prov === '') {
        if (!/[0-9]{10,}$/.test(prov)) {
          this.$set(this.errMsg, 'prov', {
            status: true,
            txt: '省份格式不正确！'
          })
          return false
        }
      }
      let [_errArr, _key, _state] = [['省份格式不正确！', '省份不能为空!'], 'prov', () => {
        if (prov || prov == null) {
          if (!/^[\u4e00-\u9fa5]{1,}$/.test(prov)) {
            this.$set(this.errMsg, 'prov', {
              status: true,
              txt: _errArr[0]
            })
            return false
          }
        } else {
          this.$set(this.errMsg, 'prov', {
            status: true,
            txt: _errArr[1]
          })
          return false
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'bindInfo')
    },
    // 验证市
    check_city () {
      var city = this.bindInfo.city
      if (city === '') {
        if (!/[0-9]{10,}$/.test(city)) {
          this.$set(this.errMsg, 'city', {
            status: true,
            txt: '城市格式不正确！'
          })
          return false
        }
      }
      let [_errArr, _key, _state] = [['城市格式不正确！', '城市不能为空'], 'city', () => {
        if (city || city == null) {
          if (!/^[\u4e00-\u9fa5]{1,}$/.test(city)) {
            this.$set(this.errMsg, 'city', {
              status: true,
              txt: _errArr[0]
            })
            return false
          }
        } else {
          this.$set(this.errMsg, 'city', {
            status: true,
            txt: _errArr[1]
          })
          return false
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'bindInfo')
    },
    // 请求
    httpRequest (options) {
      let HttpRequest = bindmethod.HttpRequest
      return HttpRequest(options)
    }
  },
  mounted () {
    var $this = this
    var {VerifyInof} = bindmethod
    this.checkCommon = VerifyInof().checkCommon
    // 请求 获取银行列表
    this.$store.dispatch('getBankList', {}).then(res => {
      if (res.status === '1') {
        $this.bankList = res.list
        $this.realName = res.data || '未设置'
        window._each($this.bankList, (value, key, list) => {
          this.optMsg.DataList.push(value.bankname)
        })
      }
    })
  }
}
</script>

<style>
</style>
