<template>
  <div class="yoPaging">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecord">
      </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as tradeRecordTypes from '@m/store/tradeRecord/type'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      // 当前页
      pageNo: state => state.tradeRecord.pageNo,
      // 当前显示条数
      pageSize: state => state.tradeRecord.pageSize,
      // 总条数
      totalRecord: state => state.tradeRecord.totalRecord
    })
  },
  methods: {
    // 当前页条数改变
    handleSizeChange (val) {
      this.$store.commit(tradeRecordTypes.PAGESIZE_MUTATION, val)
    },
    // 页数改变
    handleCurrentChange (val) {
      this.$store.commit(tradeRecordTypes.PAGENO_MUTATION, val)
    }
  }
}
</script>
