<template>
  <div class='contentBox'>
    <div v-if="personMsgBox">
        <div class="information">
          <!-- 功能条 -->
          <div class="operationBar">
            <span class="checkAll">全选</span>
            <el-button class="delBut" @click='deletePersonMsg' :disabled="disabledBtn">删除</el-button>
            <el-button class="markBut" @click='markReaded' :disabled="disabledBtn">标记已读</el-button>
          </div>

          <el-table ref="multipleTable" :data="personalMsgList" class="yoMemTable restrictFont" border
                    @selection-change="handleSelectionChange" @row-click="getDetail">
              <!-- 全选 -->
              <el-table-column type="selection" width="55"></el-table-column>
              <!-- 消息列表 -->
              <el-table-column label="">
                <template slot-scope="scope">
                  <p style='white-space:nowrap;text-overflow:ellipsis;overflow:hidden;' :style="{color:scope.row.isRead===0?'blue':'black'}">{{ scope.row.gbkSubject }}</p>
                </template>
              </el-table-column>
              <!-- 消息时间 -->
              <el-table-column label="" prop="sendDateTime" width="180"></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="yoPaging">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pCurPage"
                        :page-sizes="[10, 20, 50, 100]" :page-size="pPerval"
                        layout="total, sizes, prev, pager, next, jumper" :total="countMsg">
          </el-pagination>
        </div>
    </div>
    <!--消息详情-->
    <detail-msg :detail='detail' :detailConten='detailConten' :detailDate='detailDate' :backUp='backUp' :detailTitle='detailTitle'></detail-msg>
  </div>
</template>
<script>
  import {
    mapActions
  } from 'vuex'
  import * as types from '@s/store/shareApi/type.js'
  import detailMsg from '@/components/detailMsg/detailMsg'
  import headerNav from '@/components/layout/headerNav'

  export default {
    data () {
      return {
        selectedPersonMsg: [], // 选中的个人信息条目
        personalMsgList: [], // 消息列表展示条数
        pPerval: 10, // 每页显示条数
        pCurPage: 1,
        addNewMsg: false,
        labelPosition: 'top',
        activeTab: '',
        personMsgBox: true,
        detailDate: '', // 消息详情时间
        detailConten: '', // 消息详情内容
        detail: false, // 默认消息详情不显示
        detailTitle: '',
        countMsg: 0 // 个人消息总条数
      }
    },
    components: {
      headerNav,
      detailMsg
    },
    computed: {
      disabledBtn () {
        return this.selectedPersonMsg.length <= 0
      }
    },
    mounted () {
      // 初始化个人消息数据
      this.initPersonalData(1, this.pPerval)
    },
    methods: {
      ...mapActions({
        initPersonalMsgAction: types.INITPERSONALMSG,
        updatePersonMsgAction: types.UPDATEPERSONMSG
      }),
      // 初始化个人消息数据
      initPersonalData (pageNo, size) {
        this.initPersonalMsgAction({currentPage: pageNo, pageSize: size}).then(res => {
          this.personalMsgList = res.data.messageList
          this.countMsg = res.data.count
          if (!res.data.messageList.length && pageNo > 1) {
            this.pCurPage = this.pCurPage - 1
            this.initPersonalData(this.pCurPage, size)
          }
        })
      },
      // 删除个人信息
      deletePersonMsg () {
        let postData = {
          msgIds: this.selectedPersonMsg.map(v => v.id),
          opType: 'delete'
        }
        this.updatePersonMsgAction(postData).then(res => {
          this.toggleSelection()
          this.initPersonalData(this.pCurPage, this.pPerval)
        })
      },
      // 标记已读
      markReaded () {
        let postData = {
          msgIds: this.selectedPersonMsg.map(v => v.id),
          opType: 'update'
        }
        this.updatePersonMsgAction(postData).then(res => {
          window.layer.msgWarn(res.msg)
          this.toggleSelection()
          this.initPersonalData(this.pCurPage, this.pPerval)
        })
      },
      // 获取选择的条目
      handleSelectionChange (val) {
        this.selectedPersonMsg = val
      },
      // 改变每页显示多少条
      handleSizeChange (val) {
        this.pPerval = val
        this.initPersonalData(this.pCurPage, val)
      },
      // 跳转当前页码
      handleCurrentChange (val) {
        this.pCurPage = val
        this.initPersonalData(val, this.pPerval)
      },
      // 清除选中
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      // 获取消息列表内容
      getDetail (row) {
        this.personMsgBox = false
        this.detail = true
        this.detailDate = row.sendDateTime
        this.detailTitle = row.gbkSubject // 添加标题数据
        this.detailConten = row.gbkContent
        this.updatePersonMsgAction({ // 调用一下标记已读的方法
          msgIds: [row.id],
          opType: 'update'
        })
      },
      // 返回上一级
      backUp () {
        this.personMsgBox = true
        this.detail = false
        this.initPersonalData(this.pCurPage, this.pPerval)
      }
    }
  }
</script>
