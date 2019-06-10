<template>
    <common-alert :is-show.sync="isShow" :title="getTitle" :width="getWidth" :height="getHeight" :content="getContent" :hide-alert='hideAlert'></common-alert>
</template>


<script>

/*
 vue 单独编译注释：
 1 import commonAlert from '@s/components/copy/commonAlert'
 不单独编译
 *放过这个不会修改

 不要 import 引入
 * */
export default {
  name: 'popUpAd',
  components: {
  },
  data () {
    return {
      isShow: false
    }
  },
  created () {
    console.log('popUpAd.vue')
  },
  computed: {
    // 获取数据
    photoDoc () {
      // 获取所有栏
      if (this.isPreview && this.loadArticle && this.loadArticle.section.stationKey === 'SY_TCGG') {
        if (this.loadArticle && this.loadArticle.photoDocList.length) {
          let _photoDoc = this.loadArticle.photoDocList[0]
          // 如果是图片
          if (_photoDoc.picStatusSim === 1) {
            _photoDoc.contextSim = `<img src=${this.staticDomain + _photoDoc.cpicSim} />`
          }
          // 显示弹框
          this.isShow = true
          this.forbidSlide()
          return _photoDoc
        }
      } else {
        // 上传之后的弹框，
        if (this.articleArr.length && !window.common.getCookie('website_ad')) {
          let _photoDoc = this.articleArr[0]
          // 如果是图片
          if (_photoDoc.picStatusSim === 1) {
            _photoDoc.contextSim = `<img src=${this.fastDfsUrl + _photoDoc.cpicSim} />`
          }
          console.log('showGuanggao')
          // 显示弹框
          this.isShow = true
          this.forbidSlide()
          // 设置cookie
          window.common.setCookie('website_ad', true, window.common.cookieDays)
          return _photoDoc
        }
      }
    },
    // 弹框标题
    getTitle () {
      return this.getValue('titleSim') // this.photoDoc.titleSim || ''
    },
    // 弹框宽度
    getWidth () {
      let $ = window.$
      if (this.getValue('gbkWidth') > $(window).width()) {
        return $(window).width() - 40
      }
      return this.getValue('gbkWidth') // this.photoDoc.gbkWidth || ''
    },
    // 弹框高度
    getHeight () {
      let $ = window.$
      // 判断弹框高度是否超过屏幕高度，如果超过那么高度修改为屏幕高度减去40
      if (this.getValue('gbkHeight') > $(window).height()) {
        return $(window).height() - 40
      }
      return this.getValue('gbkHeight')
      // return this.getValue('gbkHeight') // this.photoDoc.gbkHeight || ''
    },
    // 弹框内容
    getContent () {
      return this.getValue('contextSim') // this.photoDoc.contextSim || ''
    },
    isPreview () {
      return this.$store.state.shareApi.isPreview === 1
    },
    staticDomain () {
      return this.$store.state.shareApi.staticDomain
    },
    fastDfsUrl () {
      return this.$store.state.shareApi.fastDfsUrl // 静态资源地址
    },
    articleArr () {
      return this.$store.state.shareApi.hpad // 预览时浮动图数据
    },
    loadArticle () {
      return this.$store.state.shareApi.loadArticle // 预览时浮动图数据
    }
  },
  methods: {
    hideAlert () {
      setTimeout(() => {
        this.isShow = false
      }, 200)
      window.$('html').css('overflow', 'auto')
    },
    forbidSlide () {
      if (this.isShow === true) {
        window.$('html').css('overflow', 'hidden')
      } else {
        window.$('html').css('overflow', 'auto')
      }
    },
    getValue (name) {
      if (this.photoDoc) {
        return this.photoDoc[name]
      }
      return ''
    }
  }
}
</script>
