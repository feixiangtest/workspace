<template>
    <div class="float-pages" v-if="isfloatPage" :class="floatBgcolor">

        <!-- 浮动详情页-导航头部 -->
        <div class="public-header hea-default-col">
            <div class="header-content">
                <div class="head-left" @click="close()">
                    <i class="yo-icon icon-back"></i>
                </div>
                <div class="head-title">
                    <span>{{floatTitle}}</span>
                </div>
                <div class="head-right">
                    <!-- <i class="yo-icon"></i> -->
                </div>
            </div>
        </div>

        <!-- 浮动详情页-中心内容区 -->
        <div class="details-main main-box float-main">

            <!-- 活动详情页面 -->
            <div class="promo-main yow-content" v-if="floatPageType === 1">
                <div class="pro-main-titile promo-item">
                    <!-- 设置了标题图片 -->
                    <div class="pro-img-title" v-if="promotion.mouseOffPicSim"
                        :style="'background-image: url(' + fastDfsUrl+'/'+promotion.mouseOffPicSim + ')'">
                    </div>
                    <!-- 标题小图片 -->
                    <div class="promo-title" v-else>
                        <span class="iconImg">
                            <img :src="commonImgUrl + '/promotion/activity-ico'+ promotion.titleDescribeSim + '.png'" alt="">
                        </span>
                        <h4>{{promotion.titleSim}}</h4>
                    </div>
                </div>
                <!-- 内容：文字 -->
                <div class="pro-main-cent" v-html="promotion.contextSim" v-if="promotion.picStatusSim == 0"></div>
                <!-- 内容：图片 -->
                <div class="promoConten" v-if="promotion.picStatusSim == 1">
                    <img style="width:100%" :src="fastDfsUrl+'\/'+promotion.cpicSim" alt=""/>
                </div>

            </div>

            <!-- 往来记录-详情 -->
            <div class="promo-main" v-if="floatPageType === 3">
                <div class="yo-form-item">
                    <h5 class="title">交易时间</h5>
                    <p class="con-txt"><span>{{ historyDetail.createDateTimeStr }}</span></p>
                </div>
                <div class="yo-form-item">
                    <h5 class="title">交易类别</h5>
                    <p class="con-txt" v-if="historyDetail.objectVo.strObj === ''" ><span>{{ historyDetail.tradeType | numShowFilter }}</span></p>
                    <p class="con-txt" v-if="historyDetail.objectVo.strObj !== ''" ><span>{{ historyDetail.tradeType | numShowFilter }}-{{historyDetail.objectVo.strObj}}</span></p>
                </div>
                <div class="yo-form-item">
                    <h5 class="title">交易额度</h5>
                    <p class="con-txt"><span>{{historyDetail.tradeLimit | moneyFilter}}</span></p>
                </div>
                <div class="yo-form-item">
                    <h5 class="title">现有额度</h5>
                    <p class="con-txt"><span>{{historyDetail.existingLimit | moneyFilter}}</span></p>
                </div>
                <div class="yo-form-item">
                    <h5 class="title">注单明细</h5>
                    <p class="con-txt"><span>{{historyDetail.bettingCode}}</span></p>
                </div>
                <div class="yo-form-item" style="height:auto; padding-top:10px; padding-bottom:10px;">
                    <h5 class="title">备注</h5>
                    <p class="con-txt  secure-cen text-right">
                        <span v-if="historyDetail.tradeType==='3'||historyDetail.tradeType==='4'||historyDetail.tradeType==='6'
                              ||historyDetail.tradeType==='7'||historyDetail.tradeType==='53'||historyDetail.tradeType==='54'||
                              historyDetail.tradeType==='55'||historyDetail.tradeType==='56'||historyDetail.tradeType==='91' || historyDetail.tradeType==='95' ||
                              historyDetail.tradeType==='146'">
                            {{historyDetail.remark}}
                        </span>
                        <span v-if="historyDetail.tradeType==='37'||historyDetail.tradeType==='38'||historyDetail.tradeType==='19'
                              ||historyDetail.tradeType==='22'||historyDetail.tradeType==='23'||historyDetail.tradeType==='24'||historyDetail.tradeType==='25'
                              ||historyDetail.tradeType==='26'||historyDetail.tradeType==='27'||historyDetail.tradeType==='28'||historyDetail.tradeType==='31'
                              ||historyDetail.tradeType==='32'||historyDetail.tradeType==='33'||historyDetail.tradeType==='35'||historyDetail.tradeType==='36'
                              ||historyDetail.tradeType==='34'||historyDetail.tradeType==='47'||historyDetail.tradeType==='46'||historyDetail.tradeType==='57'
                              ||historyDetail.tradeType==='58'||historyDetail.tradeType==='88'||historyDetail.tradeType==='89'">
                            {{historyDetail.detailInfo }}
                        </span>
                        <span v-if="historyDetail.tradeType=='5'||historyDetail.tradeType=='21'"> {{historyDetail.remark}} </span>
                    </p>
                </div>
            </div>


            <!-- 消息详情 -->
            <div class="message-detail" v-if="floatPageType === 5">
                <!-- 个人消息详情 -->
                <div class="personmsg" v-if="detailType === 1">
                    <div class="message-header">
                        <h2>{{messageDetail.gbkSubject}}</h2>
                        <span class="time">{{messageDetail.sendDateTime}}</span>
                    </div>
                    <div class="content">
                        <p v-html="messageDetail.gbkContent"></p>
                    </div>
                    <div class="btn-wrap btn-bg-white"><div class="btn one-btn" @click="deleteMsg(messageDetail.id)">删除</div></div>
                </div>
                <!-- 最新消息、历史消息详情 -->
                <div v-if="detailType === 2 || detailType === 3">
                    <div class="message-header">
                        <span class="time">{{messageDetail.createDateTime}}</span>
                    </div>
                    <div class="content">
                        <p v-html="messageDetail.gbkContent"></p>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import * as types from '@/store/h5Home/type.js'
export default {
  props: {
    isfloatPage: Boolean, // 显示浮动单页
    // 显示类型 1=优惠活动详情，2=游戏客户端
    floatPageType: '',
    floatTitle: String, // 浮动单页的标题
    floatBgcolor: '', // 浮动单页-背景色
    messageDetail: '', // 消息详情
    detailType: '', // 消息类型 1个人消息、2最新消息、3历史消息
    historyDetail: {},
    sequence: ''
  },
  computed: {
    ...mapState({
      promotion: state => state.h5Home.promotion, // 显示 浮动内容
      commonImgUrl: state => state.h5Home.h5img, // H5静态地址
      fastDfsUrl: state => state.h5Home.fastDfsUrl // 静态资源地址
    })
  },
  filters: {
    numShowFilter (v) {
      return window.common.const.tradeType[v]
    }
  },
  methods: {
    close () {
      this.$store.state.h5Home.isfloatPage = false
      this.$store.state.h5Home.floatPageType = ''
    },
    // 删除个人消息
    deleteMsg (id) {
      window.layer.confirm('您是否确定删除该条信息？', () => this.$store.dispatch(types.H5UPDATEPERSONMSG, { msgId: id, opType: 'delete' }).then(res => {
        if (res.status === '0' || res.status === 0) {
          window.layer.msgWarn('删除成功', () => {
            this.$store.state.h5Home.currMsgList.splice(this.sequence, 1)
            this.$store.state.h5Home.isfloatPage = false
            window.layer.close()
          })
        }
      }))
    }
  },
  mounted () {

  },
  destroyed () {
    this.close()
  }
}
</script>
