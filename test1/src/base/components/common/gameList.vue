<template>
  <!--公共的游戏列表组件-->
  <dl :class="dlClass||''" v-if="!$store.state.home.showLoading"> <!--v-if gpo-5689 网速很慢时，电子列表页切换平台，建议加一个加载动作-->
    <dd :id="'gameList_' + index" :key="'gameList_' + index" :class="ddClass||''" v-for="(item, index) in data"
        @click="typeof gameClick === 'function' ? gameClick(item, index) : dftGameClick(item)"
        v-finger:long-tap="longTap.bind(this, item)" v-if="typeof itemIf === 'function' ? itemIf(item, index) : true">
      <a href="javascript:;">
        <!--type=='1' 试用账号-->
        <i v-if="noStatusIcon === false && type === '1' && item.isFree === 1" class="yo-Image Image-gamefree"></i>
        <!--type=='0' 正式账号或非登陆，type=='2' 测试账号-->
        <i v-if="noStatusIcon === false && (type ==='0' || type ==='2') && (item.isHot === 1 || item.isHot === 2)" class="yo-Image"
           :class="{'Image-hot': item.isHot === 1, 'Image-fire': item.isHot === 2}"></i>
        <!--收藏的图标-->
        <i v-if="noFavofiteIcon === false && item.isFavofite" class="yo-icon icon-love"></i>
        <div :class="imgDivClass||''">
          <img :src="(imgUrlPrefix || '') + (getImgSuffix(item.modelImgUrl) || '')">
        </div>
        <span>{{item.modelName}}</span>
      </a>
    </dd>
  </dl>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  // 从父组件传入的值
  props: {
    data: Array, // 游戏列表的数据
    dlClass: String, // dl标签的class
    ddClass: String, // dd标签的class
    imgDivClass: String, // 图片的父div标签的class
    noStatusIcon: Boolean, // 是否不支持状态图标，如：试玩、火爆、热门，true代表不支持，默认支持
    noFavofiteIcon: Boolean, // 是否不支持收藏图标，true代表不支持，默认支持
    imgUrlPrefix: String, // 游戏封面图url的前缀
    itemIf: Function, // 每个游戏显示的条件，默认显示（true）
    gameClick: Function // 自定义的游戏点击事件，不配置走默认点击行为dftGameClick
  },
  methods: {
    // 游戏点击事件
    dftGameClick (item) {
      window.indexMain.gameClick(this, item)
    },
    // 游戏长按事件
    longTap (item, event) {
      window.indexMain.longTap(this, item, event)
    },
    // 动态判断是否加后缀
    getImgSuffix (url) {
      if (url && url.match(/(\.jpg$)|(\.png$)|(\.gif$)|(\.bmp$)/)) {
        return url
      } else {
        return url + '.png'
      }
    }
  },
  computed: {
    /**
     * 后端传入值为0 和 1,2
     * 1 试用账号  0 正式账号或非登陆  2 测试账号
     */
    type () {
      return this.$store.state.home.type
    }
  }
}
</script>
