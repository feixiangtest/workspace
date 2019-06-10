<!--用法见announceDetail.vue-->
<template>
	<div class="mask-box hide" v-if="isShowTab">
		<div class="picker-tab">
			<mt-picker :showToolbar='true' value-key='eventName' :slots="slots" @change="onValuesChange" @touchmove.prevent>
				<div class="pic-header">
					<div class="pic-cancel" @click="cancle">取消</div>
					<div class="pic-titile">{{title}}</div>
					<div class="pic-sure" @click="sure">确定</div>
				</div>
			</mt-picker>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import Picker from 'mint-ui/lib/picker'

Vue.component(Picker.name, Picker)

export default {
  props: {
    isShowTab: {
      type: Boolean
    },
    title: {
      type: String
    },
    slots: {
      type: Array
    }
  },
  data () {
    return {
      selectData: []
    }
  },
  watch: {
    // 监听选中的值
    isShowTab () {
      if (this.isShowTab) {
        this.closeTouch()
        if (this.slots.length === 1 && this.slots[0].textAlign === 'center') {
          window.$('html').addClass('pickBug')
        }
        window.$('html').addClass('fixPage')
        window.indexMain.pointerEvents(window.$('html'))
        setTimeout(() => {
          window.$('.mask-box').after('<div class="v-modal" style="z-index: 2006;" v-if="isShowTab"></div>')
        }, 0)
        setTimeout(() => {
          window.$('.mask-box').removeClass('hide')
        }, 2)
      } else {
        this.openTouch()
        window.$('.v-modal').remove()
        window.$('.mask-box').addClass('hide')
        window.$('html').removeClass('fixPage')
        window.$('html').removeClass('pickBug')
      }
    }
  },
  mounted () {
    console.log(this.$route, '--------')
  },
  methods: {
    /* 解決iphone頁面層級相互影響滑動的問題 */
    closeTouch: function () {
      document.getElementsByTagName('body')[0].addEventListener('touchmove',
        this.handler, { passive: false }) // 阻止預設事件
      console.log('closeTouch haved happened.')
    },
    openTouch: function () {
      document.getElementsByTagName('body')[0].removeEventListener('touchmove',
        this.handler, { passive: false }) // 開啟預設事件
      console.log('openTouch haved happened.')
    },
    sure () {
      // 把选择的数据传递给父组件
      setTimeout(() => {
        window.$('html').removeClass('fixPage')
      }, 0)
      this.$emit('getSelectData', this.selectData)
      this.cancle()
    },
    cancle () {
      // 改变父组件isShowTab的值为false
      this.$emit('update:isShowTab', false)
    },
    // pick组件选择的数据
    onValuesChange (picker, values) {
      this.selectData = values
      //    if (values[0] > values[1]) {
      //      picker.setSlotValue(1, values[0]);
      //    }
    }
  }
}
</script>
