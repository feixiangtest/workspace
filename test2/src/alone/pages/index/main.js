import Vue from 'vue'
import { Loading, Button, Menu, MenuItem, Submenu, Breadcrumb, BreadcrumbItem, Collapse, CollapseItem, Pagination } from 'element-ui'
// 按需引入的ElmentUI组件
// Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Pagination)
window.$Loading = Loading
