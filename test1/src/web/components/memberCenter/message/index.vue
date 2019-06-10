<template>
  <div class="yo-page-body">
    <div class="header yo-home-nav">
      <div class="center">
        <div class="hea-menu hea-left">
          <a href="javascript:;" @click="goback()"><i class="yo-icon icon-arrows-left"></i></a>
        </div>
        <div class="header-text titile">
          <h1>消息记录 <span v-if="$store.state.home.isOffLine">(未连接)</span></h1>
        </div>
        <div class="hea-user hea-right">
          <a href="javascript:;" @click="GoHome()"><i class="yo-icon icon-home"></i></a>
        </div>
      </div>
    </div>
    <div class="tab-nav stripedMenu fixationNav">
      <ul class="navigation newRecordUl">
        <li :class="{'active': cur === 'msg'}" @click="changeMessage('msg')">
          <a href="javascript:;">个人消息</a>
        </li>
        <li :class="{'active': cur === 'hotNews'}" @click="changeMessage('hotNews')">
          <a href="javascript:;">最新消息</a>
        </li>
        <li :class="{'active': cur === 'hotHistory'}" @click="changeMessage('hotHistory')">
          <a href="javascript:;">历史消息</a>
        </li>
      </ul>
    </div>
    <div class="centerBox mainCenterTwo">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded"
                   ref="loadmore" @top-status-change="handleTopChange">
        <dl class="messaList">
          <dd v-show="cur === 'msg'" :key="'msg_' + index" v-for="(item, index) in msg" @click="GoMessageDetails('msg', item)">
            <p class="item-note item-time msg-time">{{item.createDateTime || item.sendDateTime}}</p>
            <h3 class="recordTitle" :class="{ 'red' : !item.isRead }">{{item.gbkSubject | subContentMsg}}</h3>
            <p>{{item.gbkContent | subContentMsg}}</p>
          </dd>
          <dd v-show="cur === 'hotNews'" :key="'howNewList_' + index" v-for="(item, index) in hotNewList"
              @click="GoMessageDetails('hotNew', item)">
            <h3 class="recordTitle">{{item.title}}</h3>
            <p>{{item.gbkContent | subContentMsg }}</p>
            <span class="item-note item-time">{{item.createDateTime}}</span>
          </dd>
          <dd v-show="cur === 'hotHistory'" :key="'hotHistory_' + index" v-for="(item, index) in hotHistory"
              @click="GoMessageDetails('hotHistory', item)">
            <h3 class="recordTitle">{{item.title}}</h3>
            <p>{{item.gbkContent | subContentMsg}}</p>
            <span class="item-note item-time">{{item.createDateTime}}</span>
          </dd>
          <dd v-show="cur === 'msg' && msg.length >= 5" style="height:60px;">
          </dd>
          <dd v-show="cur === 'hotNews' && hotNewList.length >= 5" style="height:60px;">
          </dd>
          <dd v-show="cur === 'hotHistory' && hotHistory.length >= 5" style="height:60px;">
          </dd>
        </dl>

        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
              <i class="yo-icon icon-load-top"></i>
              <em>松开刷新....</em>
          </span>
          <mt-spinner color="#585252" :type="3" v-show="topStatus === 'loading'" ></mt-spinner>
        </div>
      </mt-loadmore>
    </div>

    <div class="floatPages" v-if="modalFlag" :class="modalOptions" modal>
      <div class=" header yo-home-nav floatheader">
        <div class="center">
          <div class="header-text titile">
            <i class="yo-icon icon-arrows-left" @click="modalHide()"></i>
            <h1>消息详情</h1>
          </div>
        </div>
      </div>
      <div class="wrapper indexCenter2">
        <div class="yo-pad10">
          <div class="messDetails f14">
            <h1>{{ modalContent.title }}</h1>
            <div class="news-time ng-binding">{{ modalContent.time }}</div>
            <div class="yo-font-message">{{ modalContent.txt }}</div>
          </div>
        </div>
      </div>
      <div class="yo-anniu-message" v-if="cur === 'msg'">
        <!--<a href="javascript:;" class="button" @click="modalHide()">关闭</a>-->
        <a href="javascript:;" class="button" @click="msgRemove()">删除</a>
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
        cur: 'hotNews',
        topStatus: '',
        modalContent: {},
        allLoaded: true,
        modalOptions: '',
        modalFlag: false
      }
    },
    mounted () {
      this.modal = new Modal()
      this.modal.init(this)
      // this.$store.dispatch('gameMessage.action', {msgType: 'msg'}).then(res => {
      //  console.info(res)是
      // }) // 重新获取首页信息
    },
    computed: {
      hotNewList () {
        let newHotNews = []
        let hotNews = this.$store.state.message.hotNews || []
        for (let o of hotNews) {
          if (o && o.gbkContent !== undefined && o.gbkContent !== '') {
            newHotNews.push(o)
          }
        }
        return newHotNews
      },
      msg () {
        let newMsg = []
        let msg = this.$store.state.message.msg || []
        for (let o of msg) {
          if (o && o.gbkSubject !== undefined && o.gbkSubject !== '' && o.gbkContent !== undefined && o.gbkContent !== '') {
            newMsg.push(o)
          }
        }
        return newMsg
      },
      hotHistory () {
        let newHotHistory = []
        let hotHistory = this.$store.state.message.hotHistory || []
        for (let o of hotHistory) {
          if (o && o.gbkContent !== undefined && o.gbkContent !== '') {
            newHotHistory.push(o)
          }
        }
        return newHotHistory
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
      getList (param) {
        this.$store.dispatch(types.GAMEMESSAGE_ACTION, {msgType: param, loading: 'pass'}).then(res => {
          // this.$store.state.message[param] = []
          // this.$store.state.message[param] = res.data['memberMessageList']
          // GPO-2636 BWT1 A02个人信息手机版显示问题 数据更新不及时，有时还会存在读取到上个会员的信息
          this.$set(this.$store.state.message, param, res.data['memberMessageList'])
          console.log(this.cur, 222222)
        })
      },
      modalShow (item) {
        this.$set(this.modalContent, 'original', item)
        this.$set(this.modalContent, 'title', item.gbkSubject)
        this.$set(this.modalContent, 'txt', item.gbkContent)
        this.$set(this.modalContent, 'time', item.createDateTime ? item.createDateTime : item.sendDateTime)
        this.modal.show(this)
      },
      modalHide () {
        this.modalFlag = false
        // this.modal.hide(this)
      },
      changeMessage (param, pass = null) {
        if (this.cur === param && !pass) {
          return false
        }
        this.$set(this, 'cur', param)
        this.getList(this.cur)
      },
      goback () {
        this.$router.go(-1)
      },
      GoHome () {
        this.$router.push('/wap/index')
      },
      GoMessageDetails (type, item) {
        this.modalFlag = true
        this.modalShow(item)
        // todo 读取消息执行方法
        if (type === 'msg') this.msgRead(item)
      },
      msgRemove () {
        let $this = this
        console.info(this.modalContent, 'current item1232132132')
        window.layer.confirm('确定删除?', () => {
          this.$store.dispatch(types.GAMEMESSAGE_UP, {opType: 'delete', msgId: $this.modalContent.original.id}).then(res => {
            console.info(res, 'msg 123')
            window.layer.msgWarn('删除成功!', function () {
              window.layer.close()
              $this.modalHide()
            })
            setTimeout(function () {
              $this.changeMessage('msg', '$GET')
            }, 200)
          })
        })
      },
      msgRead (item) { // 个人消息读取
        console.info(item, 'read msg ')
        if (item.isRead) return false
        var $this = this
        this.$store.dispatch(types.GAMEMESSAGE_UP, {opType: 'update', msgId: item.id, loading: 'pass'}).then(res => {
          console.info(res, 'msg 123')
          setTimeout(function () {
            $this.changeMessage('msg', '$GET')
          }, 300)
        })
      }
    },
    created () {
      this.getList('hotNews') // 默认查询最新消息
    }
  }
</script>
<style>
  .mint-loadmore-top .mint-spinner-fading-circle {
    margin-left: 45%;
  }
</style>

