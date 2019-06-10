<template>
  <nav class="menu" id="pageNav">
    <div class="center relativeBox">
      <ul class="clearfix">
        <li v-for='(item,index) in menuTabs' :key='index' style='cursor:pointer'>
          <a @click='jumpUrl(item.link,item.type)'>{{item.title}}</a>
          <figure v-if='item.isHot' class="hot-icon"><img src="/resource/ot002/images/hot.gif" alt=""></figure>
        </li>
      </ul>
      <div id="nav-arrow"></div>
    </div>
  </nav>
</template>
<script>
  export default {
    data () {
      return {
        menuTabs: [{
          link: '/live',
          title: '视讯直播',
          isHot: false
        },
        {
          link: 'og',
          title: 'OG视讯',
          isHot: true,
          type: 'live'
        },
        {
          link: 'ag',
          title: 'AG视讯',
          isHot: true,
          type: 'live'
        },
        {
          link: 'bb',
          title: 'BB视讯',
          isHot: false,
          type: 'live'
        },
        {
          link: 'ab',
          title: 'AB视讯',
          isHot: false,
          type: 'live'
        },
        {
          link: '/promotion',
          title: '优惠活动',
          isHot: false
        },
        {
          link: '',
          title: '在线客服',
          isHot: false,
          type: 'onlineservice'
        }
        ]
      }
    },
    mounted () {
      let $ = window.$
      let endleft = $('#nav-arrow').position().left// 获取当前arrow的偏移值，用于返回
      $('#pageNav ul>li').hover(function () {
        $('#nav-arrow').css({ 'left': $(this).position().left })
      }, function () {
        $('#nav-arrow').css({ 'left': endleft })
      })
      let header = $('.header')
      let nav = $('.menu.heaFixedBox') // 给内容页导航添加浮动定位效果
      let sc = $(document) // 得到document文档对象。
      let win = $(window) // 得到窗口对象
      win.scroll(function () {
        if (sc.scrollTop() >= 138) {
          header.addClass('page-header-fixed')
          nav.addClass('menufixed')
        } else {
          header.removeClass('page-header-fixed')
          nav.removeClass('menufixed')
        }
      })
    },
    methods: {
      // this.$store.state.shareApi.showPopLogin = true
      jumpUrl (url, type) { // 跳转函数,
        if (type === 'onlineservice') {
          this.$openChatWin()
        } else if (type === 'live') {
          this.$jumpLive(url)
        } else {
          this.$router.push({
            path: url
          })
        }
      }
    }
  }
</script>
