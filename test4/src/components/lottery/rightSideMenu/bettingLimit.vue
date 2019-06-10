<template>
	<div id="bettingLimit" class="yoPage">
    <div class="yoHeader">
        <div class="center">
            <div class="heaLeft" @click="goBack()">
                <i class="icon ion-ios-arrow-back"></i>
            </div>
            <div class="title headerItem">投注限额</div>
            <div class="heaRight" @click="openLotteryTypes()">
                <span style="font-size: 17px;">彩种</span>
            </div>
        </div>
    </div>
    <!--导航栏开始-->
    <div class="yoHeaNav">
      <div class="forthwith-receipts-nav">
        <span style="width:30%">玩法</span>
        <span style="width:30%;border-left: 0">单项(号)限额</span>
        <span style="width:20%;border-left: 0">单注限额</span>
        <span style="width:20%;border-left: 0">最低下注</span>
      </div>
    </div>
    <!--导航栏结束-->

		<div class="yoPageBody3" id="recordContent">
			<div class="yoScroll">
          <!--详细信息-->
          <table  class="forthwith-receipts-minute">
            <tr style="background: white" :key="index" v-for="(item , index) in bettingLimitList">
              <td style="width:30%" >
                <span @click="bettingShowInfo(item.gameName,$event)">{{tooLong(item.gameName)}}</span>
              </td>
              <td style="width:30%">
                <span @click="bettingShowInfo(item.projectMaxMoney,$event)">{{tooLong(item.projectMaxMoney)}}</span>
              </td>
              <td style="width:20%">
                <span @click="bettingShowInfo(item.singleMaxMoney,$event)">{{tooLong(item.singleMaxMoney)}}</span>
              </td>
              <td style="width:20%">
                <span @click="bettingShowInfo(item.detaiId,$event)">{{tooLong(item.minMoney)}}</span>
              </td>
            </tr>
          </table>
          <div v-if="bettingLimitList.length === 0" style="width:116px;padding-top: 34%; margin: auto;}">
            <img :src="imgUrl +'/rightSideMenu/no-record.png'">
            <p style="text-align: center; color: rgb(199, 199, 199); margin-top: 6px;">暂无记录</p>
          </div>
          <!--显示全名称-->
          <div id="showName" v-show="isShowName"></div>
			</div>
		</div>

		<!-- 彩种列表 -->
		<div v-show="showLotteryTypes" class="LotteryTypes">
			<div class="shadeIn">
				<div class="selLotteryType">
					<div>
						<span @click="closeLotteryTypes" class="cancelButton">取消</span>
					</div>
					<dl id="bettingLotteryList">
						<dt :key="item + i" v-for="(item,i) in lotteryList" @click="searchData(item)" :class="selectedLotteryId === item.lotteryId ? 'isSelected' : ''">
								<span>{{item.lotteryName}}</span>
						</dt>
					</dl>
				</div>
			</div>
		</div>

		<loading></loading>
	</div>
</template>
<script>
import * as type from '../../../store/bettingLimit/type'
import * as statusCode from '../../../utils/status_const'
import loading from '../../loading'
export default {
  data () {
    return {
      currentItem: null, // 需要展示的注单详情对象
      selectedLotteryId: null,
      showLotteryTypes: false, // 是否展示彩种
      isShowName: false // 控制显示不全的信息显示
    }
  },
  methods: {
// 返回
    goBack () {
      this.$store.state.site.nowPosition = 0
      this.$router.go(-1)
      scrollTo(0, 0)
    },
    searchData (lottery) {
      this.closeLotteryTypes()
      let lotteryId = null
      let statusCodes = statusCode
      if (this.$route.query.lotteryId) {
        lotteryId = parseInt(this.$route.query.lotteryId)
      }
      if (lottery) {
        lotteryId = lottery.lotteryId
        this.$route.query.lotteryId = lottery.lotteryId
      }
      console.log(statusCodes + '   statusCode')
      this.selectedLotteryId = lotteryId
      this.$store.state.site.showBetLoading = true
      this.$store.dispatch(type.BETTING_LIMIT_ACTION, { lotteryId: lotteryId }).then(res => {
        console.log(res + '  res')
        if (res && res.status === statusCodes.statusConst.FAILURE) {
          this.$store.state.site.showBetLoading = false
          window.layer.msgWarn(res.msg)
          return false
        } else {
          this.$store.state.site.showBetLoading = false
          if (res && res.data.result) {
            this.$store.state.bettingLimit.bettingLimitList = res.data.result.detaiList
          }
          // 记录列表滚动回顶部
          this.$nextTick(() => {
            document.getElementById('recordContent').scrollTop = 0
          })
        }
      })
    },
    // 打开彩种列表
    openLotteryTypes () {
      this.$set(this, 'showLotteryTypes', true)
      // this.showLotteryTypes = true
      this.isShowName = false
      let height = 0
      if (this.selectedLotteryId) { // 选择有具体彩种
        for (let index in this.lotteryList) {
          if (this.selectedLotteryId === this.lotteryList[index].lotteryId) {
            height = 42 * index - 84
            break
          }
        }
      }
      // 禁止背景滑动
      window.$('.yoPage #recordContent').css('position', 'fixed')
      // 滚动到指定彩种
      this.$nextTick(() => {
        document.getElementById('bettingLotteryList').scrollTop = height
      })
    },
    // 关闭彩种列表
    closeLotteryTypes () {
      this.$set(this, 'showLotteryTypes', false)
      // this.showLotteryTypes = false
       // 彩种列表关闭，页面恢复背景滑动
      window.$('.yoPage #recordContent').css('position', 'static')
    },
    // 点击显示全名
    bettingShowInfo (item, event) {
      let $showName = window.$('#showName')
      let idx = window.$(event.target).parent('td').index()
      // console.log(window.$(event.target).parent('td').index())
      if (this.currentItem === event.target || !item || item.toString().length <= 6) {
        this.isShowName = false
        this.currentItem = null
      } else {
        this.isShowName = true
        $showName.html(item)
        if (idx === 3) {
          $showName.css({top: event.target.offsetParent.offsetTop + 80 + 'px', left: window.innerWidth - $showName.width() - 25})
        } else {
          $showName.css({top: event.target.offsetParent.offsetTop + 100 + 'px', left: (idx + 1) * 25 + '%'})
        }
        this.currentItem = event.target
      }
    },
    // 超过 6 位的时候，显示前6位 + ...
    tooLong (str) {
      let resultStr = null
      if (!str) {
        resultStr = ''
      } else {
        resultStr = str.toString().length > 6 ? str.toString().slice(0, 6) + '...' : str
      }
      return resultStr
    }
  },
  components: {
    loading
  },
  computed: {
    bettingLimitList () {
      return this.$store.state.bettingLimit.bettingLimitList
    },
    showBetLoading () {
      return this.$store.state.site.showBetLoading
    },
    lotteryList () {
      let list = []
      for (let index in this.$store.state.home.lotteryList) {
        this.$store.state.home.lotteryList[index].lotteryType.forEach(lottery => {
          list.push(lottery)
        })
      }
      return list
    },
    imgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  mounted () { // 不依赖 init 接口 没有依赖数据
    this.searchData()
  }
}
</script>
