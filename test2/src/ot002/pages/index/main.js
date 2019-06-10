import 'element-ui/lib/theme-chalk/index.css'
import '@s/assets/components/index.less'
import '@/assets/css/style.css'
import Vue from 'vue'
import {Loading, Carousel, CarouselItem, DatePicker, Button, Input} from 'element-ui'
// 按需引入的ElmentUI组件
Vue.use(Carousel)
Vue.use(Loading)
Vue.use(CarouselItem)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Input)
window.$Loading = Loading
