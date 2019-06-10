<template>
  <div id="lotteryBettingHistory">
    <!--推广管理列表页-->
    <div v-show="!showDetail">
      <div class="header yo-home-nav">
        <div class="center">
          <div class="hea-menu hea-left">
            <a href="javascript:;" @click="goBack(0)">
              <i class="yo-icon icon-arrows-left"></i>
            </a>
          </div>
          <div class="header-text titile">
            <h1>推广管理</h1>
          </div>
          <div class="hea-user hea-right">
            <a class="heaRight" @click="promotionAdd()">
              <i style="font-size: 17px;">添加</i>
            </a>
          </div>
        </div>
      </div>
      <dl class="recordList" style="height:44px">
        <!--列表头部-->
        <dd class="newRecordsTitle" style="top:44px">
          <ul id="titleBet">
            <li style="width:33%">推广码</li>
            <li style="width:33%">生成时间</li>
            <li style="width:33%">状态</li>
          </ul>
        </dd>
      </dl>
      <!--通过 innerHeight 判断 iPhone 5s 单独设置高-->
      <div class="centerBox mainCenterTwo newBettingBox">
        <div class="recordBox">
          <dl class="recordList">
            <!--列表主体-->
            <dd @click="toCurrentRecordPage(item)" v-for="(item, index) in promotionData" :key="index" class="newRecordsBody">
              <ul :class="item.status == 1  ? 'historyLineThrough' : ''">
                <li class="gray first" style="width:33%">
                </li>
                <li style="width:33%">
                </li>
                <li style="width:33%">
                </li>
              </ul>
            </dd>
            <!--无数据时显示-->
            <div v-if="1 === 0" class="notDataShow">
              <img :src="imgUrl+'/no-record.png'">
              <p>暂无记录</p>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import * as types from '@/base/store/transactionRecord/type'
  // import * as statusCode from '@/base/utils/status_const'
  // import method from '@/base/utils/method'
  export default {
    data () {
      return {
        promotionData: []
      }
    },
    computed: {
      imgUrl () {
        return this.$store.state.home.commonImgUrl
      }
    },
    methods: {
      goBack (type) { // type = 1 表示在当前页面退回平台选择页面 type = 0 表示隐藏详情页面，显示投注列表页面
        if (type === 0) {
          this.$router.go(-1)
        } else if (type === 1) {
          this.showDetail = false
          this.detailData = []
        }
      },
      // 跳转新增推广链接
      promotionAdd () {
        this.$router.push('/wap/teamManage/promotionAdd')
      }
    },
    mounted () {
    }
  }
</script>
