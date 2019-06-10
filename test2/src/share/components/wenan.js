import { mapState } from 'vuex'
// contactForm 联络我们 表单组件 全局注册
let wenan = {
  name: 'wenan',
  data () {
    return {
      curIndex: 0 // 一个栏目下面多个，默认展示第一个。
    }
  },
  mounted () {
    console.log(this.getCurSection, 'curSection')
    console.log(this.getArticleListArr, 'getArticleListArr')
  },
  computed: {
    // 获取当前栏目
    getCurSection () {
      // 预览返回
      if (this.isPreview) {
        return this.curSection
      } else {
        let _curSection = {}
        // 循环文案
        for (let i = 0; i < this.articleListArr.length; i++) {
          // 获取栏目内容
          let _section = this.articleListArr[i].section
          // 判断等于当前的栏目
          if (this.getCurKey === _section.stationKey) {
            // 获取当前栏目是否开启表单
            _curSection = _section
          }
        }
        return _curSection
      }
    },
    // 获取当前栏目key
    getCurKey () {
      // 如果是预览，取当前key
      if (this.isPreview) {
        return this.curKey
      } else {
        // 如果是上传，取路由传过来的key
        let _curKey = this.$route.query.curKey || ''
        if (_curKey) {
          return _curKey
        } else {
          // 如果路由也没有传key，直接刷新空路由的话，有数据情况下，默认取第一个。
          if (this.articleListArr.length) {
            _curKey = this.articleListArr[0].section.stationKey
          }
          return _curKey
        }
      }
    },
    // 不管是预览还是上传之后的文案，统一使用此方法，获取是否显示表单。
    getContact () {
      // 预览返回
      if (this.isPreview) {
        return this.showContact
      } else {
        let _showContact = 0
        // 循环文案
        for (let i = 0; i < this.articleListArr.length; i++) {
          // 获取栏目内容
          let _section = this.articleListArr[i].section
          // 判断等于当前的栏目
          if (this.getCurKey === _section.stationKey) {
            // 获取当前栏目是否开启表单
            _showContact = this.articleListArr[i].articleDoc.contact
            this.$store.state.shareApi.pageMark = this.articleListArr[i].articleDoc.pageMark
          }
        }
        // 判断是否开启，1 开启，其它 未开启
        return _showContact === 1
      }
    },
    // 不管是预览还是上传之后的文案，统一使用此方法，获取文案内容。
    getArticleListArr () {
      // 预览返回
      if (this.isPreview && this.curKey.indexOf('SYWA') > -1) {
        return this.getLoadArticle
      } else {
        let _Arr = []
        // 循环文案
        for (let i = 0; i < this.articleListArr.length; i++) {
          // 获取栏目内容
          let _section = this.articleListArr[i].section
          // 获取文案内容
          let _edocDetailsList = this.articleListArr[i].edocDetailsList
          // 判断等于当前的栏目
          if (this.getCurKey === _section.stationKey) {
            for (let j = 0; j < _edocDetailsList.length; j++) {
              // 合并内容
              _edocDetailsList[j] = { ..._edocDetailsList[j], ..._section }
            }
            _Arr = _edocDetailsList
          }
        }
        // 返回当前文案内容
        return _Arr
      }
    },
    // 返回当前预览的栏目
    curSection () {
      if (this.loadArticle && this.loadArticle.section) {
        return this.loadArticle.section
      }
      return ''
    },
    // 预览时当前的key
    curKey () {
      if (this.curSection) {
        return this.curSection.stationKey
      }
      return ''
    },
    // 预览时是否显示表单
    showContact () {
      if (this.loadArticle && this.loadArticle.articleDoc) {
        return this.loadArticle.articleDoc.contact
      }
      return ''
    },
    // 获取预览时的文案
    getLoadArticle () {
      if (this.loadArticle) {
        // 当前文案数据
        let _section = this.loadArticle.section
        // 当前文案内容数组
        let _edocDetailsList = this.loadArticle.edocDetailsList
        for (let i = 0; i < _edocDetailsList.length; i++) {
        // 合并栏目key和栏目名称到每个优惠活动中
          _edocDetailsList[i] = { ..._edocDetailsList[i], ..._section }
        }
        return _edocDetailsList
      }
      return ''
    },
    ...mapState({
      isPreview: state => state.shareApi.isPreview === 1, // 是否是预览
      staticDomain: state => state.shareApi.staticDomain, // 静态资源地址
      fastDfsUrl: state => state.shareApi.fastDfsUrl, // 静态资源地址
      articleListArr: state => state.shareApi.homeArticle, // 上传之后的底部文案
      loadArticle: state => state.shareApi.loadArticle, // 预览时底部文案返回的数据
      pageMark: state => state.shareApi.pageMark // 预览时底部文案返回的数据
    })
  },
  methods: {
  },
  watch: {
    // 监听路由变化
    $route: {
      handler: function (val) {
        // 重置数据 & 清理数据
        this.curIndex = 0
      },
      immediate: true,
      deep: true
    },
    // 监听key值变化
    getCurKey: {
      handler: function () {
        this.curIndex = 0
        window.$('html,body').animate({
          scrollTop: 0
        }, 500)
      },
      immediate: true,
      deep: true
    }
  }
}
export default wenan
