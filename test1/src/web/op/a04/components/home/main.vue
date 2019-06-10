<template>
  <div class="wrapper">
    <!--公共的轮播图，公告-->
    <commonBanner></commonBanner>
    <!--快速导航-->
    <quickNav></quickNav>
    <div class="indexGame" style="margin-top:10px;">
      <!--lineIndex行下标-->
      <div :key="'gameLine_' + lineIndex" v-for="(lineItem, lineIndex) in displayGameList">
        <dl class="homeGame">
            <dd :id="'gameList_' + index" :key="'gameList_' + index" v-for="(item, index) in lineItem.level1"
                :class="{'cur':(currentLineIndex===lineIndex&&currentColumnIndex===index)}" @click="gameClick(item, getBigTypeKey(item), index, lineIndex)">
              <a href="javascript:;" v-finger:long-tap="longTap.bind(this, item)">
                <!--type=='1' 试用账号-->
                <i v-if="type === '1' && item.isFree === 1" class="yo-Image" :class="{'Image-gamefree': item.isFree === 1}"></i>
                <!--type=='0' 正式账号或非登陆，type=='2' 测试账号-->
                <i v-if="(type ==='0' || type ==='2') && (item.isHot === 1 || item.isHot === 2)" class="yo-Image"
                   :class="{'Image-hot': item.isHot === 1, 'Image-fire': item.isHot === 2}"></i>
                <!--收藏的图标-->
                <i v-if="item.isFavofite" class="yo-icon" :class="{'icon-love': item.isFavofite}"></i>
                <div class="gameImg">
                  <img v-if="staticDomain" :src="staticDomain + item.modelImgUrl">
                  <img v-if="!staticDomain" :src="item.modelImgUrl">
                </div>
                <span>{{item.modelName}}</span>
              </a>
            </dd>
        </dl>
        <!--第二层（子类游戏）展示-->
        <div class="homeGameBox" :id="'smallTypeGameScope_'+lineIndex" v-if="currentLineIndex === lineIndex">
          <dl class="homeGame">
            <dd :key="'smallType_' + index" v-for="(item, index) in smallTypeGameList" @click="gameClick2(item)">
              <a href="javascript:;" class="disable-user-behavior">
                <div class="gameImg">
                  <img v-if="staticDomain" :src="staticDomain + item.modelImgUrl">
                  <img v-if="!staticDomain" :src="item.modelImgUrl">
                </div>
                <span>{{item.modelName}}</span>
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <!--底部分享、电脑版等公共菜单-->
    <fotMenu></fotMenu>
  </div>
</template>

<script>
import commonBanner from '@/base/components/header/commonBanner'
import fotMenu from '@/base/components/footer/fotMenu'
import quickNav from '@/web/components/home/quickNav'
// import * as statusCode from 'utils/status_const'
// TODO img 需要区分静态资源路径和非静态资源路径 staticdomain, 登陆后的公告有瑕疵，等版本号控制弄好后就不在这样获取 by vito
export default {
  data () {
    return {
      firstMain: localStorage.getItem('firstMain'),
      currentIndex: 0,
      bigTypeGameConst: {}, // 父类常量
      smallTypeGameList: [], // 当前子类的数据
      showLineNum: 3, // 每一行最多显示的游戏数量
      currentColumnIndex: -1, // 当前被点击的第一层（或父类）游戏的下标
      currentLineIndex: -1 // 当前第二层（子类）显示的行下标
    }
  },
  props: {
    message: String
  },
  components: {
    commonBanner,
    fotMenu,
    quickNav
  },
  computed: {
    staticDomain () {
      return this.$store.state.home.staticDomain
    },
    /** 后端传入值为0 和 1,2 */
    type () {
      return this.$store.state.home.type
    },
    homeGameList () {
      return this.$store.state.home.homeGameList
    },
    /**
     * 获取首页显示的游戏数据
     * 数据类型：
     * [{
     *    level1: [], // 3条数据（this.showLineNum），首页显示的第一行数据（this.gameList的3条）
     *    level2: [] // 1条数据，默认隐藏，待点击显示的大类数据，展示对应的所有子类数据
     * },{
     *    level1: [], // 3条数据（this.showLineNum），首页显示的第二行数据（this.gameList的3条）
     *    level2: [] // 1条数据，默认隐藏，待点击显示的大类数据，展示对应的所有子类数据
     * }, ...]
     */
    displayGameList () {
      let list = []
      let o
      let gameList = this.gameList
      for (let i = 0; i < gameList.length; i++) {
        if (i % this.showLineNum === 0) {
          if (o) {
            list.push(o)
          }
          o = {
            level1: [],
            level2: [{}]
          }
        }
        o.level1.push(gameList[i])
      }
      if (o) {
        list.push(o)
      }
      return list
    },
    /**
     * 获取首页列表
     */
    gameList () {
      return this.$store.state.home.gameList
    }
  },
  methods: {
    /**
     * 第一层游戏点击
     * @param item
     * @param bigTypeKey 是否点击的为父类（有子类元素的为父类），如果是，则返回对应的变量key
     * @param columnIndex 列下标
     * @param lineIndex 行下标
     * 行、列下标组合构成唯一
     */
    gameClick (item, bigTypeKey, columnIndex, lineIndex) {
      // 是否点击的为父类（有子类元素的为父类）
      if (bigTypeKey && this.homeGameList[bigTypeKey]) {
        this.bigTypeClick(bigTypeKey, columnIndex, lineIndex)
      } else {
        this.currentColumnIndex = columnIndex // 第一层点击的元素下标
        this.currentLineIndex = -1 // 隐藏第二层（子类）展示的内容
        window.indexMain.gameClick(this, item)
      }
    },
    // 子类游戏点击
    gameClick2 (item) {
      window.indexMain.gameClick(this, item)
    },
    /**
     * 长按保存我的最爱
    */
    longTap (item, event) {
      window.indexMain.longTap(this, item, event)
    },
    /**
     * 点击游戏父类，显示/隐藏第二层（子类）展示的内容
     * @param bigTypeKey 是否点击的为父类（有子类元素的为父类），如果是，则返回对应的变量key
     * @param columnIndex 列下标
     * @param lineIndex 行下标
     * 行、列下标组合构成唯一
     */
    bigTypeClick (bigTypeKey, columnIndex, lineIndex) {
      // 该次点击的对象，是否与当前显示的为同一个
      if (this.isShowSmallTypeGame(columnIndex, lineIndex)) {
        this.currentLineIndex = -1 // 隐藏第二层（子类）展示的内容
      } else {
        this.smallTypeGameList = this.homeGameList[bigTypeKey] // 设置子类游戏数据
        this.currentLineIndex = lineIndex // 显示
      }
      this.currentColumnIndex = columnIndex
    },
    /**
     * 该次点击的对象，是否与当前显示的为同一个
     * @param columnIndex 列下标
     * @param lineIndex 行下标
     * 行、列下标组合构成唯一
     */
    isShowSmallTypeGame (columnIndex, lineIndex) {
      return this.currentColumnIndex === columnIndex && this.currentLineIndex === lineIndex
    },
    getBigTypeKey (item) {
      return this.bigTypeGameConst[item.modelName]
    },
    initBigTypeGameConst () {
      this.bigTypeGameConst = {
        '真人视讯': 'liveGameList',
        '真人娱乐': 'liveGameList',
        '电子游戏': 'eGamesList',
        '电子游艺': 'eGamesList',
        'VG棋牌': 'qpList',
        '体育': 'sportList',
        '体育赛事': 'sportList',
        '捕鱼游戏': 'byGamesList'
      }
    }
  },
  mounted () {
    // 设置标题
    window.indexMain.setTitle()
    this.initBigTypeGameConst()
  }
}
</script>
