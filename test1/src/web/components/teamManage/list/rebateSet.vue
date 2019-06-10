<template>
  <div id="rebate">
    <!--推广管理列表页-->
    <div>
      <div class="header yo-home-nav">
        <div class="center">
          <div class="hea-menu hea-left">
            <a href="javascript:;" @click="goBack(0)">
              <i class="yo-icon icon-arrows-left"></i>
            </a>
          </div>
          <div class="header-text titile">
            <h1>返点详情</h1>
          </div>
        </div>
      </div>
      <dl class="recordList" style="height:44px">
        <!--列表头部-->
        <dd class="newRecordsTitle" style="top:44px">
          <ul id="titleBet">
            <li style="width:25%">有效投注返点</li>
          </ul>
        </dd>
      </dl>
      <!--通过 innerHeight 判断 iPhone 5s 单独设置高-->
      <div class="centerBox mainCenterTwo newBettingBox">
        <div class="recordBox">
          <dl class="public-list clearfix">
            <dd class="common-item">
              <h5 class="title">
                彩票
              </h5>
              <p class="con-txt">
                <input class="small input-type1" type="number"
                       :placeholder="'最低返点 '"
                       @blur="keep2"
                       v-model="a">
                <span>%</span>
              </p>
              <p class="con-txt">
                可设置范围0-100%
              </p>
            </dd>
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
        a: 1,
        promotionData: []
      }
    },
    computed: {
      imgUrl () {
        return this.$store.state.home.commonImgUrl
      }
    },
    methods: {
      keep2 (e) {
      },
      goBack (type) { // type = 1 表示在当前页面退回平台选择页面 type = 0 表示隐藏详情页面，显示投注列表页面
      },
      // 跳转新增推广链接
      promotionAdd () {
      }
    },
    mounted () {
    }
  }
</script>
