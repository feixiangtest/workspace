<template>
  <div>
    <el-table :data="contentListData" border class="yoMemTable" empty-text="暂无数据">
        <el-table-column v-if="!currentRecord"
          prop="betDateTime"
          label="下注时间"
          width="105">
        </el-table-column>
        <el-table-column v-if="currentRecord"
          prop="createDateTimeStr"
          label="日期"
          width="105">
        </el-table-column>
        <el-table-column v-for="(item,index) in titleListData" :prop="item.name" :label="item.title" :key="index">
            <template slot-scope="scope">
              <template v-if="item.name ==='awardResult'">
                <span v-if='scope.row[item.name]==="总计"'>总计</span>
                <!-- OT-3144【SIT-PC/代理】投注记录未解析游戏（斗牛，牛牛，21点，炸金花,番滩）情况 -->
                <a href="javascript:;" @click="handleClick(scope)" 
                 v-if='scope.row[item.name]!=="总计"'>查看</a>
              </template>
              <template v-if="item.name === 'tradeType'">
                <span v-html="scope.row.tradeType"></span>
              </template>

              <template v-if="item.name === 'remark'">
                <a v-if="scope.row.oldTradeType === '5' || scope.row.oldTradeType === '21'"
                   href="javascript:;" @click="remarkDetail(scope.row.remark)">查看</a>
                <span v-else v-html="scope.row.remark"></span>
              </template>

              <template v-if="indexOfArr.indexOf(item.name) === -1" >
                <!-- 如果是盈亏，而且盈亏为正那么把字体设置为红色 -->
                <span :style='{color: (item.name ==="payOut" && scope.row.payOut>0) ?"red":""}'
                    v-if='item.name ==="payOut"||item.name ==="betAmount"'>
                  {{scope.row[item.name] | moneyFilter}}
                </span>
                <span v-else-if="item.name === 'tradeLimit' ||item.name === 'existingLimit'">{{scope.row[item.name] | moneyFilter}}</span>
                <span v-else>
                  {{scope.row[item.name] !== 'null' ? scope.row[item.name]:''}}
                </span>
              </template>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog :title="gameResultTitle" :visible.sync="centerDialogVisible" width="600px" center>
          <div class="popupConter">
              <div class="platformTitle" v-html="betResult">
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
    </el-dialog>

    <!-- 备注==查看详情 -->
    <el-dialog title="备注" :visible.sync="detailfDialogVisible" center width="600px">
        <div class="efficacbetCon">
            {{remarkText}}
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="detailfDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 天生赢家 -->
    <div id="bornToWin" v-if="showBornToWin" v-html="bornToWinHtml"></div>
  </div>
</template>

<script>
export default {
  props: ['contentListData', 'titleListData'],
  data () {
    return {
      centerDialogVisible: false,
      currentRecord: false,
      betResult: '',
      indexOfArr: ['awardResult', 'tradeType', 'remark'], // 检索数组内是否存在
      remarkText: '',
      detailfDialogVisible: false,
      showBornToWin: false,
      gameResultTitle: '',
      bornToWinHtml: ''
    }
  },
  moneyFilter (money) { // 格式化金额格式
    if (money !== null && money !== undefined && !isNaN(money)) return Number(money).toFixed(2)
    else return money
  },
  methods: {
    // 查看结果
    handleClick (scope) {
      let param = { platformCode: scope.row.apiName, gameId: scope.row.gameid, gameCode: scope.row.gameCode }
      this.$store.dispatch('shareApi.getGameResult.action', param).then(res => {
        this.gameResultTitle = '游戏结果-' + scope.row.gameType + '详情'
        this.resolveResult(window.resolveResult.resolveResult(scope.row.gameid, res.data.cardInfo), scope.row.gameid)
      }).catch(e => {
        // 打印一下错误
        console.log(e)
      })
    },
    resolveResult (result, gameId) {
      if (!result) {
        this.betResult = '<p class="text-center"><span>游戏结果同步中，请稍后重试！</span></p>'
      } else {
        // 百家乐
        if (gameId === '101') {
          // if (result.xian.bornToWin === 1 || result.zhuang.bornToWin === 1) {
          //   this.bornToWinHtml = window.resolveResult.assembleBornToWin(result)
          //   this.showBornToWin = true
          // }
          this.betResult = window.resolveResult.assembleBaccarat(result)
        } else {
          this.betResult = result
        }
      }
      // 打开弹框
      this.centerDialogVisible = true
    },
    // 返水和退佣查看详情
    remarkDetail (remark) {
      this.remarkText = remark
      this.detailfDialogVisible = true
    }
  },
  mounted () {
    let $this = this
    window.closeBornToWin = function () {
      $this.showBornToWin = false
    }
    if (location.href.indexOf('/currentRecord') >= 0) {
      this.currentRecord = true
    }
  }
}
</script>
