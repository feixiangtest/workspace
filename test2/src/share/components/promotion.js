import { mapState } from 'vuex'
import * as types from '@s/store/promotion/type'
let promotion = {
  name: 'promotion',
  data () {
    return {
      cur: '',
      curKeyIndex: 0,
      curSectionkey: '',
      allPromotion: '' // 如果是需要所有优惠要包括其它优惠，此属性要传值过来。
    }
  },
  computed: {
    // 获取数据
    activitylist () {
      if (this.isPreview && this.loadArticle && this.loadArticle.section.stationKey.indexOf('YHHD') > -1) {
        // 当前优惠栏目数据
        let _section = this.loadArticle.section
        // 当前优惠活动内容数组
        let _photoDocList = this.loadArticle.photoDocList
        for (let i = 0; i < _photoDocList.length; i++) {
        // 合并栏目key和栏目名称到每个优惠活动中
          _photoDocList[i] = { ..._photoDocList[i], ..._section }
        }
        console.log(_photoDocList)
        return _photoDocList
      } else {
        return this.promotionList
      }
    },
    // 获取编辑的栏目
    sectionList () {
      if (this.isPreview) {
        return this.SectionList2
      } else {
        return this.sectionList1
      }
    },
    ...mapState({
      isPreview: state => state.shareApi.isPreview === 1, // 是否是预览
      staticDomain: state => state.shareApi.staticDomain, // 静态资源地址
      fastDfsUrl: state => state.shareApi.fastDfsUrl, // 静态资源地址
      loadSectionkey: state => state.shareApi.loadSectionkey, // 预览的栏目key
      sectionList1: state => state.promotion.sectionListArr, // 后台编辑的有栏目
      SectionList2: state => state.shareApi.sectionListArr, // 预览时获取栏目
      promotionList: state => state.promotion.promotionListArr, // 上传之后的优惠活动数据以数组形式返回
      loadArticle: state => state.shareApi.loadArticle // 预览时优惠活动数据以数组形式返回
    })
  },
  mounted () {
    if (!this.isPreview) {
      // 上传之后的所有优惠
      this.$store.dispatch(types.GETPROMOTIONLIST_ACTION, {})
    }
  },
  methods: {
    // 获取展示的优惠活动
    getActivity (item) {
      // 预览的时候
      if (this.isPreview) {
        this.curSectionkey = this.loadSectionkey
        this.allPromotion = ''
        return true
      } else if (!this.isPreview && this.curKeyIndex === 0) { // 多栏目初次进来
      /**
       * 使用说明：
       * 1:如果是多栏目的，并且需要所有优惠包括其它优惠的，在自己的优惠活动组件里面定义allPromotion的值，可以定义为key值,即ID。
       * 2:另外一种情况是后台有所有优惠的栏目，但是又需要包括其它的，做法和上面一样，循环栏目的时候，从第二个循环，所有这个可以页面写死。
       * 3:curKeyIndex 等于0的时候是刚进入页面时。
       */
        if (this.allPromotion) {
          return true
        } else {
          this.curSectionkey = this.sectionList[0].stationKey // 默认选中第一个
          if (this.curSectionkey === 'GG_YHHD') { // 如果是公共优惠，默认展示所有
            return true
          }
          return this.curSectionkey === item.stationKey
        }
      } else if (!this.isPreview && this.curKeyIndex) { // 多栏目点击时走这里
      /**
       * 当后台只有一个栏目时，并且是放到公共的里面，key=GG_YHHD,或者
       * 当所有优惠不是在后台编辑时，只需要单独在点击时，把allPromotion设置为有值
       */
        if (this.allPromotion) {
          return true
        } else {
          if (this.curSectionkey === 'GG_YHHD') { // 如果是公共优惠，默认展示所有
            return true
          }
          return this.curSectionkey === item.stationKey
        }
      }
    },
    // 点击优惠内容展示方法。
    handleActive (index) {
      window.otUtils.handleActive(this, index)
    }
  },
  watch: {
    $route: {
      handler: function (val) {
        this.$store.commit(types.CLEARDATA_MUTATION)
      },
      immediate: true,
      deep: true
    }
  }
}
export default promotion
