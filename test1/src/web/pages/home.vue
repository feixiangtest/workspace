<template>
  <div class="yo-page-body">
    <!--头部公共菜单 begin-->
    <commonHeader></commonHeader>
    <!--中间内容区域-->
    <router-view></router-view>
    <!--底部公共菜单-->
    <commonFooter></commonFooter>
    <!-- 展示两侧菜单的时候点击非菜单部分返回主页面 -->
    <div class="mengceng leftMengceng" v-show="$store.state.site.nowPosition === maxPosition"
          @click="$store.state.site.nowPosition = 0"></div>
    <div class="mengceng rightMengceng" v-show="$store.state.site.nowPosition === minPosition"
          @click="$store.state.site.nowPosition = 0"></div>
    <!-- OG 抽抽 -->
    <!--<div class="PPggzj" v-if="showPPggzjbox && $store.state.home.isOpenAc === 'Y' && routerName === 'index'">
      <div class="PPpor">
        <a class="PPclose" href="javascript:;" @click="hidePPggzjbox()"> </a>
        <a href="https://luckydraw.oriental-game.com" target="_blank">
          <img src="/static/RESOURCE_VERSION/local/img/active/og-lucky-draw.png" class="jiangjin">
        </a>
      </div>
    </div>-->
    <!-- PP电子过关斩将锦标赛 -->
    <!--<div class="PPggzj" v-if="showPPggzjbox && $store.state.home.isOpenAc === 'Y' && routerName === 'index'">
      <div class="PPpor">
        <a class="PPclose" href="javascript:;" @click="hidePPggzjbox()"> </a>
        <a href="http://luckydraw.oriental-game.com/LUCKYDRAW/" target="_blank">
          <img src="static/local/img/active/og-lucky-draw.png" class="jiangjin">
        </a>
      </div>
    </div>-->

    <!--公共的弹框蒙层处理 by karl-->
    <div v-show="openOuterlayer" attr-div="openOuterlayer" class="TipsWindown">
      <div class="shadeIn" @click="openOuterlayerFunc(1)"></div>

      <!--第三方分享-->
      <div class="shareBox" v-show="outerlayerType === this.indexs.outerlayerType.share">
        <div class="shareBox-one" @click="openOuterlayerFunc(0)">
          <!-- JiaThis Button BEGIN -->
            <h4>分享到</h4>
          <div class="share-component" data-mobile-sites="qq,wechat,weibo,qzone" data-wechat-qrcode-helper='请分享二维码给周遭朋友一同游戏'></div>
        </div>
        <div class="shareBoxBot"  >
          <a class="yo-cancel" @click="openOuterlayerFunc(1)" >取消</a>
        </div>
      </div>

      <!--游戏公告-->
      <div class="gameNotBox" v-show="gameNoticeItem.titleSim && outerlayerType === this.indexs.outerlayerType.announcement" @click="gameNoticeClick()">
          <div class="gameNotice">
              <div class="noticeTitle">{{gameNoticeItem.titleSim}}</div>
              <div class="noticeCenter">
                  <div v-html="gameNoticeItem.contextSim"></div>
              </div>
              <div class="noticeBut" @click="openOuterlayerFunc(1)">
                  <span class="yo-anTwo">确定</span>
              </div>
          </div>
      </div>

      <!--最新消息-->
      <div class="MsgBox" v-show="outerlayerType === this.indexs.outerlayerType.openGonggao">
        <div class="popMessages" >
          <div class="messTop"><span><i class="yo-icon icon-smallbell"></i>最新消息</span><a href="javascript:;" @click="openOuterlayerFunc(1)"><i class="yo-icon icon-pop-close"></i></a></div>
          <div class="messCent">
            <div class="messContent">
              <div v-if="this.announcementList.length >= 1">
                {{announcementList[0].gbkContent}}</div>
            </div>
          </div>
          <div class="messBot"><span></span></div>
        </div>
      </div>
      <!-- MG幸运之龙 擂台赛 弹框 -->

       <!--<div v-show="outerlayerType === this.indexs.outerlayerType.openMgLtsTk" class="MgLtsTk">
        <div class="MgLtsBox">
          <a class="MgLtsClose" href="javascript:;"  @click="openOuterlayerFunc(1)"></a>
          <a v-if="$store.state.home.hasActivityAlias === 'N'" class="MgButJoin" href="javascript:;" @click="joinMgActive()">我要参加</a>
          <a v-if="$store.state.home.hasActivityAlias !== 'N'" class="MgButJoin" href="https://www.lc88drt.com/tournaments/site/39">查看排名</a>
          <p v-if="$store.state.home.tpsActivityAlias">别名：{{$store.state.home.tpsActivityAlias}}</p>
        </div>
      </div> -->
      <!-- MG幸运之龙 擂台赛 弹框 -->

       <div v-show="outerlayerType === this.indexs.outerlayerType.openMgLtsTk" class="MgLtsTk">
        <div class="MgLtsBox">
          <a class="MgLtsClose" href="javascript:;"  @click="openOuterlayerFunc(1)">×</a>
          <a v-if="$store.state.home.hasActivityAlias === 'N'" class="MgButJoin join" href="javascript:;" @click="joinMgActive()">我要参加</a>
          <a v-if="$store.state.home.hasActivityAlias !== 'N'" class="MgButJoin sort" href="https://www.lc88drt.com/tournaments/site/40">查看排名</a>
          <p v-if="$store.state.home.tpsActivityAlias && $store.state.home.hasActivityAlias !== 'N' " >别名：{{$store.state.home.tpsActivityAlias}}</p>
        </div>
      </div>
    </div>
    <!-- 首次进入APP弹出引导页 -->
    <div v-if="firstMain !== '1'" class="guidePage" :key="index" v-for="(item, index) in mobIndexWapDirectionsList" :style="currentIndex === index ? 'display:block' : 'display:none'" @click="openGuidePage(index)">
        <div class="viewpager">
            <img v-if="staticDomain && item.cpicSim" :src= "staticDomain + item.cpicSim" >
            <img v-if="!staticDomain && item.cpicSim" :src= "item.cpicSim" >
        </div>
        <div class="skipButtom" @click.stop="openGuidePage(1000)">
            <img :src="commonImgUrl + '/tg.png'">
        </div>
    </div>
  </div>
</template>

<script>

import commonHeader from '@/base/components/header/commonHeader'
import commonFooter from '@/base/components/footer/commonFooter'

// import * as touchUtil from 'utils/touchUtil'
import { pagezh } from '@/base/config/zh'
import * as index from '@/base/config/index'
import * as types from '@/base/store/home/type'
import * as statusCode from '@/base/utils/status_const'

export default {
  data () {
    return {
      lastPosition: 0, // 移动后的初始位置
      minPosition: -275,
      maxPosition: 275,
      nowX: 0,
      allowMove: true, // 两个手指操作屏幕不允许侧滑
      displayLeft: false,
      displayRigth: false,
      indexs: index,
      firstMain: localStorage.getItem('firstMain'),
      currentIndex: 0,
      mgAtiveShow: false, // mg活动图展示
      ogAtiveShow: false, // mg活动图展示
      activityDetail: false
    }
  },
  components: {
    commonHeader,
    commonFooter
  },
  computed: {
    /** 后端传入值为0 和 1 */
    type () {
      return this.$store.state.home.type
    },
    showMgXYZLbox () {
      return this.$store.state.home.showMgXYZLbox
    },
    showPPggzjbox () { // 替换为 OG
      return this.$store.state.home.showPPggzjbox
    },
    isLogin () {
      return this.$store.state.home.isLogin
    },
    routerName () {
      return window.router.app._route.name
    },
    staticDomain () {
      return this.$store.state.home.staticDomain
    },
    menuLeftZIndex () {
      return this.$store.state.site.menuLeftZIndex
    },
    menuRightZIndex () {
      return this.$store.state.site.menuRightZIndex
    },
    nowPosition () {
      return this.$store.state.site.nowPosition
    },
    path () {
      return this.$store.state.home.path
    },
    title () {
      return this.$store.state.home.title
    },
    /**
     * 控制统一弹出框参数
     */
    openOuterlayer () {
      var result = this.$store.state.site.openOuterlayer
      window.indexMain.appHiddenOverflow(!!result)
      return result
    },
    /**
     * 弹出框类型，用于判断弹出的是广告还是分享等
     */
    outerlayerType () {
      return this.$store.state.site.outerlayerType
    },
    /**
     * 获取首次引导图信息
    */
    mobIndexWapDirectionsList () {
      if (this.$store.state.preView.guideMap.articleVo) {
        this.firstMain = 0
        localStorage.setItem('firstMain', 0)
        return this.$store.state.preView.guideMap.articleVo.photoDocList
      } else {
        return this.$store.state.home.mobIndexWapDirectionsList
      }
    },
    /** 获取登陆成功后游戏广告 */
    gameNoticeItem () {
      let item = {}
      if (this.isPreview === 1 && this.$store.state.preView.popupAds.articleVo !== undefined) {
        let list = this.$store.state.preView.popupAds.articleVo
        if (list.section && list.section.sectionType === 'mobAd') {
          item = list.photoDocList[0]
        }
      } else {
        if (this.mobAd !== undefined) {
          for (let i = 0; i < this.mobAd.length; i++) {
            item = this.mobAd[0]
          }
        }
      }
      return item
    },
    mobAd () {
      return this.$store.state.home.mobAd
    },
    isPreview () {
      return this.$store.state.preView.isPreview
    },
    announcementList () {
      return this.$store.state.home.announcementList
    },
    commonImgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  mounted () {
    let shareUrl = location.href.split('').reverse().join('')
    let forwardUrl = 'http://distptop1.com/' // 中转站域名
    window.$('.share-component').attr('data-wechat-url', forwardUrl + '?_=' + shareUrl)
    let {name: path} = this.$route
    this.$store.state.home.title = pagezh[path]
    this.$store.state.home.path = path
    // 第三方库需要的配置
    window.jiathis_config = {
      url: document.URL,
      summary: document.title,
      title: document.title + document.URL,
      shortUrl: false,
      hideMore: false
    }
  },
  methods: {
    showActivityDetail () {
      this.mgAtiveShow = false
      this.$store.state.site.openOuterlayer = true
      this.$store.state.site.outerlayerType = index.outerlayerType.openMgLtsTk
    },
    joinMgActive () {
      if (!this.isLogin) {
        this.$router.push('/wap/login')
        this.$store.state.site.openOuterlayer = false
        return
      }
      if (Number(this.type) === 1) {
        window.layer.msgWarn('试玩账号不支持此活动，请注册正式账号再登录！')
        return false
      } else if (Number(window.store.state.home.type) === 2) {
        window.layer.msgWarn('测试账号不支持此活动，请注册正式账号再登录！')
        return false
      } else {
        this.$store.dispatch(types.LOGIN_ACTIVITY_ACTION, {'key': 'mg'}).then(res => {
          if (res.status === statusCode.statusConst.SUCCESS) {
            window.location.href = 'https://www.lc88drt.com/tournaments/site/40'
          }
        })
      }
    },
    // 打开分享
    openOuterlayerFunc (i) {
      if (i === 1) {
        window.$('.wechat-qrcode').css('display', 'none')
        this.$store.state.site.openOuterlayer = false
      }
    },
    /**
     * 引导图点击事件，最终让引导图隐藏
    */
    openGuidePage (index) {
      this.currentIndex = index + 1
      if (this.currentIndex >= this.mobIndexWapDirectionsList.length) {
        localStorage.setItem('firstMain', 1)
        this.firstMain = 1
      }
    },
    gameNoticeClick () {
      this.$store.state.home.gameNoticeFlag = false
      this.$store.state.preView.popupAds.disPlay = 0
    },
    hideMgXYZLbox () {
      this.$store.state.home.showMgXYZLbox = false
    },
    hidePPggzjbox () {
      this.$store.state.home.showPPggzjbox = false
    },
    openMgJoonIn () {
      this.mgAtiveShow = !this.mgAtiveShow
      this.ogAtiveShow = !this.ogAtiveShow
    }
  }
}
</script>
