<template>
  <div class="yo-page-body conver">
    <div class="header yo-home-nav">
      <div class="center">
        <div class="hea-menu hea-left">
          <a href="javascript:;" @click="goback()"><i class="yo-icon icon-arrows-left"></i></a>
        </div>
        <div class="header-text titile">
          <h1>{{headTitle}}<span v-if="$store.state.home.isOffLine">(未连接)</span></h1>
        </div>
        <div class="hea-user hea-right">
          <a href="javascript:;" @click="home()"><i class="yo-icon icon-home"></i></a>
        </div>
      </div>
    </div>
    <div class="centerBox mainCenter">
      <!-- 游戏客户端主页面 -->
      <div class="depositMain onlineDraw" v-show="!showSwipe && !showEditPwdPage">
        <div class="tab-nav stripedMenu">
          <ul class="navigation newRecordUl">
            <li v-for="(game, index) in allGame" v-if="(isIOS && game['id'] === 'ptGame') || !isIOS" :class="{'active': activeId === game['id']}" @click="activing(game['id'])"><a href="javascript:;">{{game['title']}}</a></li>
          </ul>
        </div>
        <div class="payitembox">
          <dl class="paytype din-form">
            <dd v-if="activeObj.showAccount">
              <div class="item-input">
                <span class="din-title">{{activeObj.accountTitle}}</span>
                <div class="din-content">
                  <span>{{account}}</span>
                </div>
              </div>
            </dd>
            <dd v-if="activeObj.showPwd" style="margin-bottom: 5px;">
              <div class="item-input">
                <span class="din-title">{{activeObj.pwdTitle}}</span>
                <div class="din-content" v-show="account">
                  <span>{{password}}</span>
                  <div v-show="pwdVisit" @click="togglePwdVisit(false)" class="pwd-see-div">
                    <img class="pwd-see-img imgEvents" :src="commonImgUrl + '/common/in-seeing.png'" align="right">
                  </div>
                  <div v-show="!pwdVisit" @click="togglePwdVisit(true)" class="pwd-see-div">
                    <img class="pwd-see-img imgEvents" :src="commonImgUrl + '/common/in-see.png'" align="right">
                  </div>
                </div>
              </div>
            </dd>
          </dl>
        </div>
        <div class="payitembox">
          <dl class="paytype din-form">
            <dd>
              <div class="item-input">
                <span class="per-width-l">手机端操作说明</span>
                <div class="per-width-r pr10">
                  <a href="javascript:;" @click="openSwipe" class="floatR underline">点击查看</a>
                </div>
              </div>
            </dd>
            <dd>
              <div class="item-input">
                <span class="per-width-l">手机端下载地址{{activeId !== 'agGame' ? '（安卓版）' : ''}}</span>
                <div class="per-width-r pr10">
                  <a href="javascript:;" @click="clickDownload(activeId)" class="floatR underline">{{activeId === 'agGame' ? '点击前往' : '点击下载'}}</a>
                </div>
              </div>
            </dd>
          </dl>
        </div>
        <div class="yo-pad10 yo-pad-bot20" v-show="activeId !== 'agGame'">
          <button class="yo-anOne button" type="button" @click="goEditPwd">修改密码</button>
        </div>
      </div>
      <!-- 操作说明轮播图 v-show保证图片资源不反复加载-->
      <div class="din-swipe" v-show="showSwipe && !showEditPwdPage">
        <div class="swipe-full" v-if="activeId === 'ptGame'">
          <mt-swipe :auto="0" :speed="100" :show-indicators="false" @change="swipeChange" ref="swipeWrapper">
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/pt/01.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/pt/02.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/pt/03.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/pt/04.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/pt/05.png'" ></mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="swipe-full" v-if="activeId === 'mgGame'">
          <mt-swipe :auto="0" :speed="100" :show-indicators="false" @change="swipeChange" ref="swipeWrapper">
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/mg/01.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/mg/02.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/mg/03.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/mg/04.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/mg/05.png'" ></mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="swipe-full" v-if="activeId === 'agGame'">
          <mt-swipe :auto="0" :speed="100" :show-indicators="false" @change="swipeChange" ref="swipeWrapper">
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/ag/01.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/ag/02.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/ag/03.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/ag/04.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/ag/05.png'" ></mt-swipe-item>
            <mt-swipe-item><img :src="commonImgUrl + '/gameClient/ag/06.png'" ></mt-swipe-item>
          </mt-swipe>
        </div>
        <!-- 左右以及关闭按钮 -->
        <div class="swipe-btn-mask">
          <div class="swipe-btn-close" @click="closeSwipe"><img :src="commonImgUrl + '/common/close.png'" ></div>
          <div v-show="showPrevBtn" class="swipe-btn-area swipe-btn-prev" @click="goImg(-1)"><img :src="commonImgUrl + '/common/prev.png'" ></div>
          <div v-show="showNextBtn" class="swipe-btn-area swipe-btn-next" @click="goImg(1)"><img :src="commonImgUrl + '/common/next.png'" ></div>
        </div>
      </div>
      <!-- 修改密码页面 -->
      <editPwd :activeObj="activeObj" :account="account" @pwdChange="pwdChange" v-if="showEditPwdPage"></editPwd>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as memberCenterType from '@/base/store/memberCenter/type'
  import editPwd from './editPwd'
  import Swipe from 'mint-ui/lib/swipe'
  import SwipeItem from 'mint-ui/lib/swipe-item'

  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)

  let games = [{
    id: 'ptGame',
    title: 'PT电子',
    hide: false, // 是否隐藏该游戏，默认false
    showAccount: true, // 是否显示游戏账号一栏
    showPwd: true, // 是否显示游戏密码一栏
    accountTitle: 'PT账号',
    pwdTitle: 'PT密码'
  }, {
  //   id: 'mgGame',
  //   title: 'MG电子',
  //   showAccount: true, // 是否显示游戏账号一栏
  //   showPwd: true, // 是否显示游戏密码一栏
  //   accountTitle: 'MG账号',
  //   pwdTitle: 'MG密码'
  // }, {
    id: 'agGame',
    title: 'AG'
  }]
  export default {
    components: {
      editPwd
    },
    data () {
      return {
        showSwipe: false, // 是否显示操作说明
        showEditPwdPage: false, // 是否显示修改密码页面
        allGame: [], // 所有有效的游戏
        activeId: '', // 被激活游戏的ID
        activeObj: {}, // 被激活游戏的对象
        accountInfo: {}, // 账号信息数据 accountInfo: {ptGame:{account:'xxx',pwd:'',pwdVisit:false}}
        showPrevBtn: true, // 操作说明滑动组件，是否显示上一张按钮
        showNextBtn: true // 操作说明滑动组件，是否显示下一张按钮
      }
    },
    beforeCreate () {
      // 获取账户
      this.$store.dispatch(memberCenterType.GAMECLIENT_ACCOUNTINFO_ACTION, {}).then(res => {
        let accountMap = res && res.data
        if (accountMap) {
          const o = {
            'mgGame': 'mgAccountName',
            'ptGame': 'ptAccountName'
          }
          let info = {}
          for (let key in o) {
            if (accountMap[o[key]]) {
              info[key] = {
                account: accountMap[o[key]], // 账号
                pwd: '', // 密码
                pwdVisit: false // 密码是否可视
              }
            }
          }
          this.accountInfo = info
        }
      }).catch(res => {
        console.log('游戏账户信息获取失败')
      })
    },
    mounted () {
      this.initAllGame() // 初始化所有有效的游戏
      if (this.allGame.length > 0 && this.allGame[0]['id']) {
        this.activing(this.allGame[0]['id']) // 初始化激活第一个
      }
    },
    methods: {
      goback () {
        if (this.showSwipe) { // 关闭轮播图页面
          this.closeSwipe()
        } else if (this.showEditPwdPage) { // 关闭密码修改页面
          this.showEditPwdPage = false
          // 关闭密码修改页面
        } else { // 回到我的账户
          this.$router.push('/wap/memberCenter/index')
        }
      },
      home () {
        this.$router.push('/wap/index')
      },
      // 打开密码修改页面
      goEditPwd () {
        this.getAccountPwd(this.activeId).then((data) => {
          this.showEditPwdPage = true
        })
      },
      // 初始化所有有效的游戏
      initAllGame () {
        let newGames = []
        for (let o of games) {
          if (!o['hide']) {
            newGames.push(o)
          }
        }
        this.allGame = newGames
      },
      // 激活事件
      activing (id) {
        if (this.activeId === id) {
          return
        }
        this.activeId = id
        this.activeObj = this.getActiveObjById(id)
      },
      // 根据ID获取对象
      getActiveObjById (id) {
        for (let o of this.allGame) {
          if (o.id === id) {
            return o
          }
        }
      },
      // 密码是否可见的切换，false代表不可见
      togglePwdVisit (flag) {
        let activeId = this.activeId
        let o = this.accountInfo[activeId]
        if (!o) {
          return
        }
        if (!flag) {
          o['pwdVisit'] = false
        } else {
          if (o['pwd']) {
            o['pwdVisit'] = true
            return
          }
          this.getAccountPwd(activeId).then((data) => {
            o['pwdVisit'] = true
            o['pwd'] = data.password
          })
        }
      },
      getAccountPwd (activeId) {
        return new Promise((resolve, reject) => {
          const m = {
            'mgGame': 'mg',
            'ptGame': 'pt'
          }
          let param = {
            platform: m[activeId]
          }
          // 根据游戏平台查询账户密码
          this.$store.dispatch(memberCenterType.GAMECLIENT_GETACCOUNTPWD_ACTION, param).then(res => {
            let data = res && res.data
            if (data && data.success === false) {
              const gameTitle = {
                'mgGame': 'MG',
                'ptGame': 'PT'
              }
              window.layer.alert('请先额度转换至' + gameTitle[activeId] + '平台，再登录客户端游戏！')
            } else if (data && data.success === true) {
              resolve(data)
            } else {
              console.log('游戏账户密码获取失败2', res)
            }
          }).catch(res => {
            console.log('游戏账户密码获取失败1', res)
          })
        })
      },
      // 获取当前swipe对象
      getSwipe () {
        return this.$refs['swipeWrapper']
      },
      // 打开轮播图
      openSwipe () {
        this.showSwipe = true
        this.toggleSwipeBtn(this.getSwipe() && this.getSwipe().index)
      },
      // 关闭轮播图
      closeSwipe () {
        let $ref = this.getSwipe()
        if ($ref) { // 恢复第一张图片位置
          $ref.index = 0
          $ref.reInitPages()
          $ref.pages[0].style.display = 'block'
          $ref.translate($ref.pages[0], 0)
        }
        this.showSwipe = false
      },
      // 上一张/下一张切换
      goImg (index) {
        let $ref = this.getSwipe()
        if (index === 1) {
          $ref && $ref.next()
        } else {
          $ref && $ref.prev()
        }
      },
      // 轮播图左右按钮显示/隐藏控制
      toggleSwipeBtn (index) {
        if (!index && index !== 0) {
          return
        }
        let $ref = this.getSwipe()
        if (index === 0) {
          this.showPrevBtn = false
        } else {
          this.showPrevBtn = true
        }
        if ($ref) {
          if ($ref.pages.length < 2) {
            this.showPrevBtn = false
            this.showNextBtn = false
          } else if (index === $ref.pages.length - 1) {
            this.showNextBtn = false
          } else {
            this.showNextBtn = true
          }
        }
      },
      // 轮播图切换后事件
      swipeChange (index) {
        this.toggleSwipeBtn(index)
      },
      // 下载客户端
      clickDownload (activeId) {
        activeId = activeId || this.activeId
        if (activeId === 'agGame') {
          window.open('http://agmbet.com/')
        } else {
          let ua = navigator.userAgent.toLowerCase()
          if (/iphone|ipad|ipod/.test(ua)) { // ios
            window.layer.alert('暂时不支持IOS版本下载')
          } else {
            if (activeId === 'ptGame') {
              window.open('http://m.gm175788.com/download.html')
            } else if (activeId === 'mgGame') {
              window.open('http://resigner.valueactive.eu/igaminga4.apk')
            }
          }
        }
      },
      // 密码更改后的事件
      pwdChange (o) {
        let targetInfo = o && this.accountInfo[o['type']]
        if (targetInfo && targetInfo['pwd']) { // 密码被查看过之后才进行更新
          targetInfo['pwd'] = o['newPwd']
        }
        this.goback() // 回到游戏客户端页面
      }
    },
    computed: {
      commonImgUrl () {
        return this.$store.state.home.commonImgUrl
      },
      headTitle () {
        if (!this.showEditPwdPage) {
          return '游戏客户端'
        } else {
          return (this.activeObj.title || '') + '修改密码'
        }
      },
      account () {
        let o = this.accountInfo[this.activeId]
        return o && o['account']
      },
      password () {
        let o = this.accountInfo[this.activeId]
        if (!o || !o['account']) { // 必须有账户才能有密码
          return ''
        }
        if (o['pwdVisit']) {
          return o['pwd']
        } else {
          return '********' // 默认显示
        }
      },
      pwdVisit () {
        let o = this.accountInfo[this.activeId]
        return o && o['pwdVisit']
      },
      isIOS () {
        let ua = navigator.userAgent.toLowerCase()
        if (/iphone|ipad|ipod/.test(ua)) { // ios
          return true
        } else {
          return false
        }
      }
    }
  }
</script>
