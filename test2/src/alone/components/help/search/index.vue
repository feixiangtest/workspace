<template>
    <div>
        <!-- 有查到数据就显示结果 -->
        <div v-if='searchResult.length>0'>
            <!-- 面包屑头部 -->
            <div>
                <el-breadcrumb separator="" style='margin-left:-20px;width:984px;height:60px;'>
                    <el-breadcrumb-item>相关内容——{{searchData}}</el-breadcrumb-item>
                    <el-breadcrumb-item style='float:right'>查找到： {{searchResult.length}}项</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 结果一条一条的 -->
            <div style="width:942px;height:92px;border:1px solid #ebeef5;cursor:pointer;" v-for='(item,index) in curSearchResult' :key='index' @click="toUrl('question',item.currentCategory.id)">
                <div style="width:942px;height:46px;line-height:46px;background: #f7f8fa;border-bottom:1px solid #ebeef5;color: #2772ee;text-indent:20px;">
                    {{item.article.title}}
                </div>
                <div style="width:942px;height:46px;line-height:46px;text-indent:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                    {{item.article.content}}
                </div>
            </div>  
                      <!--分页  -->
                      <div class="yoPaging">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage" :page-sizes="[10, 20, 40, 50, 100]" :page-size="perval" layout="total, sizes, prev, pager, next, jumper" :total="searchResult.length">
            </el-pagination>
        </div>
        </div>
        <!-- 如果没有搜寻结果，那么展示没有匹配项 -->
        <div v-else>
            <p style='height:60px;line-height:60px;color: #999;'>您查找的 {{searchData}} 未出现任何匹配项</p>
           <h2 style='height:60px;line-height:60px;color: #999;'>您可以通过以下方法查找所需信息：</h2>
            <ul style='color: #999;'>
                <li>请确保所有词语书写正确</li>
                <li>更换搜索关键词</li>
                <li>使用更一般的搜索关键词</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
      mapState
    } from 'vuex'
    export default {
      data () {
        return {
          activeNames: ['1'],
          perval: 10, // 每页显示条数
          curPage: 1 // 当前页码
        }
      },
      created () {
      },
      methods: {
        toUrl (name, id) {
          console.log(name, id)
          this.$router.push({
            name: name,
            params: {
              id: id
            }
          })
        },
        // 改变每页显示多少条
        handleSizeChange (val) {
          this.perval = val
        },
        // 跳转当前页码
        handleCurrentChange (val) {
          this.curPage = val
        }
      },
      computed: {
        ...mapState({
          searchResult: state => state.help.searchResult,
          searchData: state => state.help.searchData
        }),
        curSearchResult () {
          return this.searchResult.slice(this.perval * (this.curPage - 1), this.perval * this.curPage)
        }
      }
    }
</script>



