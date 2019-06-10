<template>
    <div class="mainBox">
        <dl class="public-list clearfix">
            <dd class="common-item">
                <h5 class="title">平台</h5>
                <p class="con-txt subText">
                   {{platformDetails.platformChnName}}
                </p>
            </dd>
            <dd class="common-item" >
                <h5 class="title">注单量</h5>
                <p class="con-txt subText">
                   {{platformDetails.bettingNum}}
                </p>
            </dd>
            <dd class="common-item">
                <h5 class="title">下注金额</h5>
                <p class="con-txt subText">
                  {{platformDetails.bettingAmount.toFixed(2)}}
                </p>
            </dd>
            <dd class="common-item">
                <h5 class="title">有效投注额</h5>
                <p class="con-txt subText">

                   <span v-if='$route.query.accountName || platformDetails.platformChnName==="总计" || platformDetails.bettingAmount<=0'>
                     {{platformDetails.realBettingAmount.toFixed(2)}}
                    </span>
                   <span v-else class="link-txt" @click="toBetDetail">
                     {{platformDetails.realBettingAmount.toFixed(2)}}
                    </span>

                   <!-- <span v-if='$route.query.accountName ||item.bettingAmount<=0' >{{item.bettingAmount}}</span>
                  <span class="link-txt" @click="toBetDetail(item)" v-else>{{item.bettingAmount}}</span> -->
                </p>
            </dd>
            <dd class="common-item">
                <h5 class="title">盈亏</h5>
                <p :class='platformDetails.profitLoss >= 0 ? "subText" : "warn-txt"'>
                   {{platformDetails.profitLoss.toFixed(2)}}
                </p>
            </dd>
        </dl>
    </div>
</template>
<script>
    export default {
      data () {
        return {
          platformDetails: {} // 盈亏数据
        }
      },
      methods: {
        // 有效投注额详情查看
        toBetDetail () {
          let query = this.$route.query
          if (Number(this.$route.query.typeName) === 1) {
            query.nextQueryPage = 5
            this.$router.push({
              path: '/m/userBetDetails',
              query: query
            })
          } else {
            query.nextQueryPage = 4
            this.$router.push({
              path: '/m/betDetails',
              query: query
            })
          }
        }
    
      },
      created () {
        this.$store.state.home.headerType = 9
        this.platformDetails = JSON.parse(sessionStorage.getItem('platformDetails'))
        this.$store.state.home.headTitle = this.platformDetails.platformChnName
      }
    }
</script>

