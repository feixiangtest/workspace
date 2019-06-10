<template>
  <div class="layermbox layermbox0 layermshow" style='overflow:hidden;' v-if="showPopUpMessage && getContent">
    <div class="laymshade"  @touchmove.prevent></div>
    <!-- 页面中的提示弹框 \ 手机版弹出广告 -->
    <div class="layermmain">
      <div class="section">
        <div class="layermchild layermanim">
          <h4>{{getTitle}}</h4>
          <div class="layermcont">
            <div class="yo-tancen">
              <div v-html="getContent" id='mobAdContent'></div>
            </div>
          </div>
          <div class="layermbtn">
            <span type="1" id="layerMOkBtn" @click='hideAlert()'>确定</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>

<script>
  import commonAlert from '@s/components/copy/commonAlert'
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'popUpMessage',
    components: {
      commonAlert
    },
    data () {
      return {
        getTitle: '',
        getContent: '',
        msgIndex: 0
      }
    },
    created () {
      console.log('popmsg')
    },
    computed: {
      ...mapState({
        // staticDomain: state => state.h5Home.staticDomain, // 静态资源地址
        fastDfsUrl: state => state.h5Home.fastDfsUrl, // 静态资源地址
        popUpMessage: state => state.user.popUpMessage, // 会员登录时消息弹框
        popUpMessageList: state => state.user.popUpMessageList, // 会员登录时消息列表数据
        showPopUpMessage: state => state.user.showPopUpMessage // 是否展示会员登录时消息
      })
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
          if (name === 'gbkContent' && this.popUpMessage['gbkPicUrl'] && this.popUpMessage['gbkMsgType'] === 1) {
            return `<img style="height:100%;width:100%;" src=${this.fastDfsUrl + this.popUpMessage.gbkPicUrl} />`
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
          // 弹出消息赋值
          if (window.common.loginStatus && this.popUpMessage) {
            // 弹窗标题
            this.getTitle = this.getValue('title')
            // 弹窗内容
            this.getContent = this.getValue('gbkContent')
          }
          if (this.showPopUpMessage) {
            window.indexMain.stopScroll()
          } else {
            // 当前弹窗关闭了
            console.log('当前弹窗关闭了')
            window.indexMain.openScroll()
          }
        },
        immediate: true,
        deep: true
      }
    }
  }
</script>
