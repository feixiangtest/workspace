<template>
    <div class="mainBox">
        <dl class="public-list clearfix">
            <!--查看详情列表-->
            <dd class="common-item">
                <h5 class="title">账号</h5>
                <p class="con-txt subText">{{account}}</p>
            </dd>
            <dd class="common-item">
                <h5 class="title">交易类型</h5>
                <p class="con-txt subText" v-html="typeName"></p>
            </dd>
            <dd class="common-item">
                <h5 class="title">金额</h5>
                <p class="con-txt subText">{{tradeLimit | moneyFilter}}</p>
            </dd>
            <dd class="common-item">
                <h5 class="title">小计</h5>
                <p class="con-txt subText">{{existingLimit | moneyFilter}}</p>
            </dd>
            <dd class="common-item">
                <h5 class="title">交易日期</h5>
                <p class="con-txt subText">{{time}}</p>
            </dd>
            <dd class="common-item">
                <h5 class="title">单号</h5>
                <p class="con-txt subText">{{code}}</p>
            </dd>
            <!--end-->
            <dd class="common-item flex-direction-co" style="margin-top: 10px;height: 106px;">
                <h5 class="title">备注</h5>
                <p class="con-txt txtarea">
                    <textarea readonly v-html="remark"></textarea>
                </p>
            </dd>
        </dl>
    </div>
</template>
<script>

export default {
  name: 'agentqueryCashStreamDetail',
  data () {
    return {
      account: '',
      typeName: '',
      tradeLimit: '',
      existingLimit: '',
      time: '',
      code: '',
      remark: ''
    }
  },
  components: {

  },
  methods: {
    initData () {
      let text = this.$route.query
      this.account = text.account
      this.typeName = text.typeName
      this.tradeLimit = text.tradeLimit
      this.existingLimit = text.existingLimit
      this.time = text.time
      this.code = text.code
      this.remark = text.remark
      console.log(this.typeName, '========')
    }
  },
  mounted () {
    this.$store.state.home.headerType = 6
    this.$store.state.home.headTitle = '详情'
    this.initData()
  }
}
</script>
