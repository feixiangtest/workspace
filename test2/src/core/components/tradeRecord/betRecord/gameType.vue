<template>
    <div class="floatLf">
        <label class="el-form-item__label">游戏类型：</label>
        <div class="platformSelet" v-if="platformList.length > 0">
            <!-- <span class="platTit">{{platform.name}}</span><el-button type="primary" class="choose" @click="centerDialogVisible = true">选取</el-button> -->
            <el-select v-model="platform" size="small" @change="platformClick(platform)">
                <el-option v-for="(platForm,index) in platformList"
                    :key="platForm.id"
                    :label="platForm.displayName"
                    :value="platForm.id">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
import * as tradeRecordTypes from '@m/store/tradeRecord/type'
export default {
  props: ['getBettingRecordAction'],
  data () {
    return {
      platform: 2, // 选中平台ID
      platformKey: 'ag', // 选中标识
      centerDialogVisible: false // 弹窗关闭标识
    }
  },
  computed: {
    // 所有已经开放的第三方平台数据
    platformList () {
      // 设置默认选中
      if (this.$store.state.tradeRecord.platformList.length > 0) {
        this.platform = this.$store.state.tradeRecord.platformList[0].id
        this.platformKey = this.$store.state.tradeRecord.platformList[0].platformCode.toLowerCase()
      }
      return this.$store.state.tradeRecord.platformList
    },
    initdPlatform () {
      return this.$store.state.tradeRecord.initdPlatform
    }
  },
  methods: {
    // 选中平台双击事件
    platformDoubleClick () {
      this.submitplatform()
    },
    // 选中平台单击事件
    platformClick (item) {
      for (let platform = 0; platform < this.platformList.length; platform++) {
        if (this.platformList[platform].id === item) {
          this.platformKey = this.platformList[platform].platformCode.toLowerCase()
          this.$store.state.tradeRecord.selectPlatform = this.platformList[platform].platformCode
        }
      }
      this.$store.dispatch(tradeRecordTypes.SWITCHDATETYPE, {'platform': this.platformKey, 'dateType': 'today'})
      this.$store.commit(
        tradeRecordTypes.SUBMITPLATFORM_MUTATION,
        this.platformKey
      )
    },
    // 提交选中的平台
    submitplatform () {
      this.$store.commit(
        tradeRecordTypes.SUBMITPLATFORM_MUTATION,
        this.platformKey
      )
      this.getBettingRecordAction()
    }
  }
}
</script>
