<template>
  <div>
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
            <dl class="secondForm" v-if="$store.state.transactionRecord.detailStatus !== 0">
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">交易时间</span>
                        <span class="itemNeir">2017-11-6 20:22:25</span>
                    </div> 
                </dd>
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">交易类别</span>
                        <span class="itemNeir">API存入</span>
                    </div> 
                </dd>
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">交易额度</span>
                        <span class="itemNeir">250000.00</span>
                    </div> 
                </dd>
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">现有额度</span>
                        <span class="itemNeir">250000.22</span>
                    </div> 
                </dd>
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">备注</span>
                        <span class="itemNeir">101142054486147072</span>
                    </div> 
                </dd>
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">注单明细</span>
                        <span class="itemNeir">从BWT平台转出到O...</span>
                    </div> 
                </dd>
            </dl>
            <dl class="secondForm" v-if="$store.state.transactionRecord.detailStatus === 0">
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">注单号码</span>
                        <span class="itemNeir">{{ detailData.bettingCode }}</span>
                    </div> 
                </dd>
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">下注时间</span>
                        <span class="itemNeir">{{ detailData.bettingDateStr }}</span>
                    </div> 
                </dd>
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">方式</span>
                        <span class="itemNeir">{{ detailData.project }}</span>
                    </div> 
                </dd>
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">内容</span>
                        <span class="itemNeir">
                          第{{ detailData.period | periodFilter }}期<span class="red"> {{ detailData.project }}</span> @ <span class="red"><b> {{ detailData.odds }}</b></span>
                        </span>
                    </div> 
                </dd>
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">下注金额</span>
                        <span class="itemNeir">{{ detailData.money | moneyFilter }}</span>
                    </div> 
                </dd>
                <dd>
                    <div class="formIput"> 
                        <span class="itemTxt">可赢金额</span>
                        <span class="itemNeir">{{ detailData.money * (detailData.odds - 1) | moneyFilter}}</span>
                    </div> 
                </dd>
            </dl>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    detailData () {
      return this.$store.state.transactionRecord.detailData
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
