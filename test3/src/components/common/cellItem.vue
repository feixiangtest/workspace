<!--左滑删除组件，使用方法见 rebatesProportion.vue-->
<template>
	<div>
		<div class="cell-slider">
			<div class="content" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' :style="deleteSlider">
				<!-- 插槽中放具体项目中需要内容         -->
				<slot></slot>
			</div>
			<!-- <div class="remove" :style='{ backgroundColor : btnBgColor }' @click="isDelete" ref='remove' val='删除'>
				删除
			</div> -->
			<div class="operate hide" ref='operate'>
        <div class="op-item op-add" @click="isAdd" v-show='showAdd'>添加</div>
				<div class="op-item op-edit" @click="isEdit"  v-show='showEdit'>修改</div>
				<div class="op-item op-del" @click="isSave"  v-show='showSave'>余额存取</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import CellSwipe from 'mint-ui/lib/cell-swipe'
Vue.component(CellSwipe.name, CellSwipe)
export default {
  name: 'cellItem',
  props: {
    showAdd: {
      default: true
    },
    showEdit: {
      default: true
    },
    showSave: {
      default: true
    }
  },
  data () {
    return {
      coordinate: '',
      coordinateEnd: '',
      startX: 0, // 触摸位置
      startY: 0,
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      deleteSlider: '' // 滑动时的效果,使用v-bind:style="deleteSlider"
    }
  },
  methods: {
    touchStart (ev) {
      ev = ev || event
      // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if (ev.touches.length === 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX
        this.startY = ev.touches[0].clientY
        this.coordinate = ev.touches[0]
      }
    },
    getAngle (angx, angy) {
      return Math.atan2(angy, angx) * 180 / Math.PI
    },
    operate (ev) {
      setTimeout(() => {
        if (ev) {
          window.$(ev.target).parent().parent().next().addClass('hide')
        } else {
          window.$('.operate').addClass('hide')
        }
      }, 40)
    },
    scrollY (disY) {
      if (disY > 27) {
        window.$('.cell-slider div.content').attr('style', 'transform:translateX(' + 0 + 'px)')
      }
    },
    touchMove (ev) {
      ev = ev || event
      try { this.scrollY(Math.abs(this.startY - ev.touches[0].clientY)) } catch (e) { }
      // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      this.coordinateEnd = ev.touches[0]
      var angx = ev.touches[0].clientX - this.coordinate.clientX
      var angy = ev.touches[0].clientY - this.coordinate.clientY
      if (Math.abs(angx) < 2 && Math.abs(angy) < 2) return
      let angle = Math.abs(this.getAngle(angx, angy))
      if (angle <= 170) return
      window.$('.operate').removeClass('hide')
      let wd = this.$refs.operate.clientWidth
      if (ev.touches.length === 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX
        // 起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX < 0 || this.disX === 0) {
          this.deleteSlider = 'transform:translateX(0px)'
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (this.disX > 0) {
          // 具体滑动距离我取的是 手指偏移距离*5。
          this.deleteSlider = 'transform:translateX(-' + this.disX * 5 + 'px)'
          // 最大也只能等于删除按钮宽度
          if (this.disX * 5 >= wd) {
            this.deleteSlider = 'transform:translateX(-' + wd + 'px)'
          }
        }
      }
    },
    touchEnd (ev) {
      ev = ev || event
      var angx = this.coordinateEnd.clientX - this.coordinate.clientX
      var angy = this.coordinateEnd.clientY - this.coordinate.clientY
      if (Math.abs(angx) < 2 && Math.abs(angy) < 2) return
      let angle = Math.abs(this.getAngle(angx, angy))
      if (angle > 20) return
      let wd = this.$refs.operate.clientWidth
      if (ev.changedTouches.length === 1) {
        let endX = ev.changedTouches[0].clientX
        this.disX = this.startX - endX
        // 如果距离小于删除按钮一半,强行回到起点
        if ((this.disX * 5) < (wd / 2)) {
          this.deleteSlider = 'transform:translateX(0px)'
          this.operate(ev)
        } else {
          // 大于一半 滑动到最大值
          this.deleteSlider = 'transform:translateX(-' + wd + 'px)'
        }
      }
    },
    isEdit () {
      // let btnVal = this.$refs.remove.getAttribute('val')
      this.$emit('aEdit', 'Edit')
      this.$emit('aPass')
    },
    isAdd () {
      this.$emit('aEdit', 'Add')
      this.$emit('aPass')
    },
    isSave () {
      this.$emit('aEdit', 'Save')
      this.$emit('aPass')
    }
  }
}
</script>
