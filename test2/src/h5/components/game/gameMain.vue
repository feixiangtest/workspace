<template>
  <div class="game-main main-box" v-if=' gameList'>
    <div class="game-menu">
      <ul class="yow-content" ref="platform">
        <li v-for="(item,index) in gameList" v-if='item.gameCenterCat&&item.gameCenterCat.length>0&&item.gameCenterCat[0].centerGame' :key='index' :class="{cur:index === activeIndex}" @click="platformChange(index)">{{item.categoryName}}</li>
      </ul>
    </div>
    <div class="game-box" v-for='(item,itemIndex) in gameList[activeIndex].gameCenterCat' :key='itemIndex'>
      <div class="public-title magt5" v-if='item.centerGame&&item.centerGame.length>0'>
        <h1 class="yow-content">{{item.categoryName}}
          <span class="jiantou" @click='foldList(itemIndex)'>
              <i class="yo-icon icon-fold any-anime" v-if="!item.hide" ></i>
              <i class="yo-icon icon-fold any-anime anime-rotate"  v-else></i>
            </span>
        </h1>
      </div>
      <div class="game-inbox yow-content index-game">
        <dl v-show='!item.hide'>
          <dd v-for='(games,gameIndex) in item.centerGame' :key='gameIndex' @click="toGame(games)">
            <i class="yo-img-icon img-shiwan" v-if='games.trialFlag===1&&type===1'></i>
            <i class="yo-img-icon" :class='"img-"+transMark[games.gameFlag-1]' v-else></i>
            <img :src="games.gamePic" alt="">
            <h3>{{games.gameName}}</h3>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data () {
      return {
        transMark: ['', 'zuixin', 'huobao', 'huodong'] // 将后端返回的游戏标识转化为对应类名
      }
    },
    methods: {
      platformChange (index) {
        this.$store.state.h5Home.gameActiveIndex = index
        window.indexMain.gpoScrollTop()
      },
      // 跳转到第三方游戏
      toGame (games) {
        // 判断是否登录
        if (!window.common.loginStatus) {
          window.store.state.shareApi.showPopLogin = true // 跳转登录
          return false
        }
        // 如果后台有传跳转地址，那么跳转到游戏地址
        if (games.frontUrl) {
          var left = (document.body.clientWidth - 1000) / 2
          var params = 'height=680,width=970,top=0,left=' + left + ',toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=yes, status=yes'
          window.open(games.frontUrl, '视讯游戏', params)
        } else {
          this.$jumpLive(games.jumpArgs, 1, games.id)
        }
      },
      // 折叠列表
      foldList (index) {
        let item = this.gameList[this.activeIndex].gameCenterCat[index]
        this.$set(item, 'hide', !item.hide)
      }
    },
    computed: {
      ...mapState({
        type: state => parseInt(state.h5Home.type), // 登录类型  2表示测试会员，1表示是试玩，0表示正常(包括正常用户和非登陆情况)
        gameList: state => state.h5Home.homeGameList.gameCenterCategoryList, // 游戏数据
        fastDfsUrl: state => state.h5Home.fastDfsUrl, // 静态资源地址
        activeIndex: state => state.h5Home.gameActiveIndex // 保存点击的tab栏目，切换的时候保留数据
      })
    },
    mounted () {
      this.$store.state.h5Home.headerType = 1
    }
  }
</script>
