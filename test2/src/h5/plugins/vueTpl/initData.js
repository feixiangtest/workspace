/**
 *  默认加载数据 vue
 */
let initData = {
  mounted () {
    this.initData ? this.initData() : ''
  }
}
export default initData
