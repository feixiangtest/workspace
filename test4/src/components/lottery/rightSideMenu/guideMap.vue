<template>
  <div v-if="isShowGuideMap && !$store.state.site.showBetLoading" @click="close()" id="guideMap">
    <div class="header">
    </div>
    <div class="blank"></div>
    <div class="content">
      <div class="tag">
        <span class="info">点击进入可查看更多详细信息</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowGuideMap: true // 是否展示引导图
    }
  },
  props: ['parentToChild'],
  methods: {
    // 关闭引导图
    close () {
      this.isShowGuideMap = false
      localStorage.setItem(this.parentToChild.localStorageName, JSON.stringify(false))
      scrollTo(0, 0)
    }
  },
  mounted () { // 不依赖 init 接口
    this.isShowGuideMap = JSON.parse(localStorage.getItem(this.parentToChild.localStorageName))
    if (this.isShowGuideMap === null) {
      this.isShowGuideMap = true
    }
  }
}
</script>

<style lang="less">
#guideMap {
    position: fixed;
    z-index: 20;
    top: 134px;
    width: 100%;
    height: 100%;
    top: 0;
    .header{
      height: 91px;
      width: 100%;
      background: rgba(0, 0, 0, 0.43);
    }

    .blank{
      background: rgba(0, 0, 0, 0.01);
      width: 100%;
      height: 77px;
    }

    .content{
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.43);
      padding-top: 10px;
      .tag{
        width:234px;
        height:60px;
        position:relative;
        margin: auto;
        background-color:#e83b50;
        border-radius:2px;
        .info{
            position:absolute;
            z-index:1000;
            font-size:16px;
            text-align:center;
            color:#ffffff;
            padding-top: 18px;
            padding-left: 15px;
          }
      }
      .tag:before,.tag:after{
          content:"";
          display:block;
          border-width:18px;
          position:absolute;
          bottom:48px;
          left:97px;
          border-style:solid dashed dashed;
          border-color:transparent transparent #e83b50 transparent;
          font-size:0;
          line-height:0;
      }
    }

}

</style>

