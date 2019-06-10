/**
 *  默认加载数据 vue
 */
let initData = {
  mounted () {
    let id = this.$route.params.id
    this.initData(id)
    console.log('mounted******************************', id)
  }
}
export default initData
