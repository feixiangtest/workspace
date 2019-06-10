<template>
<div class="wrapper">
    <div v-if="isPreview === 5">
      <dl class="promotionList" >
          <template v-for="(articleVo, len) in listPreview">
          <dt v-if="articleVo && articleVo.section && articleVo.section.stationKey && articleVo.section.stationKey=='MOB_YHHD' && articleVo.photoDocList.length > 0"
            :id="'photoDocList_' + index" :key="'photoDocList_' + index" v-for="(item, index) in articleVo.photoDocList">
              <!-- 设置了标题图片 -->
              <div @click="active(index)" v-if="item.mouseOffPicSim !== undefined && item.mouseOffPicSim.length > 0"
                :style="'background-image: url(' + staticDomain + item.mouseOffPicSim + ')'"
                style="height:83px;background-repeat:no-repeat;background-position:center;background-size: contain;">
              </div>
              <div @click="active(index)" v-if="item.mouseOffPicSim === undefined || item.mouseOffPicSim === '' || item.mouseOffPicSim === null">
                <img class="promotionListImg" v-if="item.titleDescribeSim" :src="imgSrc + item.titleDescribeSim + imgSrcSuffix" alt="">
                <span class="prompTitle">{{item.titleSim}}</span>
                <i :class="{'yo-icon icon-arrows-bottom': cur !== index, 'yo-icon icon-arrows-top': cur === index}"></i>
              </div>
            <!-- 内容：文字 -->
            <div class="promoConten" :style="cur === index ? 'display:block' : 'display:none' " v-if="item.picStatusSim == 0" v-html="item.contextSim">
                      {{item.contextSim}}
            </div>
            <!-- 内容：图片 -->
            <div class="promoConten" :class="cur !== index ? 'hide' : ''" v-if="item.picStatusSim == 1">
                <img style="width:100%" :src="staticDomain + item.cpicSim" alt=""/>
            </div>
          </dt>
          </template>
      </dl>
    </div>
    <div  v-else class="promotionBox">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false"
                   ref="loadmore" @top-status-change="handleTopChange">
      <dl class="promotionList">
          <template v-for="(articleVo, len) in listArticleVo">
          <dt v-if="articleVo && articleVo.section && articleVo.section.stationKey && articleVo.section.stationKey=='MOB_YHHD' && articleVo.photoDocList.length > 0"
            :id="'photoDocList_' + index" :key="'photoDocList_' + index" v-for="(item, index) in articleVo.photoDocList">
            <!-- 设置了标题图片 -->
            <div @click="active(index)" v-if="item.mouseOffPicSim !== undefined && item.mouseOffPicSim.length > 0"
              :style="'background-image: url(' + staticDomain + item.mouseOffPicSim + ')'"
              style="height:83px;background-repeat:no-repeat;background-position:center;background-size: contain;">
            </div>
            <div @click="active(index)" v-if="item.mouseOffPicSim === undefined || item.mouseOffPicSim === '' || item.mouseOffPicSim === null">
              <img class="promotionListImg" v-if="item.titleDescribeSim" :src="imgSrc + item.titleDescribeSim + imgSrcSuffix" alt="">
              <span class="prompTitle">{{item.titleSim}}</span>
              <i :class="{'yo-icon icon-arrows-bottom': cur !== index, 'yo-icon icon-arrows-top ': cur === index}"></i>
            </div>
            <!-- 内容：文字 -->
            <div class="promoConten" :style="cur === index ? 'display:block' : 'display:none' " v-if="item.picStatusSim == 0" v-html="item.contextSim">
                      {{item.contextSim}}
            </div>
            <!-- 内容：图片 -->
            <div class="promoConten" :class="cur !== index ? 'hide' : ''" v-if="item.picStatusSim == 1">
                <img style="width:100%" :src="staticDomain + item.cpicSim" alt=""/>
            </div>
          </dt>
          </template>
      </dl>
        <div slot="top" class="mint-loadmore-top">
                  <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
                      <i class="yo-icon icon-load-top"></i>
                      <em>松开刷新....</em>
                  </span>
          <mt-spinner color="#585252" :type="3" v-show="topStatus === 'loading'" ></mt-spinner>
        </div>
      </mt-loadmore>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import Loadmore from 'mint-ui/lib/loadmore' // 按需加载mint-ui的模块
import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
export default {
  data () {
    return {
      cur: '',
      topStatus: '',
      isload: true,
      pageSize: 16,
      currentPage: 0 // 当前页码
    }
  },
  computed: {
    staticDomain () {
      return this.$store.state.home.staticDomain
    },
    listArticleVo () {
      return this.$store.state.home.promotionList
    },
    listPreview () {
      return this.$store.state.preView.promotions
    },
    imgSrc () {
      return this.commonImgUrl + '/promotion/activity-ico'
    },
    imgSrcSuffix () {
      return '.png'
    },
    isPreview () {
      return this.$store.state.preView.isPreview
    },
    commonImgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  created () {
    let param = {
      currentPage: this.currentPage,
      pageSize: this.pageSize
    }
    this.$store.state.home.templist.splice(0, this.$store.state.home.templist.length)
    this.$store.dispatch('promotion.action', param).then(res => {
      this.currentPage++
    })
  },
  mounted () {
    // 设置标题
    window.indexMain.setTitle()
    let query = this.$route.query
    if (query.isPreview) {
      this.isPreview = true
    }
  },
  methods: {
    active (index) {
      if (this.cur === index) {
        this.cur = ''
      } else {
        this.cur = index
      }
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    loadTop () {
    // 刷新数据
      this.currentPage = 0
      let param = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$store.state.home.templist.splice(0, this.$store.state.home.templist.length)
      this.isload = true
      this.loadData(param)
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
    // 加载更多数据
      let param = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      if (this.isload) {
        this.loadData(param)
      }
      this.$refs.loadmore.onBottomLoaded() // 刷新节点
    },
    loadData (param) { // 分页加载
      this.$store.dispatch('promotion.action', param).then(res => {
        let nextlength = this.currentPage * this.pageSize
        console.info(res.list[0].photoDocList.length)
        if (res.list && res.list[0].photoDocList.length - nextlength < this.pageSize) {
          this.isload = false
        }
        this.currentPage++
      })
    }
  }

}
</script>
<style>
  .mint-loadmore-top .mint-spinner-fading-circle {
    margin-left: 45%;
  }
</style>
