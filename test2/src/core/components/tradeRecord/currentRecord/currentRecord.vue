<template>
  <div class='contentBox'>
      <!--往来记录搜索-->
      <current-search></current-search>
      <!--往来记录列表-->
      <content-table :titleListData="titleList" :contentListData="contentList"></content-table>
      <!--列表页脚-->
      <page-foot></page-foot>

  </div>
</template>

<script>
import currentSearch from '@m/components/tradeRecord/currentRecord/currentSearch'
import pageFoot from '@m/components/tradeRecord/pageFoot'
import contentTable from '@m/components/tradeRecord/contentTable'
import * as tradeConfig from '@m/config/tradeRecord'
export default {
  components: {
    currentSearch,
    contentTable,
    pageFoot
  },
  data () {
    return {
      // 往来记录的列表头
      titleList: tradeConfig.corrTitleList
    }
  },
  computed: {
    contentList () {
      // 获取往来记录数据
      let _listData = this.$store.state.tradeRecord.currentRecordList
      // 重新组装源数据，根据tradeType的类型来展示不同的备注信息
      for (let i = 0; i < _listData.length; i++) {
        // 如果没有注单明细，那么跳过下一次循环
        if (!_listData[i].bettingCode) { continue }
        // 获取交易类型编号
        let tradeType = _listData[i].tradeType
        // 如果没有用户自定义内容，那么交易类型就设定为const里面对应的交易类型，否则拼接自定义的内容
        if (!_listData[i].objectVo.strObj) {
          _listData[i].tradeType = window.common.const.tradeType[_listData[i].tradeType]
        } else {
          _listData[i].tradeType = window.common.const.tradeType[_listData[i].tradeType] + '-' + _listData[i].objectVo.strObj
        }
        // 如果是人工存入，手动申请出款，会员余额存入，就设置好样式以及拼接单号priject2 temp priject3
        if (tradeType === '31' || tradeType === '23' || tradeType === '152') {
          _listData[i].tradeType = _listData[i].tradeType + '(<span class="purple">' +
          _listData[i].priject2 + '</span>' + _listData[i].temp + '<span class="green">' + _listData[i].priject3 + '</span>)'
        }
        // 如果是出款其他，人工存入取消出款，负数额度归零，人工存入其他，第三方额度存入就设置好样式以及拼接单号priject2
        if (tradeType === '28' || tradeType === '32' || tradeType === '36' || tradeType === '37' || tradeType === '155') {
          _listData[i].tradeType = _listData[i].tradeType + '(<span class="green">' + _listData[i].priject2 + '</span>)'
        }
        // 如果是存款优惠，活动优惠，就设置好样式以及拼接单号priject2 temp priject3
        if (tradeType === '33' || tradeType === '147') {
          _listData[i].tradeType = _listData[i].tradeType + '(<span class="purple">' +
          _listData[i].priject2 + '</span>' + _listData[i].temp + ')'
        }
        // 往来记录如果是tradeRemark1里面的，备注直接取remark的值
        if (window.common.const.tradeRemark1.indexOf(tradeType) !== -1) {
          // _listData[i].remark = _listData[i].remark.replace('/', '-')
        } else {
          // 往来记录如果是tradeRemark2里面的，备注取detailInfo的值。
          if (window.common.const.tradeRemark2.indexOf(tradeType) !== -1) {
            _listData[i].remark = _listData[i].detailInfo
          } else {
            _listData[i].remark = '' // _listData[i].remark.replace(/\//g, '')
          }
        }
        // 如果有备注，而且里面包含了/，那么去掉/
        if (_listData[i].remark) {
          if (_listData[i].remark.indexOf('/') === 0) {
            let tem = _listData[i].remark.replace('/', '')
            _listData[i].remark = tem
          }
        }
        // 旧的tradeType需要记录下来用于判断显示返水详情
        _listData[i].oldTradeType = tradeType
      }
      return _listData
    }
  }
}
</script>
