<template>
    <div class="yo-page-body">
        <div class="header yo-home-nav">
            <div class="center">
                <div class="hea-menu hea-left">
                    <a href="javascript:;" @click="goback()"><i class="yo-icon icon-arrows-left"></i></a>
                </div>
                <div class="header-text titile">
                    <h1>游戏公告 <span v-if="$store.state.home.isOffLine">(未连接)</span></h1>
                </div>
                <div class="hea-user hea-right">
                    <a href="javascript:;" @click="GoHome()"><i class="yo-icon icon-home"></i></a>
                </div>
            </div>
        </div>
        <div class="tab-nav stripedMenu fixationNav">
              <ul class="navigation newRecordUl">
                  <li :class="{'active': cur === 'lottery'}" @click="changeMessage('lottery')"><a href="javascript:;">彩票</a></li>
                  <li :class="{'active': cur === 'live'}" @click="changeMessage('live')"><a href="javascript:;">视讯直播</a></li>
                  <li :class="{'active': cur === 'sports'}" @click="changeMessage('sports')"><a href="javascript:;">体育</a></li>
                  <li :class="{'active': cur === 'electronic'}" @click="changeMessage('electronic')"><a href="javascript:;">电子</a></li>
              </ul>
        </div>
          <div class="centerBox mainCenterTwo">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange">
              <dl class="messaList">
                  <dd v-if="cur === 'lottery'" :key="'message_' + index" v-for="(item, index) in cpAnnouncementList" @click="GoMessageDetails(item)">
                      <p style="font-size:14px;float: right;" class="item-time">{{item.createDateTime | messageTime}}</p>
                      <p style="clear:both;" class="recordTitle">{{item.announcementname}}</p>
                      <p>{{item.content}}</p>
                  </dd>
                  <dd v-if="cur === 'live'" :key="'message_' + index" v-for="(item, index) in videoAnnouncementList" @click="GoMessageDetails(item)">
                      <p style="font-size:14px;float: right;" class="item-time">{{item.createDateTime | messageTime}}</p>
                      <p style="clear:both;" class="recordTitle">{{item.announcementname}}</p>
                      <p>{{item.content}}</p>
                  </dd>
                  <!--<dd class="newMessages" @click="GoMessageDetails()">
                      <h3 class="recordTitle">尊敬的okok111</h3>
                      <p>阿瓦提我WTGQ热风枪温阿瓦提我WTGQ热风枪温阿瓦提我WTGQ热风枪温阿瓦提我WTGQ热风枪温</p>
                      <span class="item-note item-time">2017-11-09 20:45:24</span>
                  </dd>-->

                  <dd v-if="cur === 'sports'" :key="'message_' + index" v-for="(item, index) in sportAnnouncementList" @click="GoMessageDetails(item)">
                      <p style="font-size:14px;float: right;" class="item-time">{{item.createDateTime | messageTime}}</p>
                      <p style="clear:both;" class="recordTitle">{{item.announcementname}}</p>
                      <p>{{item.content}}</p>
                  </dd>

                  <dd v-if="cur === 'electronic'" :key="'message_' + index" v-for="(item, index) in electronAnnouncementList" @click="GoMessageDetails(item)">
                      <p style="font-size:14px;float: right;" class="item-time">{{item.createDateTime | messageTime}}</p>
                      <p style="clear:both;" class="recordTitle">{{item.announcementname}}</p>
                      <p>{{item.content}}</p>
                  </dd>

              </dl>
               <div slot="top" class="mint-loadmore-top">
                  <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
                      <i class="yo-icon icon-load-top"></i>
                      <em>松开刷新....</em>
                  </span>
                  <mt-spinner color="#585252" :type="3" v-show="topStatus === 'loading'"></mt-spinner>
              </div>
            </mt-loadmore>
          </div>

          <div class="floatPages hide" :class="modalOptions" modal>
            <div class=" header yo-home-nav floatheader">
              <div class="center">
                <div class="header-text titile">
                  <i class="yo-icon icon-arrows-left" @click="modalHide()"></i>
                  <h1>公告详情</h1>
                </div>
              </div>
            </div>
            <div class="centerBox mainCenter shadeIn floatPagesCent">
              <div class="yo-pad10">
                <div class="lottery-wf f14">
                  <div class="news-time ng-binding">{{ detailObject.createDateTime | messageTime }}</div>
                    {{ detailObject.content }}
                </div>
                <!--<div class="yo-anniu-one" v-if="cur === 'msg'">
                  <a href="javascript:;" class="button" @click="modalHide()">关闭</a>
                  <a href="javascript:;" class="button">删除</a>
                </div>-->
              </div>
            </div>
          </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Modal from '@/base/utils/modal'
import Loadmore from 'mint-ui/lib/loadmore' // 按需加载mint-ui的模块
import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
import * as types from '@/base/store/message/type'

Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
export default {
  data () {
    return {
      cur: 'lottery',
      topStatus: '',
      allLoaded: true,
      modalOptions: '',
      detailObject: {}
    }
  },
  computed: {
    /** 彩票公告 */
    cpAnnouncementList () {
      return this.$store.state.message.cpAnnouncementList
    },
    /** 视讯公告 */
    videoAnnouncementList () {
      return this.$store.state.message.videoAnnouncementList
    },
    /** 体育公告 */
    sportAnnouncementList () {
      return this.$store.state.message.sportAnnouncementList
    },
    /** 电子公告 */
    electronAnnouncementList () {
      return this.$store.state.message.electronAnnouncementList
    }
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },
    loadTop () {
      // 加载更多数据
      this.loadData()
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      // 加载更多数据
      // this.allLoaded = true // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded() // 刷新节点
    },
    loadData () {
      this.getList(this.cur)
    },
    changeMessage (param) {
      if (this.cur === param) {
        return false
      }
      this.cur = param
      this.getList(this.cur)
    },
    goback () {
      this.$router.go(-1)
    },
    GoHome () {
      this.$router.push('/wap/index')
    },
    /** 展示详情 */
    GoMessageDetails (item) {
      this.detailObject = item
      this.modal.show(this)
    },
    /** 隐藏详情 */
    modalHide () {
      this.modal.hide(this)
    },
    getList (param) {
      // 视讯跟电子直接跳出，不需要进入下一步
      if (param === 'live') {
        return
      }
      if (param === 'electronic') {
        return
      }
      let option = ''
      let versionList = {}
      if (param === 'lottery') {
        option = 'gamemsg'
        versionList = window.indexMain.versionFun('cpAnnouncementVersionData', 'cpAnnouncementVersionKey')
      } else if (param === 'sports') {
        option = 'sportGameMsg'
        versionList = window.indexMain.versionFun('sportAnnouncementVersionData', 'sportAnnouncementVersionKey')
      } else if (param === 'electronic') {
        option = 'electronicGameMsg'
        versionList = window.indexMain.versionFun('electronAnnouncementVersionData', 'electronAnnouncementVersionKey')
      } else if (param === 'live') {
        option = 'videoGameMsg'
        versionList = window.indexMain.versionFun('videoAnnouncementVersionData', 'videoAnnouncementVersionKey')
      }
      let parmaData = {msgType: option, list: versionList, 'loading': 'pass'}
      this.$store.dispatch(types.GAMEMESSAGE_ACTION, parmaData).then(res => {
        if (option === 'gamemsg') { // 彩票公告
          this.$set(this.$store.state.message, 'cpAnnouncementList', res.data.gameMessageList)
        } else if (option === 'videoGameMsg') { // 视讯公告
          this.$set(this.$store.state.message, 'videoAnnouncementList', res.data.gameMessageList)
        } else if (option === 'sportGameMsg') { // 体育公告
          this.$set(this.$store.state.message, 'sportAnnouncementList', res.data.gameMessageList)
        } else if (option === 'electronicGameMsg') { // 电子公告
          this.$set(this.$store.state.message, 'electronAnnouncementList', res.data.gameMessageList)
        }
      })
    }
  },
  created () {
    this.modal = new Modal()
    this.modal.init(this)
    this.getList('lottery') // 默认查询彩票公告
  }
}
</script>
<style>
.mint-loadmore-top .mint-spinner-fading-circle, .mint-loadmore-bottom .mint-spinner-fading-circle {
    margin-left: 45%;
}
</style>
