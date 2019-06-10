<template>

  <common-alert :is-show="showPopUpMessage" :title="getTitle" :width="getWidth" :height="getHeight" :content="getContent" :hide-alert='hideAlert'></common-alert>

</template>

<script>

/*
 vue 单独编译注释：
 独编译
 import commonAlert from '@s/components/copy/commonAlert'
 * */
export default {
  name: 'popUpMessage',
  components: {
  },
  data () {
    return {
      // isShow: false,
      getTitle: '',
      getWidth: '',
      getHeight: '',
      getMaxHeight: '',
      getContent: '',
      msgIndex: 0
    }
  },
  created () {
  },
  computed: {
    staticDomain () {
      return this.$store.state.shareApi.staticDomain
    },
    fastDfsUrl () {
      return this.$store.state.shareApi.fastDfsUrl // 静态资源地址
    },
    popUpMessage () {
      return this.$store.state.user.popUpMessage // 会员登录时消息弹框
    },
    popUpMessageList () {
      return this.$store.state.user.popUpMessageList // 会员登录时消息弹框
    },
    showPopUpMessage () {
      return this.$store.state.user.showPopUpMessage // 会员登录时消息弹框
    }
  },
  methods: {
    hideAlert () {
      this.msgIndex++
      this.$store.state.user.popUpMessage = this.$store.state.user.popUpMessageList[this.msgIndex]
      this.$store.state.user.showPopUpMessage = false // 触发一下被动，然后才会更新watch。
      this.$store.state.user.showPopUpMessage = true
      if (this.msgIndex === this.$store.state.user.popUpMessageList.length) {
        this.$store.state.user.showPopUpMessage = false
        this.msgIndex = 0
      }
    },
    // 根据key获取对应的值
    getValue (name) {
      if (this.popUpMessage) {
        // 如果是图片返回图片
        if (name === 'gbkContent' && this.popUpMessage['gbkPicUrl']) {
          return `<img src=${this.fastDfsUrl + this.popUpMessage.gbkPicUrl} />`
        }
        // 否则返回对应值
        return this.popUpMessage[name]
      }
      return ''
    }
  },
  watch: {
    // 监听消息变化
    showPopUpMessage: {
      handler: function (val) {
        if (!this.popUpMessage) {
          this.$store.state.user.showPopUpMessage = false
        }
        if (window.common.loginStatus && this.popUpMessage) {
          // 弹窗标题
          this.getTitle = this.getValue('title')
          let $ = window.$
          // 弹窗宽
          if (this.getValue('gbkWidth') > $(window).width()) {
            this.getWidth = $(window).width() - 40
          } else {
            this.getWidth = this.getValue('gbkWidth')
          }
          // 弹窗高
          if (this.getValue('gbkHeight') > $(window).height()) {
            this.getHeight = $(window).height() - 40
          } else {
            this.getHeight = this.getValue('gbkHeight')
          }
          // 弹窗内容
          this.getContent = this.getValue('gbkContent')
          // 显示弹窗
          this.isShow = true
          // localStorage.isShow = 'show'
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
