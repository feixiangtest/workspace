let preview = {
  mounted () {
    /** 预览案件请求统一在此调用
     * isPreview： 5    是头部logo
     * isPreview： 6    是登录logo
     * */
    let _query = this.$route.query
    let _isPreview = _query.isPreview // 预览参数
    let _articleId = _query.articleId // 文案ID
    if (_isPreview && _articleId) {
      console.log('_isPreview', _isPreview)
      this.$store.dispatch('preview.logo', {
        isPreview: _isPreview,
        articleId: _articleId
      }).then(res => {

      })
    }
  }
}
export default preview
