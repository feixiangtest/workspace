<template>
    <div class="changePassword" @keyup.enter='changeMoneyPwd'>
        <form>
            <div class="formItem" >
                <span class="formTile">旧密码：</span>
                <div class="formInline">
                    <!-- 内容为空或输入错误的input框颜色 -->
                    <el-input v-model.number="oldPwd" placeholder="请输入旧密码" size="medium" type="password"
                        @keyup.native='toNumber("oldPwd")' maxlength="4" @focus='openKeyBoard("showDrawOldKey")' @click.native.stop='openKeyBoard("showDrawOldKey")' readonly></el-input>
                    <span><i  :class='oldPwdClass'></i></span>
                    <key-board :inputData='oldValue' :keyNum='setOldCode' :clickNum='setDrawOldPwd' v-if='showDrawOldKey' :clear="clearOldDrawPwd"></key-board>
                </div>
            </div>
            <div class="formItem">
                <span class="formTile">新密码：</span>
                <div class="formInline">
                    <el-input v-model="newPwd" placeholder="请输入新密码" size="medium" type="password"
                        @keyup.native='toNumber("newPwd")' maxlength="4" @focus='openKeyBoard("showDrawNewKey")' @click.native.stop='openKeyBoard("showDrawNewKey")' readonly></el-input>
                    <span><i :class="newPwdClass"></i></span>
                    <key-board :inputData='newValue' :keyNum='setNewCode' :clickNum='setDrawNewPwd' v-if='showDrawNewKey' :clear="clearNewDrawPwd"></key-board>
                </div>
            </div>
            <div class="formItem" >
                <span class="formTile">确认密码：</span>
                <div class="formInline">
                    <el-input v-model="confirmPwd" placeholder="请输入确认密码" size="medium" type="password"
                        @keyup.native='toNumber("confirmPwd")'
                        maxlength="4" @focus='openKeyBoard("showDrawConfirmKey")' @click.native.stop='openKeyBoard("showDrawConfirmKey") ' readonly>
                    </el-input>
                    <span><i :class="confirmPwdClass"></i></span>
                    <key-board :inputData='confirmValue' :keyNum='setConfirmCode' :clickNum='setDrawConfirmPwd' v-if='showDrawConfirmKey' :clear="clearConfirmDrawPwd"></key-board>
                </div>
            </div>
            <div class="formItem">
                <span class="formTile"></span>
                <div class="formInline">
                    <el-button type="primary" @click.stop='changeMoneyPwd' :disabled="disableBtn">确认</el-button>
                </div>
            </div>
            <div class="formItem">
                <span class="formTile"></span>
                <div class="formInline">
                    <p class="errMsg">取款时要用到的密码，<span class="orange">非常重要，请务必牢记！</span></p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {
      mapActions
    } from 'vuex'
    import * as types from '@s/store/shareApi/type.js'
    import keyBoard from '@s/components/doc/keyBoard.vue'
    // 设定正确，与错误样式变量
    const CORRECTSTYLE = ['yo-correctFull', 'el-icon-correctFull']
    const ERRORSTYLE = ['yo-plaintFull', 'el-icon-plaintFull']
    export default {
      data () {
        return {
          // 下面三个是是否展示软键盘
          showDrawOldKey: false,
          showDrawNewKey: false,
          showDrawConfirmKey: false,
          // 下面三个分别是旧密码，新密码，确认密码
          oldPwd: '',
          newPwd: '',
          confirmPwd: '',
          // 下面三个分别是旧，新，确认密码类名
          oldPwdClass: [],
          newPwdClass: [],
          confirmPwdClass: [],
          // 下面三个是向软键盘传的值
          oldValue: '',
          newValue: '',
          confirmValue: '',
          disableBtn: true, // 确认按钮禁用状态
          isSuccess: false
        }
      },
      watch: {
        // 监听输入的密码数据，如果格式正确，就设置输入框后面的样式为correctStyle，反之errorStyle
        oldPwd (v) {
          this.setStyle(v.length === 4, 'oldPwdClass')
          this.openDisableBtn()
        },
        newPwd (v) {
          this.setStyle(v.length === 4, 'newPwdClass')
          if (this.confirmPwd) this.setStyle(v === this.confirmPwd && v.length === 4, 'confirmPwdClass')
          this.openDisableBtn()
        },
        confirmPwd (v) {
          this.setStyle(v === this.newPwd && v.length === 4, 'confirmPwdClass')
          this.openDisableBtn()
        }
      },
      components: {
        keyBoard // 键盘组件
      },
      mounted () {
        // this.setAccountByUrl()
        document.onclick = () => { // 点击空白区域隐藏键盘
          this.showDrawOldKey = false
          this.showDrawNewKey = false
          this.showDrawConfirmKey = false
        }
      },
      methods: {
        ...mapActions({
          changeDrawPwdAction: types.CHANGEDRAWPWD// 修改密码接口
        }),

        // 清空所有数据
        clearInfo () {
          this.oldPwd = ''
          this.newPwd = ''
          this.confirmPwd = ''
          this.oldPwdClass = ''
          this.newPwdClass = ''
          this.confirmPwdClass = ''
        },
        // 判断输入框是否为空，如为空则确认按钮置灰
        openDisableBtn () {
          if (this.oldPwd.length !== 0 && this.newPwd.length !== 0 && this.confirmPwd.length !== 0) {
            this.disableBtn = false
          } else {
            this.disableBtn = true
          }
        },
        // 打开相对应的键盘
        openKeyBoard (v) {
          this.showDrawOldKey = false
          this.showDrawNewKey = false
          this.showDrawConfirmKey = false
          this.oldValue = ''
          this.newValue = ''
          this.confirmValue = ''
          this[v] = true
        },
        // 通过电脑键盘输入旧密码
        setOldCode (ev) {
          if (isNaN(ev.key)) return
          this.setDrawOldPwd(ev.key)
        },
        // 通过软键盘设置旧密码
        setDrawOldPwd (n) {
          this.oldValue += n.toString()
          if (this.oldValue.length > 3) {
            this.oldPwd = this.oldValue
            this.showDrawOldKey = false
          }
        },
        // 重置清空旧密码
        clearOldDrawPwd (v) {
          this.oldPwd = ''
          this.oldValue = ''
        },
        // 通过电脑键盘输入新密码
        setNewCode (ev) {
          if (isNaN(ev.key)) return
          this.setDrawNewPwd(ev.key)
        },
        // 通过键盘设置新密码
        setDrawNewPwd (n) {
          this.newValue += n.toString()
          if (this.newValue.length > 3) {
            this.newPwd = this.newValue
            this.showDrawNewKey = false
          }
        },
        // 重置清空新密码
        clearNewDrawPwd (v) {
          this.newPwd = ''
          this.newValue = ''
        },
        // 通过电脑键盘输入旧密码
        setConfirmCode (ev) {
          if (isNaN(ev.key)) return
          this.setDrawConfirmPwd(ev.key)
        },
        // 通过键盘设置确认密码
        setDrawConfirmPwd (n) {
          this.confirmValue += n.toString()
          if (this.confirmValue.length > 3) {
            this.confirmPwd = this.confirmValue
            this.showDrawConfirmKey = false
          }
        },
        // 重置清空密码
        clearConfirmDrawPwd (v) {
          this.confirmPwd = ''
          this.confirmValue = ''
        },
        // 设定只能输入数字，并且不超过4位
        toNumber (v) {
          this[v] = this[v].toString().replace(/[^\d]+/g, '').slice(0, 4)
        },
        // 设定正确与错误的样式
        setStyle (isTrue, k) {
          if (this.isSuccess) return
          isTrue ? this[k] = CORRECTSTYLE : this[k] = ERRORSTYLE
          if (isTrue) {
            this.openKeyBoard()
          }
        },
        // 校验密码是否格式正确
        checkPwd (v, t) {
          if (!v) {
            window.layer.msgWarn(t + '密码不能为空')
            return false
          }
          if (v.length < 4) {
            window.layer.msgWarn(t + '密码长度不能少于4个字元')
            return false
          }
          return true
        },
        // 校验新旧确认密码是否相同
        checkAllPwd () {
          if (this.oldPwd === this.newPwd) {
            window.layer.msgWarn('新密码不能和旧密码一致，请重新设置')
            return false
          }
          if (this.confirmPwd !== this.newPwd) {
            window.layer.msgWarn('确认密码和新密码不一致，请重新设置')
            return false
          }
          return true
        },
        // ---确认修改密码
        changeMoneyPwd () {
          // enter 按钮 按下 执行
          // 如果是 禁止的 不执行
          if (this.disableBtn) {
            return ''
          }
          if (!this.checkPwd(this.oldPwd, '旧')) return
          if (!this.checkPwd(this.newPwd, '新')) return
          if (!this.checkPwd(this.confirmPwd, '确认')) return
          if (!this.checkAllPwd()) return
          // 提交请求
          this.disableBtn = true // 请求期间禁用确认按钮
          if (window.common.isFree()) {
            window.layer.msgWarn('对不起，取款密码设置不对试玩账号开放！')
            return ''
          }
          this.changeDrawPwdAction({
            confirmPassword: this.confirmPwd,
            newPassword: this.newPwd,
            oldPassword: this.oldPwd
          }).then(res => {
            this.disableBtn = false
            this.isSuccess = true
            this.clearInfo()
            window.layer.msgWarn('修改成功', () => {
              this.isSuccess = false
            })
          }).catch(rej => {
            this.disableBtn = false
            this.oldPwdClass = ERRORSTYLE
          })
        }
      }
    }
</script>
