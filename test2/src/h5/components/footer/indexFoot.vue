<template>
    <div class="public-footer">
        <!-- 首页页脚 -->
        <div class="index-footer">
            <ul>
                <li>
                    <a href="javascript:void(0);" class='default-color' @click="jumpUrl('wap/index')" :style='{color:$route.path==="/wap/index"? "#FC8253":""}'>
                        <i class="yo-icon icon-recommend"></i>
                        <span>推荐</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" @click="jumpUrl('wap/game')" :style='{color:$route.path==="/wap/game"? "#FC8253":""}'>
                        <i class="yo-icon icon-game"></i>
                        <span>游戏</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" @click="jumpUrl('wap/promotion')" :style='{color:$route.path==="/wap/promotion"? "#FC8253":""}'>
                        <i class="yo-icon icon-promotion"></i>
                        <span>优惠</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" @click="jumpUrl('wap/basicsInfo')" :style='{color:$route.path==="/wap/basicsInfo"? "#FC8253":""}'>
                        <i class="yo-icon icon-my"  id="msgCount" >
                          <img src="/resource/share/RESOURCE_VERSION/imgs/red-dotH5.png" v-if="msgCount > 0">
                        </i>
                        <span>我的</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      msgCount: state => state.h5Home.msgCount // 未读消息条数
    })
  },
  methods: {
    jumpUrl (url) {
      this.$store.state.h5Home.isfloatPage = false
      this.$router.push({
        path: '/' + url
      })
    }
  }
}
</script>

