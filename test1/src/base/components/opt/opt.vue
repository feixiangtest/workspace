<template>
    <div class="shadeIn" v-if="optDate.optsType">
        <div class="selBankBox" style="z-index:999;position:fixed">
            <h1>
              {{optDate.opt_title}}
              <a v-on:click="sendMsgToParent">完成</a>
            </h1>
            <dl>
                <dt v-if="optDate.DataList.length" v-for="(item, index) in optDate.DataList"
                    @click="getSelectItem(item, index)">
                    <span>{{item}}</span>
                    <i v-bind:class="{'yo-icon icon-radio icon-radio-yes': index === selectItem, 'yo-icon icon-radio-no': index !== selectItem }"></i>
                </dt>
            </dl>
        </div>
        <div class="v-modal" style="z-index: 998;"></div>
    </div>
</template>
<script>
/**
  * opt组件
  * 需要在调用组件页面监听listenToChildEvent事件
  * optDate: {
  *   optsType: Boolean, //开关
  *   DataList: Array   //数据合集
  * }
**/
  export default {
    data () {
      return {
        selectItem: 0,
        currentVal: ''
      }
    },
    props: {
      optDate: {
        opt_title: String,
        optsType: Boolean,
        DataList: Array,
        Diferent: {
          type: Boolean,
          default: function () {
            return false
          }
        }
      }
    },
    created () {
      if (this.optDate.Diferent && !this.currentVal) {
        this.selectItem = ''
        return false
      }
      this.currentVal = this.optDate.DataList[0]
    },
    methods: {
      sendMsgToParent () {
        if (this.optDate.Diferent && !this.currentVal) {
          this.optDate.optsType = false
          return false
        }
        if (!this.currentVal) {
          this.currentVal = this.optDate.DataList[0]
        }
        this.$emit('listenToChildEvent', this.currentVal, this.selectItem)
      },
      getSelectItem (item, i) {
        this.currentVal = item
        this.selectItem = i
        // setTimeout(() => {
        //   this.sendMsgToParent()
        // }, 100)
      }
    }
  }
</script>
