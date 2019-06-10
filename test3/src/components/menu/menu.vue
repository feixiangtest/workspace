<template>
    <div class="left-menu">
        <h1 class="yow" @click="jumpUrl('m/index')">
            <div class="menu-logo float-l" v-if="mobAgtLoginLogo && mobAgtLoginLogo.cpicSim">
                <img :src="fastDfsUrl + mobAgtLoginLogo.cpicSim" v-if="mobAgtLoginLogo && mobAgtLoginLogo.cpicSim">
            </div>
          <div class="menu-logo float-l" v-else>
            <img src="../../assets/img/home/menu-logo.png" alt="">
          </div>
            <span>首页</span>
            <i class="ic-right yo-icon icon-next"></i>
        </h1>
        <ul class="side-menu">
            <li v-if="menuList.indexOf('代理返水转出')>-1">
                <a href="javascript:void(0);" @click="jumpUrl('m/agentReturnOut')">
                    <i class="ic-left yo-icon icon-rollout"></i>代理返水转出
                </a>
            </li>
        </ul>
        <ul class="side-menu">
            <li v-if="menuList.indexOf('账号管理')>-1">
                <!-- account -->
                <a href="javascript:void(0);" @click='unfold()'>
                    <i class="ic-left yo-icon icon-account2"></i>账号管理<i id="next" class="ic-right yo-icon icon-next"></i>
                </a>
                <ul class="child-menu" v-if="showChild">
                    <li v-if="menuList.indexOf('基本资料')>-1">
                        <a href="javascript:void(0);" @click="jumpUrl('m/account/basicInfo')">基本资料</a>
                    </li>
                    <li v-if="menuList.indexOf('代理')>-1">
                        <a href="javascript:void(0);" @click="jumpUrl('m/account/agent/0')">代理</a>
                    </li>
                    <li v-if="menuList.indexOf('会员')>-1">
                        <a href="javascript:void(0);" @click="jumpUrl('m/account/membership/0')">会员</a>
                    </li>
                </ul>
            </li>
            <li v-if="menuList.indexOf('现金流查询')>-1">
                <a href="javascript:void(0);" @click="jumpUrl('m/cash/queryCashStream')">
                    <i class="ic-left yo-icon icon-cash-flow"></i>现金流查询
                </a>
            </li>
            <li v-if="menuList.indexOf('会员余额存入')>-1">
                <a href="javascript:void(0);" @click="jumpUrl('m/cash')">
                    <i class="ic-left yo-icon icon-deposit"></i>会员余额存入
                </a>
            </li>
            <li v-if="menuList.indexOf('代理返水查询')>-1">
                <a href="javascript:void(0);" @click="jumpUrl('m/queryRebates')">
                    <i class="ic-left yo-icon icon-backwater"></i>代理返水查询
                </a>
            </li>
            <li v-if="menuList.indexOf('报表管理')>-1">
                <a href="javascript:void(0);" @click="jumpUrl('m/reportSearch')">
                    <i class="ic-left yo-icon icon-report"></i>报表管理
                </a>
            </li>
        </ul>
        <ul class="side-menu" v-if="menuList.indexOf('公告/信息')>-1">
            <li>
                <a href="javascript:void(0);" @click="jumpUrl('m/announcement')">
                    <i class="ic-left yo-icon icon-notice"></i>公告管理
                    <!-- <i class="ic-right yo-icon zz-icon-dot"></i> -->
                </a>
            </li>
            <!-- <li>
                    <a href="javascript:void(0);" @click="jumpUrl('m/childAccountList')">
                        <i class="ic-left yo-icon icon-bypass-account"></i>子账号
                    </a>
                </li> -->
        </ul>
        <ul class="side-menu">
            <li>
                <a href="javascript:void(0);" @click="onlineService">
                    <i class="ic-left yo-icon icon-online"></i>在线客服
                </a>
            </li>
            <li>
                <a class="link-txt" href="javascript:void(0);" @click="logout()">
                    <i class="ic-left yo-icon icon-exit link-txt"></i>退出登录
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import * as types from '../../store/home/type'
    import * as statusCode from '../../utils/status_const'
    export default {
      data () {
        return {
          showChild: false, // 二级菜单
          current: true,
          menuList: [], // 后端返回的权限菜单列表，和下面手机端所有菜单列表求交集，然后就是可以显示的菜单
          allMenuList: [ // 前端定义好的可显示的所有菜单列表
            {
              cash: '会员余额存入'
            },
            {
              agentReturnOut: '代理返水转出'
            },
            {
              basicInfo: '基本资料'
            },
            {
              agent: '代理'
            },
            {
              membership: '会员'
            },
            {
              queryCashStream: '现金流查询'
            },
            {
              queryRebates: '代理返水查询'
            },
            {
              reportSearch: '报表管理'
            },
            {
              announcement: '公告/信息'
            }
          ]
        }
      },
      computed: {
        ...mapState({
          fastDfsUrl: state => state.home.fastDfsUrl,
          mobAgtLoginLogo: state => state.home.mobAgtLoginLogo
        })
      },
      created () {
        // 将没权限访问的菜单列表放到state.home.hideMenuList里面，然后在app.vue里面监控，如果这个值有变化，那么访问路由的时候不让其访问
        this.$store.dispatch(types.MENU_ACTION).then((res) => {
          this.addMenuList(res.data) // 将后端菜单数据都放到一个数组里，方便下面进行比较
          this.allMenuList.filter((v) => {
            if (this.menuList.indexOf(v[Object.keys(v)[0]]) === -1) { // 如果前端的菜单在后端列表中没有，那么就是不能访问的菜单
              this.$store.state.home.hideMenuList.push(Object.keys(v)[0])
            }
          })
          // console.log(this.menuList, 'this.menuList')
          // console.log(this.$store.state.home.hideMenuList, 'this.$store.state.home.hideMenuList')
        })
      },
      methods: {
        addMenuList (data) {
          for (let i = 0; i < data.length; i++) {
            this.menuList.push(data[i].title)
            if (data[i].children.length > 0) {
              this.addMenuList(data[i].children)
            }
            if (data[i].thirdChildren.length > 0) {
              this.addMenuList(data[i].thirdChildren)
            }
          }
        },
        unfold () {
          let cur = this.current
          let next = window.$('#next')
          if (cur) {
            this.showChild = true
            this.current = false
            next.addClass('yo-rotation')
          } else {
            this.showChild = false
            this.current = true
            next.removeClass('yo-rotation')
          }
        },
        jumpUrl (url) {
          // 清空会员选择数据
          this.$store.state.member.chooseMember = null
          this.$store.state.member.mnyCodeQuantitySet = null
          this.$store.state.member.memberMoney = 0
          this.$store.state.member.xtoken = ''

          // 清空现金流查询条件
          if (url === 'm/cash/queryCashStream') {
            delete sessionStorage.checkedAll
            delete sessionStorage.listItem
            delete sessionStorage.tradeTypes
            this.$store.state.queryCashStream.rate = 6
            this.$store.state.queryCashStream.valDate = '会员'
            this.$store.state.queryCashStream.startDate = ''
            this.$store.state.queryCashStream.endDate = ''
          }

          if (url === 'm/queryRebates') {
            delete sessionStorage.rebateParam
            delete sessionStorage.selectedlist
          }
          window.indexMain.closeMuseUI()
          this.$store.state.home.path = url
          this.$router.push({
            path: '/' + url
          })
        },
        // 在线客服
        onlineService () {
          window.indexMain.closeMuseUI()
          window.indexMain.openOnlineService()
        },
        // 登出功能
        logout () {
          window.indexMain.closeMuseUI()
          window.layer.confirm('是否确认登出', () => {
            this.$store.dispatch(types.LOGOUT_ACTION).then(res => {
              if (res.code === statusCode.statusConst.SUCCESS) {
                delete localStorage.getAgentNotice
                delete localStorage.getRepairNotice
                window.router.push('/m/login')
              }
            })
          })
        }
      }
    }
</script>

