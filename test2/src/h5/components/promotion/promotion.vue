<template>
    <div>
        <div class="more-list-box">

            <!-- 优惠活动 -->
            <div class="promotion-more yow-content" v-if="!noData">
                <!-- 预览结果 -->
                <div class="promo-item magt10" v-if="isPreview2 === 1" @click="promoDetail(item)" v-for="(item, index) in mobPromotion" :key="index">
                    <!-- 优惠-标题图片 -->
                    <div class="pro-img-title" v-if="item.mouseOffPicSim !== undefined && item.mouseOffPicSim.length > 0"
                          :style="'background-image: url(' + fastDfsUrl + item.mouseOffPicSim + ')'" >
                    </div>
                    <!-- 优惠-文本标题 -->
                    <div class="promo-title promo-width promo-hover" v-else>
                      <!-- 标题小图片 -->
                      <span class="iconImg" v-if="item.titleDescribeSim">
                        <img :src="commonImgUrl + '/promotion/activity-ico'+ item.titleDescribeSim + '.png'">
                      </span>
                      <h4>{{item.titleSim}}</h4>
                    </div>
                </div>

                <div v-if="isPreview2 === 0">
                  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
                      @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
                    <!-- 上拉刷新 -->
                    <!-- 正文 -->
                    <div class="promo-item magt10"  @click="promoDetail(item)" v-for="(item, index) in mobPromoList" :key="index">
                        <!-- 优惠-标题图片 -->
                        <div class="pro-img-title" v-if="item.mouseOffPicSim !== undefined && item.mouseOffPicSim.length > 0"
                              :style="'background-image: url(' + fastDfsUrl + item.mouseOffPicSim + ')'">
                        </div>
                        <!-- 优惠-文本标题 -->
                        <div class="promo-title promo-width promo-hover" v-else>
                          <!-- 标题小图片 -->
                          <span class="iconImg" v-if="item.titleDescribeSim">
                            <img :src="commonImgUrl + '/promotion/activity-ico'+ item.titleDescribeSim + '.png'">
                          </span>
                          <h4>{{item.titleSim}}</h4>
                        </div>
                    </div>

                    <!-- 下拉加载 -->
                    <div slot="top" class="mint-loadmore-top">
                          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
                              <i class="yo-icon icon-load-top"></i>
                              <em>松开刷新....</em>
                          </span>
                          <mt-spinner color="#585252" :type="3" v-show="topStatus === 'loading'"></mt-spinner>
                      </div>
                      <div slot="bottom" class="mint-loadmore-bottom" style="display: block">
                          <mt-spinner color="#585252" :type="3" v-show="bottomStatus === 'loading'"></mt-spinner>
                      </div>
                  </mt-loadmore>
                  <!-- 更多 -->
                  <div class="yo-more magt10" id="yoMore" v-if="showMore">
                      <span class="moreline"></span><span>{{moreText}}</span><span class="moreline"></span>
                  </div>
                </div>
            </div>
            <!-- 无数据 -->
            <no-data-page v-if="noData"></no-data-page>

        </div>

        <!-- 优惠活动-漂浮详情页 -->
        <float-page :isfloatPage='isfloatPage' :floatPageType='floatPageType' :floatTitle='floatTitle'></float-page>

    </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import { Loadmore } from 'mint-ui'
import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
import floatPage from '@/components/floatPage/publicDetails' // 浮动单页-详情
import noDataPage from '@/components/floatPage/noData' // 无数据
import * as Types from '@s/store/promotion/type.js'
Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
export default {
  // mixins: [promotion],
  data () {
    return {
      floatTitle: '', // 浮动单页标题
      listPreview: '', // 优惠活动数据
      mobPromoList: [], // 手机版优惠活动列表
      pageNo: 1, // 分页
      moreText: '', // 更多文本文字
      noData: false, // 无数据页面显示
      allLoaded: false, // 加载
      topStatus: '', // 上滑状态
      bottomStatus: '', // 下滑状态
      isload: true, // 是否允许分页
      showMore: false // 是否显示更多和没有更多提示
    }
  },
  computed: {
    ...mapState({
      isfloatPage: state => state.h5Home.isfloatPage, // 显示浮动单页
      floatPageType: state => state.h5Home.floatPageType, // 显示类型
      fastDfsUrl: state => state.h5Home.fastDfsUrl, // 静态资源地址
      commonImgUrl: state => state.h5Home.h5img, // H5静态地址
      isPreview2: state => state.h5Home.isPreview2,
      mobPromotion: state => state.h5Home.mobPromotion
    })
  },
  components: {
    floatPage,
    noDataPage
  },
  mounted () {
    this.$store.state.h5Home.headerType = 1
    this.initData()
    console.log(this.$store.state.shareApi.fastDfsUrl, '111111')
  },
  methods: {
    ...mapActions({
      getPromotionListAction: Types.GETPROMOTIONLIST_ACTION // h
    }),
    // 上滑状态
    handleTopChange (status) {
      this.topStatus = status
    },
    // 下滑状态
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadTop () {
      // 加载更多数据
      this.pageNo = 1
      this.isload = true
      this.initData(0)
      this.allLoaded = false // 下拉加载后重置滑动加载
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      // 加载更多数据
      this.pageNo++
      if (this.isload) {
        this.initData(1)
      } else {
        this.$refs.loadmore.onBottomLoaded() // 刷新节点
      }
    },
    promoDetail (item) {
      window.indexMain.gpoScrollTop()
      this.floatTitle = '活动详情'
      this.$store.state.h5Home.isfloatPage = true
      this.$store.state.h5Home.floatPageType = 1
      this.$store.state.h5Home.promotion = item
    },
    initData (type) {
      let param = {
        currentPage: this.pageNo,
        'sourceType': 'mobile',
        hideLoading: true
      }
      this.getPromotionListAction(param).then(res => {
        // 数据是否存在
        if (res.data) {
          if (res.data.photoDocList && res.data.photoDocList.length === 0) {
            this.allLoaded = true // 若数据已全部获取完毕
          }
          if (res.data.photoDocList && res.data.photoDocList.length >= 1) {
            this.noData = false
          } else {
            this.noData = true
          }
        } else {
          this.noData = true
          return
        }

        if (Number(type) === 0) {
          this.mobPromoList = res.data.photoDocList
          this.$refs.loadmore.onTopLoaded()
        } else if (Number(type) === 1) {
          this.mobPromoList = this.mobPromoList.concat(res.data.photoDocList)
          this.$refs.loadmore.onBottomLoaded()
        } else {
          this.mobPromoList = this.mobPromoList.concat(res.data.photoDocList)
          console.log(this.mobPromoList, '000000')
        }

        // 计算是否有一页以上的内容
        let total = res.count
        let nextlength = parseInt((total + 10 - 1) / 10)
        if (nextlength <= this.pageNo) {
          if (total <= 10) {
            this.showMore = false
          } else {
            this.showMore = true
            this.moreText = '没有更多了'
            this.$nextTick(() => {
              window.$('#yoMore').addClass('gray-more')
            })
          }
          this.isload = false
        } else {
          this.showMore = true
          this.moreText = '更多'
          this.$nextTick(() => {
            window.$('#yoMore').removeClass('gray-more')
          })
          this.isload = true
        }
      })
    }
  }
}
</script>
