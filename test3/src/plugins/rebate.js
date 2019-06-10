/**
 * 返点设置 局可以使用 不依赖变量
 */
let rebate = {
  methods: {
    //  返点设置 生成 slot [] 数据
    slotBuild (rebate, _default) {
      this.slots = []
      let slots = [{
        flex: 1,
        values: [],
        className: 'slot1',
        textAlign: 'center'
      }, {
        divider: true,
        content: '.',
        className: 'slot2'
      }, {
        flex: 0.5,
        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        className: 'slot3',
        textAlign: 'center'
      }, {
        flex: 0.5,
        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        className: 'slot3',
        textAlign: 'center'
      }]
      // 最小 设定 values: []
      for (let i = 0; i <= rebate.maxRebateLimit; i++) {
        slots[0].values.push(i)
      }
      if (_default === 'min') {
        rebate.minRebate += ''
      }
      if (_default === 'max') {
        rebate.maxRebate += ''
      }
      this.slots = this.slotsSet(slots, _default, rebate)
      // 生成 this.slots
      // 设定默认值 defaultIndex
    },
    // 点击 切换账号类型
    showTabFn () {
      this.isShowTab = true
    },
    // 返点设置 合法性判断
    RebateCheck (num, RebateData, RebateClick) {
      let { maxRebateLimit, minRebateLimit, maxRebate, minRebate } = RebateData
      // 1 处理 num 是否合法 校验
      if (num > maxRebateLimit) {
        console.log(num, '>maxRebateLimit**********************')
        return
      }
      if (num < minRebateLimit) {
        console.log(num, '>minRebateLimit**********************')
        return
      }
      // 2 设定的 小的值 必须 < 上限
      if (RebateClick[1] === 'max') {
        // 需要设定的 值 > 当前的 min
        if (num < minRebate) {
          console.log(num, '< minRebate**********************')
          return
        }
      }
      // 3 符合规则 赋值
      if (RebateClick[1] === 'min') {
        if (num > maxRebate) {
          console.log(num, ' > maxRebate*********************')
          return
        }
      }
      console.log('符合规则 赋值')
      return true
    },
    slotsSet (slots, _default, rebate) { // slots 设定默认值 拆分 整数位 + 小数位
      let { maxRebate, minRebate } = rebate
      let pointIndex = false
      if (_default === 'min') { // 当前是最小值
        minRebate = minRebate.split('')
        minRebate.forEach((val, index) => {
          if (val === '.') {
            pointIndex = index
            return false
          }
        })
        slots[0].defaultIndex = minRebate[0] * 1 // 设定整数位
        if (minRebate[pointIndex + 1]) slots[2].defaultIndex = minRebate[pointIndex + 1] * 1 // 设定小数位
        if (minRebate[pointIndex + 2]) slots[3].defaultIndex = minRebate[pointIndex + 2] * 1 // 设定小数位
      }
      if (_default === 'max') { // 当前是最大值
        maxRebate = maxRebate.split('')
        maxRebate.forEach((val, index) => {
          if (val === '.') {
            pointIndex = index
            return false
          }
        })
        slots[0].defaultIndex = maxRebate[0] * 1 // 设定整数位
        if (maxRebate[pointIndex + 1]) slots[2].defaultIndex = maxRebate[pointIndex + 1] * 1 // 设定小数位
        if (maxRebate[pointIndex + 2]) slots[3].defaultIndex = maxRebate[pointIndex + 2] * 1 // 设定小数位
      }
      return slots
    }
  }
}
export default rebate
