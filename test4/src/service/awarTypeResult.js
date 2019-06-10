
import Vue from 'vue'

/**
 * awardPage页面展示各种玩法数据时会先从这个文件作为入口进入awardUtil.js进行数据处理
 */
export default function () {
  Vue.XX5awardSettlement = function (openNum, playType) {
    return Vue.outputAwardResult(openNum, playType)
  }

  Vue.sscAwardSettlement = function (openNum, playType) {
    if (playType === 'bjl') {
      return Vue.bac(openNum)
    } else if (playType === 'sg') {
      return Vue.thMale(openNum)
    } else if (playType === 'lh') {
      return Vue.draTig(openNum)
    } else if (playType === 'nn') {
      return Vue.cattle(openNum)
    } else if (playType === 'sh') {
      return Vue.poker(openNum)
    }
  }

  Vue.KLSFawardSettlement = function (openNum, playType) {
    return Vue.outputAwardResult(openNum, playType)
  }

  Vue.KL8awardSettlement = function (openNum, playType) {
    return Vue.getKl8Period(openNum, playType)
  }

  Vue.LHCawardSettlement = function (openNum, playType) {
    if (playType === 'SX') { // 生肖
      return Vue.getLHCPeriodForSX(openNum, playType)
    }
  }
}
