<template>
  <div id="memberHea" class="memberHea" @keyup.enter="search">
    <div class="heaTop">
      <div class="center">
        <span class="mdTime"><i class="el-icon-time"></i> 美东时间：{{date}}</span>
      </div>
    </div>
    <div class="heaCon" >
      <div class="center clearfix memberCen">
        <!-- <div class="logo"><img src="/resource/core/images/logo.png" alt=""></div> -->
        <div class="logo"><img :src="'../../../resource/'+station.durl+'/images/log-top.png'" alt=""></div>
        <div class="nav helpSearch">
            <div class="helpSearCon">
                <div class="SearchInput "><i class="el-icon-search"></i>
                  <input type="text" placeholder="输入您的问题或关键字" v-model='searchData' @click.stop='showHistory = true'>
                  <ul class="searcRecord" v-show='showHistory'>
                      <li v-for='(item,index) in searchHistory' :key='index' @click='searchData = item'>{{item}}</li>
                      <li @click='clearHistory' v-show='searchHistory.length>0'>清除搜索记录</li>
                  </ul>
                </div>
                <el-button plain class="" @click.stop="search">搜索</el-button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dateUtil from '@s/utils/dateUtils'
import {
  mapActions
} from 'vuex'
import * as types from '@/store/help/type'
export default {
  name: 'memberHea',
  data () {
    let historyArr = localStorage.getItem('showHistory')
    historyArr = historyArr ? historyArr.split(',') : []
    return {
      searchData: '',
      date: '',
      searchHistory: historyArr,
      showHistory: false,
      station: JSON.parse(window.localStorage.getItem('station')) || {}
    }
  },
  methods: {
    ...mapActions({
      searchArticleAction: types.SEARCHARTICLE // 初始化额度转换数据
    }),
    clearHistory () {
      localStorage.removeItem('showHistory')
      this.searchHistory = []
    },
    search () {
      if (!this.searchData) {
        window.layer.msgWarn('请输入搜索内容')
        return
      }
      this.searchArticleAction({ content: this.searchData }).then(res => {
        this.$store.state.help.activeId = 'empty' // 清空原有的点亮图标
        this.$store.state.help.searchData = this.searchData // 清空原有的点亮图标
        let historyArr = localStorage.getItem('showHistory') // 将搜索记录存储到本地
        historyArr = historyArr ? historyArr.split(',') : []
        if (historyArr.indexOf(this.searchData) === -1) {
          historyArr.unshift(this.searchData)
          this.searchHistory = historyArr
          localStorage.setItem('showHistory', historyArr)
        }
        this.showHistory = false
        this.$router.push({ name: 'search' })
      })
    },
    usaTime () {
      setInterval(() => {
        this.date = dateUtil.usaTime()
      }, 1000)
    }
  },
  created () {
    this.usaTime()
  },
  mounted () {
    document.onclick = () => {
      this.showHistory = false
    }
  }
}
</script>
