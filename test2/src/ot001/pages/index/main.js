import 'element-ui/lib/theme-chalk/index.css'
import '@s/assets/components/index.less'
import Vue from 'vue'
import {Button, Input, Loading, DatePicker} from 'element-ui'

// 按需引入的ElmentUI组件
Vue.use(Loading)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Input)
window.$Loading = Loading
