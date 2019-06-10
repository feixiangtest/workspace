<template>
    <div>
        <div class='keyboard' v-show="isShow" @click.stop='_handleKeyPress' >
            <div class="pkey">
                <div><i data-num='7'>7</i></div>
                <div><i data-num='8'>8</i></div>
                <div><i data-num='9'>9</i></div>
            </div>
            <div class="pkey">
                <div><i data-num='4'>4</i></div>
                <div><i data-num='5'>5</i></div>
                <div><i data-num='6'>6</i></div>
            </div>
            <div class="pkey">
                <div><i data-num='1'>1</i></div>
                <div><i data-num='2'>2</i></div>
                <div><i data-num='3'>3</i></div>
            </div>
            <div class="pkey">
                <div><i class='key-confirm' data-num='S'>完成</i></div>
                <div><i data-num='0'>0</i></div>
                <div><i class="yo-icon icon-cancel key-delete" data-num='D'></i></div>
            </div>
        </div>
            
    </div>
</template>

<script>
export default {
  props: {
    isShow: Boolean // 是否显示键盘变量
  },
  data () {
    return {
      password: '' // 键盘点击取到的值
    }
  },
  mounted () {
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    })
    var lastTouchEnd = 0
    document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, false)
  },
  methods: {
    // 处理按键
    _handleKeyPress (e) {
      let num = e.target.dataset.num
      // 不同按键处理逻辑
      // -1 代表无效按键，直接返回
      if (num === -1) return false
      switch (String(num)) {
        // 删除键
        case 'D':
          this._handleDeleteKey()
          break
        // 完成键
        case 'S':
          this._handleConfirmKey()
          break
        // 数字键
        default:
          this._handleNumberKey(num)
          break
      }
    },
    // 处理删除键
    _handleDeleteKey () {
      let S = this.password
      // 如果没有输入，直接返回
      if (!S.length) {
        return false
      } else { // 否则删除password长度，再向父级传删除
        this.password = this.password.toString().substr(0, this.password.toString().length - 1)
        this.$emit('keyVal', 'del')
      }
    },
    // 处理数字
    _handleNumberKey (num) {
      let S = num
      // 如果键盘输入的次数超过4位则跳出
      if (this.password.length !== 0 && this.password.length === 4) {
        return
      } else { // 否则存起键盘去到的值，并向父级传值
        this.password += num
        this.$emit('keyVal', S)
      }
      console.log(S, 'num')
    },
    // 完成-关闭键盘
    _handleConfirmKey () {
      this.$emit('close', false)
    }
  }
}
</script>

<style scoped lang="less">
    .keyboard { 
      cursor: pointer;
    display: inline-block; 
    width: 100%; 
    font-size: 18px; 
    background-color: #D2D5DB; 
    user-select: none; 
    bottom: 0; 
    position: absolute;/*定位数字键盘*/
    left: 0px; 
    z-index: 999; 
    pointer-events: auto; 
    padding: 3px;
    .pkey { 
        width: 100%; 
        padding: 3px;
        display: flex; 
        display: -webkit-box; 
        flex-direction: row; 
        flex-wrap: nowrap; 
        justify-content: space-between;
        div{
            width:calc(~'33.33333% - 4px'); 
        } 
        i { 
            width: 100%;
            display: block; 
            margin: 0 0.2%; 
            height: 46px; 
            line-height: 46px; 
            font-style: normal; 
            font-size: 24px; 
            border-radius:4px; 
            background-color: #fff; 
            text-align: center; 
            flex-grow: 1; 
            flex-shrink: 1; 
            flex-basis: 0; 
            -webkit-box-flex: 1; 
            box-shadow: 0px 1px 0 0 #848688;
            &:active { 
                background-color: #ededed;
                box-shadow: none;
            }
        } 
        .key-confirm { 
            background: #FC8253; 
            color: #fff; 
            font-size: 18px; 
        } 
        .key-delete { 
            // color: #a5a5a5;
            background: none;
            box-shadow: none;
        } 
        .tab-num { 
            font-size: 18px; 
            background: #dedede; 
            color: #5a5959; 
        } 
        .tab-point { 
            width: 20px; 
        } 
        .tab-blank { 
            width: 50px; 
            font-size: 12px; 
            padding: 0 15px; 
            color: #5a5959; 
            line-height: 60px; 
        } 
        .tab-symbol { 
            width: 20px; 
            font-size: 18px; 
        } 
        .tab-enter { 
            font-size: 30px; 
            line-height: 54px; 
        } 
        &:nth-child(2) { 
            width: 100%; 
        } 
    } 
} 
</style>