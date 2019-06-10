<template>
  <div id="memberMenu">
    <div class="menuCont">
      <h1>会员中心<span>PLAYERS CENTER</span></h1>
      <dl class="menuItem">
        <dd v-for='(item,index) in menuData' :key='index' :class="{activeTab:item.link.indexOf(routerName) !=-1}">
          <router-link class='linkClass' v-if='item.link' :to='item.link'>
            <i class="yo-icon" :class='item.iconName'>
              <img src="/resource/share/RESOURCE_VERSION/imgs/red-dot.png" class="redPointImg" v-if="$store.state.member.msgCount>0 && item.link.indexOf('personMsg') !=-1" />
            </i>{{item.title}}<i class="el-icon-arrow-right"></i>
          </router-link>
          <div v-else class="menuTitle">{{item.title}}</div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        menuData: [{
          title: '会员专区',
          link: '',
          iconName: ''
        },
        {
          title: '我的账户',
          link: '/center/myAccount/baseConsole',
          iconName: 'el-icon-account'
        },
        {
          title: '银行交易',
          link: '/center/bankTransaction/lineConversion',
          iconName: 'el-icon-bankInfo'
        },
        {
          title: '交易记录',
          link: '/center/tradeRecord/betRecord',
          iconName: 'el-icon-dealRecord'
        },
        {
          title: '信息公告',
          link: '',
          iconName: ''
        },
        {
          title: '最新信息',
          link: '/center/lastestInfo/lastestMsg',
          iconName: 'el-icon-trumpet'
        },
        {
          title: '个人信息',
          link: '/center/personInfo/personMsg',
          iconName: 'el-icon-messages'
        }
        ]
      }
    },
    mounted () {
      this.$store.dispatch('pcMsgCount.action').then(res => {
      })
    },
    computed: {
      routerName () {
        return this.$store.state.member.l2 // 右侧 tab 数据
      }
    }
  }
</script>
