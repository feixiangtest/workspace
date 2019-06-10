<template>
  <div id="floatPage">
    <section class='floatComponent' v-for="(item,index) in getFloatArticle" :key="index" :id="getFloat(item.section.stationKey)+'Box'" :style="getStyle(item.section.stationKey)">
      <div class="floatBar" :class="getFloat(item.section.stationKey)+'ScrollTag'">
        <div :class="getFloat(item.section.stationKey)+'BarBox'">
            <a href="javascript:;" v-for="(i,index) in item.photoDocList" :key="index" @click="jumpClick(i,item.section.stationKey)">
              <img :src="fastDfsUrl+i.cpicSim"/>
            </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'floatBar',
  // 必须传入一个floatDivName，top才能有浮动跟随效果
  props: ['floatDivName', 'top', 'left', 'right', 'bottom'],
  data () {
    return {
      sectionKey: ['DLJFDT_ZC', 'DLJFDT_YC']
    }
  },
  computed: {
    // 获取数据
    getFloatArticle () {
      if (this.isPreview && this.loadArticle && this.sectionKey.indexOf(this.loadArticle.section.stationKey) > -1) {
        return [this.loadArticle]
      } else {
        return this.articleArr
      }
    },
    isPreview () {
      return this.$store.state.shareApi.isPreview === 1 // 是否是预览
    },
    fastDfsUrl () {
      return this.$store.state.shareApi.fastDfsUrl // 静态资源地址
    },
    articleArr () {
      return this.$store.state.shareApi.linksFloatimg // 预览时浮动图数据
    },
    loadArticle () {
      return this.$store.state.shareApi.loadArticle // 预览时浮动图数据
    }
  },
  mounted () {
    // 调用滚动方法
    this.floatBarScroll()
  },
  methods: {
    // 获取左右浮动图名称
    getFloat (key) {
      return key === 'DLJFDT_ZC' ? 'left' : 'right'
    },
    // 获取浮动style
    getStyle (key) {
      if (key === 'DLJFDT_ZC') {
        return {
          'top': '170px',
          'left': '5px',
          'float': this.getFloat(key)
        }
      } else {
        return {
          'top': '170px',
          'right': '5px',
          'float': this.getFloat(key)
        }
      }
    },
    // 滚动方法
    /**
     logMonit 兼容报错修复
     err: window.$ is not a function
     stack: TypeError: window.$ is not a function
     at o.floatBarScroll (
     */
    floatBarScroll () {
      let top = this.top || 170
      if (!window.$) return
      window.$(function () {
        window.$(window).scroll(function () {
          var offsetTop = top + window.$(window).scrollTop() + 'px'
          window.$('.floatComponent').animate({
            top: offsetTop
          }, {
            duration: 1000,
            queue: false
          })
        })
      })
    },
    // 浮动图点击事件
    jumpClick (item, key) {
      // 逻辑处理统一放到common中处理，避免以后有修改，减少打包。
      window.common.floatJump(item, key, this)
    }
  }
}
</script>
