<template>
  <div class="yo-keyboard" @click.stop style='user-select: none;' >
    <div class="yo-shur">
      <span v-for='(item,index) in 4' :key='index'>{{inputData[index]}}</span>
    </div>
    <div class="yo-number" >
      <span v-for='item in keyNumbers' :key='item' @click='clickNum(item)'>{{item}}</span>
      <span class="yo-k-qc" @click='reset'>重置</span>
    </div>
  </div>
</template>
<script>
  /** 1 编译
   *    gulp编译 站点
   *    webpack打包构建
   *  2 引用关系：
   *      会员中心
   *      注册使用
   */
  export default {
    props: ['inputData', 'clickNum', 'clear', 'keyNum'],
    data () {
      return {
        keyNumbers: [6, 7, 8, 9, 2, 3, 4, 5, 0, 1]
      }
    },
    created () {
      document.onkeydown = (event) => {
        if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) return
        if (typeof this.keyNum === 'function') {
          this.keyNum(event)
        }
      }
    },
    methods: {
      reset () {
        this.clear()
      },
      setNewCode (ev) {
        console.log(ev, 'showKeyNum')
      }
    }
  }
</script>

