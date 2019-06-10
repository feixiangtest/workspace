<template>
<div class="mengcen active chipPage">
  <div class="yo-couma">
  <div class="yo-c-hea">
    <h5>自定义筹码<i @click="chip_cancel()">×</i></h5>
    <p>1.点击筹码即可取消选中状态，再次点击即可选中。</p>
    <p>2.只能选中6个筹码才能保存并展示在筹码栏。</p>
    <p>3.点击“编辑”自定义筹码额度，前两排支持输入1-9999的整数；第三排支持1-10的整数。</p>
  </div>
  <div class="yo-c-cen">
    <ul>
      <!-- v-for: value in chip_litem -->
      <li v-for="(value, index) in chip_litem" :key="index">
        <i :class="{ chipChecked: value.selected === '1' }" @click="chipLiClick(value, index)"></i>
        <div v-if="index == 0" class="cm1" @click="chipLiClick(value, index)">{{ value.val | chipFilter }}</div>
        <div v-if="index == 1" class="cm2" @click="chipLiClick(value, index)">{{ value.val | chipFilter }}</div>
        <div v-if="index == 2" class="cm3" @click="chipLiClick(value, index)">{{ value.val | chipFilter }}</div>
        <div v-if="index == 3" class="cm4" @click="chipLiClick(value, index)">{{ value.val | chipFilter }}</div>
        <div v-if="index == 4" class="cm5" @click="chipLiClick(value, index)">{{ value.val | chipFilter }}</div>
        <div v-if="index == 5" class="cm6" @click="chipLiClick(value, index)">{{ value.val | chipFilter }}</div>
        <div v-if="index == 6" class="cm7" @click="chipLiClick(value, index)">{{ value.val | chipFilter }}</div>
        <div v-if="index == 7" class="cm8" @click="chipLiClick(value, index)">{{ value.val | chipFilter }}</div>
        <div v-if="index == 8" class="cm9" @click="chipLiClick(value, index)">{{ value.val | chipFilter }}</div>
        <span class="ng-binding" v-show="!isEdit" @click="chipLiClick(value, index)" style="line-height:20px">{{index > 5 ? filter(value.val) : value.val}}</span>
        <input class="ng-binding" :class="aget.indexOf('iPhone') === -1 ? 'other' : 'iPhone'" v-model="editVal[index].val" v-show="isEdit"
         @input="changeChipValue($event,index)" @focus="inFocus($event,index)" type="tel" pattern="[0-9]*" @blur="onBlur(index)"/>
        <b v-if="index>5" :class="aget.indexOf('iPhone') === -1 ? 'other' : 'iPhone'">万</b>
      </li>
      <!-- end v-for: value in chip_litem -->
    </ul>
    <div class="clear"></div>
    <p class="yixuan"><em class="ng-binding">{{ selectChip.length }}</em>/<em>{{ total }}</em></p>
  </div>
  <div class="yoc-c-fot">
    <a class="quxiao" href="javascript:;" title="" @click="editChips()" :class="isEdit ? 'ediding' : ''">编辑</a>
    <a class="queren" href="javascript:;" title="" @click="chip_save()">保存</a>
  </div>
</div>
</div>

</template>
<script>
import * as type from '../../../store/chips/type'
import * as types from '../../../store/home/type'
import * as statusCode from '../../../utils/status_const'

export default {
  data () {
    return {
      // 用户设置筹码数量
      total: 6,
      // 用户当前筹码
      userChips: [],
      selectChip: [],
      userChipIndexs: [], // 用户自定义筹码下标
      // 所有筹码数据
      chip_litem: [
        {index: '1', val: '10', selected: '0'},
        {index: '2', val: '50', selected: '0'},
        {index: '3', val: '100', selected: '0'},
        {index: '4', val: '500', selected: '0'},
        {index: '5', val: '1000', selected: '0'},
        {index: '6', val: '5000', selected: '0'},
        {index: '7', val: '10000', selected: '0'},
        {index: '8', val: '50000', selected: '0'},
        {index: '9', val: '100000', selected: '0'}
      ],
      editVal: [{val: '10'}, {val: '50'}, {val: '100'}, {val: '500'}, {val: '1000'}, {val: '5000'}, {val: '1'}, {val: '5'}, {val: '10'}],
      isEdit: false,
      aget: navigator.userAgent,
      recoverVal: null // 恢复之前的值
      // timer: null
    }
  },
  methods: {
    setDefaultChips () {
      var $this = this
      this.selectChip = []
      for (let i = 0; i < this.chip_litem.length; i++) {
        this.chip_litem[i].selected = '0'
      }
      if (localStorage.getItem('userChips')) {
        this.userChips = JSON.parse(localStorage.getItem('userChips')).slice(0, 9)
        setChip()
      } else {
        this.queryChip()
      }
      if (window.screen.width === 320) { // ipnoe5c
        if (this.aget.indexOf('UCBrowser') !== -1 || window.innerHeight === 454) { // ipnoe5c UC浏览器样式调整
          window.$('.yo-couma').css({'bottom': '2px', 'height': '99%', 'width': '95%', 'left': '2.5%'})
          window.$('.yo-c-hea h5').css({ 'height': '2rem', 'line-height': '2rem' })
        } else if (this.aget.indexOf('CriOS') === -1 && this.aget.indexOf('Safari') !== -1) {
          window.$('.yo-couma').css({'bottom': '4.6px', 'height': '450px', 'width': '95%', 'left': '2.5%'})
          window.$('.yoc-c-fot a').css({ 'height': '2.2rem', 'line-height': '2.2rem' })
        } else {
          window.$('.yo-couma').css({'bottom': '3%', 'width': '95%', 'left': '2.5%'})
        }
      }
      function setChip () {
        $this.chip_litem.forEach(function (obj, key) {
          if ($this.userChips.length === 6) {
            if (key > 2) {
              obj.val = $this.userChips[key - 3].val
              obj.selected = $this.userChips[key - 3].selected
              $this.editVal[key].val = key > 5 ? $this.userChips[key - 3].val.slice(0, -4) : $this.userChips[key - 3].val
              $this.userChips[key - 3].selected === '1' && ($this.selectChip.push(obj.index))
            }
          } else {
            obj.val = $this.userChips[key].val
            obj.selected = $this.userChips[key].selected
            $this.editVal[key].val = key > 5 ? $this.userChips[key].val.slice(0, -4) : $this.userChips[key].val
            $this.userChips[key].selected === '1' && ($this.selectChip.push(obj.index))
          }
        })
      }
    },
    chipLiClick (obj, index) { // 切换筹码选中状态
      var $this = this
      if (obj.selected === '1') {
        obj.selected = '0'
        this.selectChip.forEach(function (v, k) {
          if (v === obj.index) {
            $this.selectChip.splice(k, 1)
          }
        })
      } else {
        if ($this.selectChip.length === 6) {
          window.layer.msgWarn('请选择6个筹码进行保存')
        } else {
          obj.selected = '1'
          $this.selectChip.push(obj.index)
        }
      }
    },
    chip_save (t) { // 保存用户自定义筹码
      window.$('#app').css('overflow', '')
      window.$('body').css('position', 'static')
      if (!navigator.onLine) { // 离线状态
        window.layer.alert('目前处于离线状态')
        return false
      }
      var $this = this
      if (this.selectChip.length !== 6) {
        window.layer.msgWarn('请选择6个筹码进行保存')
      } else {
        let chipsParams = []
        for (let i = 0; i < $this.editVal.length; i++) {
          if (!$this.editVal[i].val) {
            window.layer.msgWarn('筹码输入不允许为空')
            return
          } else {
            i > 5 && chipsParams.push({ chips: $this.editVal[i].val + '0000', status: $this.chip_litem[i].selected })
            i <= 5 && chipsParams.push({ chips: $this.editVal[i].val, status: $this.chip_litem[i].selected })
          }
        }
        this.$store.dispatch(type.CHIPS_ACTION_SETCHIPS, {'commonChipsVos': chipsParams}).then(res => {
          if (res.status === statusCode.statusConst.FAILURE) { // 失败了提示错误
            window.layer.msgWarn(res.msg)
          } else if (res.status === statusCode.statusConst.SUCCESS) { // 成功
            this.$store.state.site.nowPosition = 0
            window.layer.msgWarn('筹码保存成功，请前往下注', function () {
              let chip = []
              chipsParams.forEach(function (v, k) {
                chip.push({val: v.chips, selected: v.status})
              })
              chip = chip.sort(function (a, b) {
                return a.val - b.val
              })
              localStorage.setItem('userChips', JSON.stringify(chip))
              $this.$store.state.home.userChips = chip
              // location.href = location.href
            })
            this.$set(this.$store.state.site, 'setChip', false)
            // this.$router.go(-1)
          }
        })
      }
    },
    chip_cancel () { // 返回右侧菜单页
      // this.$router.go(-1)
      this.$set(this.$store.state.site, 'setChip', false)
      window.$('#app').css('overflow', '')
      window.$('body').css('position', 'static')
    },
    queryChip () {
      let $this = this
      this.$store.dispatch(types.LOTTERY_ACTION).then(res => {
        if (res.msg === 'success') {
          $this.userChips = res.data.userChips
          localStorage.setItem('userChips', JSON.stringify(res.data.userChips))
          $this.$store.state.home.userChips = res.data.userChips
          $this.setDefaultChips()
          // return res.data.userChips
        } else {
          console.info('筹码设置数据查询异常')
        }
      })
    },
    changeChipValue (event, idx) { // 控制筹码输入数字
      let cash = event.currentTarget.value
      let value = cash.replace(/[^0-9]+/g, '')
      if (idx > 5) {
        if (Number(value) === 0) {
          this.editVal[idx].val = ''
        } else if (value.length >= 2 && value[0] === '1') {
          value[1] === '0' && (this.editVal[idx].val = value.substr(0, 2))
          value[1] !== '0' && (this.editVal[idx].val = value.substr(0, 1))
        } else if (value.length >= 2 && value[0] !== '1') {
          this.editVal[idx].val = value.substr(0, 1)
        } else {
          this.editVal[idx].val = value
        }
      } else {
        if (value.length > 4) { // 最大长度只能是4位
          this.editVal[idx].val = value.substr(0, 4)
        } else if (Number(value) === 0) {
          this.editVal[idx].val = ''
        } else {
          this.editVal[idx].val = value
        }
      }
    },
    inFocus (event, idx) {
      this.recoverVal = event.currentTarget.value
      this.editVal[idx].val = ''
      event.target.parentNode.style.borderColor = '#4fb83d'
    },
    onBlur (idx) {
      if (this.editVal[idx].val === '') {
        this.editVal[idx].val = this.recoverVal
      }
      event.target.parentNode.style.borderColor = '#bfbfbf'
    },
    editChips () {
      this.isEdit = !this.isEdit
    },
    filter (str) {
      if (str) {
        return String(str.slice(0, -4))
      } else {
        return ''
      }
    }
  },
  mounted () { // 依赖 init 接口 已处理
    window.$('#app').css('overflow', 'hidden')
    /**
     * state.site.setChip 触发 子组件 有数据依赖, 空数据判断(没数据不影响 这里逻辑)
     * 首页加载 被动触发 延后执行 减少触发多次
     */
    setTimeout(() => {
      this.setDefaultChips()
    }, 0)
  }
}
</script>

