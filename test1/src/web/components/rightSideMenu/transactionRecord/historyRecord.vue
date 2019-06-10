<template>
  <div style="height: 100%;">
    <div style="height: 100%;" v-show="!showDetail">
        <transactionRecordHeader></transactionRecordHeader>
        <div class="centerBox mainCenterTwo ">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
          @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
              <div class="recordBox scrollIos">
                  <dl class="recordList">
                      <dd @click="toCurrentRecordPage(item)" v-for="(item, index) in historyRecordData" :key="index">
                          <h3 class="recordTitle" v-if="item.objectVo.strObj === ''">{{item.tradeType | numShowFilter}}</h3>
                          <h3 class="recordTitle" v-if="item.objectVo.strObj !== ''">{{item.tradeType | numShowFilter}}-{{item.objectVo.strObj}}</h3>
                          <p><span class="red"> 交易额度：<em>{{item.tradeLimit | moneyFilter}}</em></span><span class="gray"> -注单明细：{{item.bettingCode}}</span></p>
                          <span class="item-note item-time">{{ item.createDateTimeStr | contentFilter(10) }}</span>
                      </dd>
                  </dl>
              </div>
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
        </div>
    </div>
    <div v-if="showDetail">
      <div class="header yo-home-nav">
          <div class="center">
              <div class="hea-menu hea-left">
                  <a href="javascript:;" @click="goBack()"><i class="yo-icon icon-arrows-left"></i></a>
              </div>
              <div class="header-text titile">
                  <h1>消息详情</h1>
              </div>
              <div class="hea-user hea-right">
              </div>
          </div>
      </div>
      <div class="centerBox mainCenter">
          <div class="depositMain onlineDraw">
              <dl class="secondForm">
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">交易时间</span>
                          <span class="itemNeir">{{ detailData.createDateTimeStr }}</span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">交易类别</span>
                          <span class="itemNeir" v-if="detailData.objectVo.strObj === ''">{{ detailData.tradeType | numShowFilter }}</span>
                          <span class="itemNeir" v-if="detailData.objectVo.strObj !== ''">{{ detailData.tradeType | numShowFilter }}-{{detailData.objectVo.strObj}}</span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">交易额度</span>
                          <span class="itemNeir">{{detailData.tradeLimit | moneyFilter}}</span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">现有额度</span>
                          <span class="itemNeir">{{detailData.existingLimit | moneyFilter}}</span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">注单明细</span>
                          <span class="itemNeir">{{detailData.bettingCode}}</span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">备注</span>
                          <span class="itemNeir" v-if="detailData.tradeType==='3'||detailData.tradeType==='4'||detailData.tradeType==='6'
                          ||detailData.tradeType==='7'||detailData.tradeType==='53'||detailData.tradeType==='54'||
                          detailData.tradeType==='55'||detailData.tradeType==='56'||detailData.tradeType==='91' || detailData.tradeType==='95' || detailData.tradeType==='146'">
                                {{detailData.remark}}
                          </span>
                          <span class="itemNeir" v-if="detailData.tradeType==='37'||detailData.tradeType==='38'||detailData.tradeType==='19'
                          ||detailData.tradeType==='22'||detailData.tradeType==='23'||detailData.tradeType==='24'||detailData.tradeType==='25'
                          ||detailData.tradeType==='26'||detailData.tradeType==='27'||detailData.tradeType==='28'||detailData.tradeType==='31'
                          ||detailData.tradeType==='32'||detailData.tradeType==='33'||detailData.tradeType==='35'||detailData.tradeType==='36'
                          ||detailData.tradeType==='34'||detailData.tradeType==='47'||detailData.tradeType==='46'||detailData.tradeType==='57'
                          ||detailData.tradeType==='58'||detailData.tradeType==='88'||detailData.tradeType==='89'">
                                {{detailData.detailInfo }}
                          </span>
                          <span class="itemNeir" v-if="detailData.tradeType=='5'||detailData.tradeType=='21'">
                              {{msg}}
                          </span>
                          <!--{{detailData.remark}}-->
                      </div>
                  </dd>
              </dl>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import transactionRecordHeader from './transactionRecordHeader'

import Vue from 'vue'
import Loadmore from 'mint-ui/lib/loadmore' // 按需加载mint-ui的模块
import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
import * as types from '@/base/store/transactionRecord/type'
import * as statusCode from '@/base/utils/status_const'

Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)

export default {
  data () {
    return {
      showDetail: false, // 展示详情
      topStatus: '',
      bottomStatus: '',
      allLoaded: false,
      pageNo: 1,
      historyRecordData: [],
      detailData: {}, // 当前查看详情对应数据对象
      msg: ''// 返水冲销单独的msg
    }
  },
  components: {
    transactionRecordHeader
  },
  methods: {
    toCurrentRecordPage (data) {
      this.showDetail = true
      if (data.tradeType === '5' || data.tradeType === '21') {
        let s = data.remark.split(',')
        let dt = data.tradeType === '21' ? 1 : 0
        let $this = this
        window.$.ajax({
          'type': 'post',
          'url': '/api/wap/member/readMessage' + '?t=' + new Date().getTime(),
          'dataType': 'json',
          'cache': false,
          'async': false,
          'contentType': 'application/json',
          'data': JSON.stringify({
            eventUUID: s[0],
            detailsId: s[1],
            dataType: dt
          }),
          'success': function (_res) {
            $this.msg = _res.data.msg
          }
        })
      }
      this.detailData = data
    },
    goBack () {
      this.showDetail = false
      this.detailData = []
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadTop () {
      // 加载更多数据
      this.pageNo = 1
      this.historyRecordData = []
      this.loadData(0)
      this.allLoaded = false // 下拉加载后重置滑动加载
    },
    loadBottom () {
        // 加载更多数据
      this.pageNo++
      this.loadData(1)
    },
    /**
     * @augments type 0:下拉刷新  1：上拉加载
     *
     */
    loadData (type) {
      window.__DEBUG = false
      this.$store.dispatch(types.CURRENT_RECORD_ACTION, {'pageNo': this.pageNo, 'loading': 'pass'}).then(res => {
        if (res.status === statusCode.statusConst.SUCCESS) {
          if (res.data.length === 0) {
            this.allLoaded = true // 若数据已全部获取完毕
          }
          this.historyRecordData = this.historyRecordData.concat(res.data)
        }
        if (Number(type) === 0) {
          this.$refs.loadmore.onTopLoaded()
        } else if (Number(type) === 1) {
          this.$refs.loadmore.onBottomLoaded()
        }
      })
    }
  },
  created () {
    this.$store.state.transactionRecord.transactionRecordTitle = '往来记录'
    this.$store.state.transactionRecord.openRecordBox = 1
  },
  mounted () {
    this.historyRecordData = []
    this.loadData()
  }
}
</script>
<style>
.mint-loadmore-top .mint-spinner-fading-circle, .mint-loadmore-bottom .mint-spinner-fading-circle {
    margin-left: 45%;
}
</style>

