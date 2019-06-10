<template>
<div>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item :title="item.title" :name="index" v-for='(item,index) in articleList' :key='index' v-if='articleList.length>0'>
            <div v-html='item.content'></div>
        </el-collapse-item>
        <div v-else>
          暂无数据
        </div>
    </el-collapse>
</div>
    
</template>

<script>
    import {
      mapState,
      mapActions
    } from 'vuex'
    import * as types from '@/store/help/type'
    export default {
      data () {
        return {
          articleList: [],
          activeNames: ''
        }
      },
      created () {
        this.getContentById()
      },
      watch: {
        '$route' (to, from) {
          this.getContentById()
        }
      },
      methods: {
        ...mapActions({
          getContentByIdAction: types.GETCONTENTBYID // 初始化额度转换数据
        }),
        getContentById () {
          this.activeNames = [0]
          this.$store.state.help.activeId = this.$route.params.id // 设置选中的文章条目为传过来的参数
          this.getContentByIdAction({ id: this.$route.params.id }).then(res => {
            if (res.data && res.data.articleList && res.data.articleList.length > 0) {
              this.articleList = res.data.articleList
            } else {
              this.articleList = [{ content: '暂无数据', title: '暂无数据' }]
            }
            // this.$store.state.help.breadcrumb = [res.data.categoryName]
            // if (res.data.parentName) {
            //   this.$store.state.help.breadcrumb.push(res.data.parentName)
            // }
            this.$store.state.help.breadcrumb = res.data.childCategory.map((v) => v.categoryName)
          })
        },
        handleChange (val) {

        }
      },
      computed: {
        ...mapState({
          menus: state => state.help.menus // 侧边栏按钮数据
        })
      }
    }
</script>