import Vue from 'vue'
import {Dialog, Loading, Button, Breadcrumb, BreadcrumbItem, Container, Aside, Form, FormItem, Select, Option, Input, DatePicker, Table, TableColumn, Pagination} from 'element-ui'
// 按需引入的ElmentUI组件
Vue.use(Dialog)// 弹框
Vue.use(Loading)// 加载
Vue.use(Button)// 按钮
Vue.use(Breadcrumb)// Bread导航
Vue.use(BreadcrumbItem)// Bread导航
Vue.use(Container)// ui组件
Vue.use(Aside)// ui组件
Vue.use(Form) // 表单组件
Vue.use(FormItem) // 表单组件
Vue.use(Select) // 表单组件
Vue.use(Option) // 表单组件
Vue.use(Input) // 表单组件
Vue.use(DatePicker)// 日期弹框
Vue.use(Table) // 表格
Vue.use(TableColumn) // 表格
Vue.use(Pagination)// 分页
window.$Loading = Loading
