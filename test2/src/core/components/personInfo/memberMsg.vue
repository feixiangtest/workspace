<template>
  <div class='contentBox'>
    <!-- 列表页 -->
    <div v-if="!detail">
        <!-- 表头-功能栏 -->
        <div class="tableForm clearfix">
          <el-form class="demo-form-inline floatLf">
            <el-form-item>
              <el-button @click="addNewMsg = true "><i class="el-icon-plus"></i>&nbsp;&nbsp;新增留言</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <el-table :data="memberMsgList" border class="yoMemTable">
          <el-table-column prop="sendTime" label="留言时间"></el-table-column>
          <el-table-column prop="content" label="内容" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
                  <p>{{ scope.row.status |readStatus }}</p>
            </template>
          </el-table-column>
          <el-table-column label="留言回复">
          <template slot-scope="scope">
            <!-- <p v-if='scope.row.status===2' style="color:blue;cursor:pointer;" @click='showReply(scope.row)'>查看回复</p> -->
            <p v-if='scope.row.status===2' style="cursor:pointer;" @click='showReply(scope.row)'>查看回复</p>
            <p v-else>未回复</p>
          </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="yoPaging">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pCurPage" :page-sizes="[10, 20, 50, 100]" :page-size="pPerval" layout="total, sizes, prev, pager, next, jumper" :total="allCount">
          </el-pagination>
        </div>

        <!-- 游戏类型选择弹窗 -->
        <el-dialog title="新增留言" :visible.sync="addNewMsg" width="600px" center @close="content = ''">
          <div class="popupConter">
            <el-form :label-position="labelPosition" label-width="80px">
              <el-form-item label="留言内容：">
                <el-input type="textarea" v-model="content" rows="10" resize="none" placeholder="请在此处输入不超过200字符" maxlength="200"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addMessage">确 定</el-button>
          </span>
        </el-dialog>
    </div>

    <!-- 消息详情页 -->
    <div v-if="detail" class="msgDetail">
        <div class="text-right backUp">
            <el-button @click="backUp" >返回上一级</el-button>
        </div>
        <p class="text-right"><span><i class="el-icon-time"></i>{{msgDetail.sendTime}}</span></p>
        <div class="detailCon">{{msgDetail.content}}</div>
    </div>

  </div>
</template>
<style>
.el-tooltip__popper{
  width:220px;
}
</style>
<script>
  import {
    mapActions
  } from 'vuex'
  import * as types from '@s/store/shareApi/type.js'
  import headerNav from '@/components/layout/headerNav.vue'
  export default {
    data () {
      return {
        pPerval: 10, // 每页显示条数
        pCurPage: 1, // 第几页
        addNewMsg: false, // 新增留言
        labelPosition: 'top',
        activeTab: '',
        content: '', // 新增留言的内容
        memberMsgList: [], // 消息列表
        allCount: 0,
        detail: false, // 默认消息详情不显示
        msgDetail: {}// 回复内容
      }
    },
    filters: {
      readStatus (status) { // 取状态
        return status === 0 ? '未读' : '已读'
      }
    },
    components: {
      headerNav
    },
    computed: {
      // 当前展示的个人信息数组
      curPersonalMsg () {
        return this.memberMsgList.slice(this.pPerval * (this.pCurPage - 1), this.pPerval * this.pCurPage)
      }
    },
    mounted () {
      // 获取会员留言
      this.initPersonalData()
    },
    methods: {
      ...mapActions({
        messageListAction: types.MESSAGELIST, // 获取会员留言
        addLeaveMessageAction: types.ADDLEAVEMESSAGE, // 新增留言
        getReplyAction: types.GETREPLY // 获取回复
      }),
      // 获取会员留言
      initPersonalData () {
        this.messageListAction({
          'page': this.pCurPage,
          'limit': this.pPerval
        }).then(res => {
          this.allCount = res.data.count
          this.memberMsgList = res.data.list
          for (let i = 0; i < this.memberMsgList.length; i++) {
            this.memberMsgList[i].content = this.memberMsgList[i].content.replace(/\\n/g, '\n')
          }
        })
      },
      // 新增会员留言
      addMessage () {
        if (!this.content) {
          window.layer.msgWarn('会员留言不能为空！')
          return false
        }
        this.addNewMsg = false
        this.addLeaveMessageAction({
          'content': this.content
        }).then(res => {
          this.content = ''
          window.layer.msgWarn('留言成功！')
          this.pCurPage = 1
          this.initPersonalData()
        })
      },
      // 修改已读
      showReply (msgRow) {
        this.detail = true
        this.getReplyAction({ 'id': msgRow.id }).then((res) => {
          this.msgDetail = res.data || {}
        })
      },
      // 修改展示页数
      handleSizeChange (val) {
        this.pPerval = val
        this.initPersonalData()
      },
      // 修改当前第几页
      handleCurrentChange (val) {
        this.pCurPage = val
        this.initPersonalData()
      },
      // 返回上一级
      backUp () {
        this.lastestMsgBox = true
        this.detail = false
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      }
    }
  }
</script>
