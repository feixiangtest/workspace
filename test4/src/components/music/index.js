import MusicComponents from './Music.vue'

// 自定义全局组件
const MusicComponent = {
  install: function (Vue) {
    Vue.component('MusicComponent', MusicComponents)
  }
}

export default MusicComponent
