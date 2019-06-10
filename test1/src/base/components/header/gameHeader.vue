<template>
  <div class="tab-nav stripedMenu fixationNav egameNav" id="egameUl">
      <ul class="navigation">
          <li :class="{'active': $route.path === item.modelUrl}" @click="goGame(item.modelUrl)" v-for="(item, index) in $store.state.home.eGamesTypeList">
            <a href="javascript:;">{{item.modelName}}<span class="redLine"></span></a>
          </li>
      </ul>
  </div>
</template>
<script>
  // TODO img 要区分静态资源文件staticDomain 和非静态资源文件 by vito
  export default {
    data () {
      return {
        gameList: []
      }
    },
    methods: {
      goGame (path) {
        this.$router.push(path)
        this.toVisible()
      },
      // 选中的头部位置，定位到可视
      toVisible () {
        this.$nextTick(() => { // 移动导航到对应的位置
          let idx = window.$('ul.navigation').children('li.active').index()
          window.$('.navigation')[0].scrollLeft = 93 * idx
        })
      }
    },
    mounted () {
      this.toVisible() // 选中的头部位置，定位到可视
    }
  }
</script>
