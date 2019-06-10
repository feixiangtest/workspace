<template>
  <div id="gameRule" class="yoPage">
    <div class="yoHeader">
        <div class="center">
            <div class="heaLeft" @click="goBack()">
                <i class="icon ion-ios-arrow-back"></i><span>返回</span>
            </div>
            <div class="title headerItem">游戏说明</div>
            <div class="heaRight" v-if="!showList" @click="openRule()" style="width: 50%;">
              <i class="icon ion-navicon"></i><span style="font-size:16px;">更多</span>
            </div>
        </div>
    </div>
    <div class="yoPageBody">
      <div class="yoScroll">
        <!--單項展開-->
          <div class="disable-user-behavior" v-if="!showList">
            <div class="list">
              <dfmmc v-bind:parentToChild="param" :sigle='0' />
              <mmsc v-bind:parentToChild="param" :sigle='0' />
              <lhc v-bind:parentToChild="param" :sigle='0' />
              <bjsc v-bind:parentToChild="param" :sigle='0' />
              <ffsc v-bind:parentToChild="param" :sigle='0' />
              <cqssc v-bind:parentToChild="param" :sigle='0' />
              <tjssc v-bind:parentToChild="param" :sigle='0' />
              <xjssc v-bind:parentToChild="param" :sigle='0' />
   <!--           <jxssc v-bind:parentToChild="param" :sigle='0' />-->
              <ffssc v-bind:parentToChild="param" :sigle='0' />
              <gdklsf v-bind:parentToChild="param" :sigle='0' />
              <xync v-bind:parentToChild="param" :sigle='0' />
              <hnklsf v-bind:parentToChild="param" :sigle='0' />
              <gxklsf v-bind:parentToChild="param" :sigle='0' />
              <cqxync v-bind:parentToChild="param" :sigle='0' />
              <ffklsf v-bind:parentToChild="param" :sigle='0' />
              <syxw v-bind:parentToChild="param" :sigle='0' />
              <gd11x5 v-bind:parentToChild="param" :sigle='0' />
              <bjk3 v-bind:parentToChild="param" :sigle='0' />
              <jstb v-bind:parentToChild="param" :sigle='0' />
              <gxks v-bind:parentToChild="param" :sigle='0' />
              <ffks v-bind:parentToChild="param" :sigle='0' />
              <bjkl8 v-bind:parentToChild="param" :sigle='0' />
              <xy28 v-bind:parentToChild="param" :sigle='0' />
              <fflhc v-bind:parentToChild="param" :sigle='0' />
              <xyft v-bind:parentToChild="param" :sigle='0' />
            </div>
          </div>
          <!--更多規則 展開 列表-->
          <div class="disable-user-behavior" v-else>
            <div class="list">
              <dfmmc v-bind:parentToChild="{lotteryCode:'mmc'}" />
              <mmsc v-bind:parentToChild="{lotteryCode:'mmsc'}" />
              <lhc v-bind:parentToChild="{lotteryCode:'lhc'}" />
              <bjsc v-bind:parentToChild="{lotteryCode:'bjsc'}" />
              <ffsc v-bind:parentToChild="{lotteryCode:'yfsc', oldCode:'yfsc', lotteryName: '一分', period: '1440', type:'sc'}"/>
              <ffsc v-bind:parentToChild="{lotteryCode:'sfsc', oldCode:'sfsc', lotteryName: '三分', period: '480', type:'sc'}" />
              <xyft v-bind:parentToChild="{lotteryCode:'xyft', oldCode:'xyft', lotteryName: '幸运飞艇', period: '480', type:'xyft'}" />
              <!-- <ffsc v-bind:parentToChild="{lotteryCode:'wfsc', oldCode:'wfsc', lotteryName: '五分', period: '288', type:'sc'}" /> -->
              <cqssc v-bind:parentToChild="{lotteryCode:'cqssc'}" />
              <tjssc v-bind:parentToChild="{lotteryCode:'tjssc'}" />
              <xjssc v-bind:parentToChild="{lotteryCode:'xjssc'}" />
         <!--     <jxssc v-bind:parentToChild="{lotteryCode:'jxssc'}" />-->
              <ffssc v-bind:parentToChild="{lotteryCode:'yfssc', oldCode:'yfssc', lotteryName: '一分', period: '1440', type:'ssc'}" />
              <ffssc v-bind:parentToChild="{lotteryCode:'sfssc', oldCode:'sfssc', lotteryName: '三分', period: '480', type:'ssc'}" />
              <ffssc v-bind:parentToChild="{lotteryCode:'wfssc', oldCode:'wfssc', lotteryName: '五分', period: '288', type:'ssc'}" />
              <gdklsf v-bind:parentToChild="{lotteryCode:'gdklsf'}" />
              <xync v-bind:parentToChild="{lotteryCode:'sfxync', oldCode:'sfxync', lotteryName: '三分', period: '480', type:'xync2'}" />
              <xync v-bind:parentToChild="{lotteryCode:'yfxync', oldCode:'yfxync', lotteryName: '一分', period: '1440', type:'xync2'}" />
              <hnklsf v-bind:parentToChild="{lotteryCode:'hnklsf'}" />
              <gxklsf v-bind:parentToChild="{lotteryCode:'gxklsf'}" />
              <cqxync v-bind:parentToChild="{lotteryCode:'cqxync'}" />
              <ffklsf v-bind:parentToChild="{lotteryCode:'yfklsf', oldCode:'yfklsf', lotteryName: '一分', period: '1440', type:'xync'}" />
              <ffklsf v-bind:parentToChild="{lotteryCode:'sfklsf', oldCode:'sfklsf', lotteryName: '三分', period: '480', type:'xync'}" />
              <ffklsf v-bind:parentToChild="{lotteryCode:'wfklsf', oldCode:'wfklsf', lotteryName: '五分', period: '288', type:'xync'}" />
              <syxw v-bind:parentToChild="{lotteryCode:'syxw'}" />
              <syxw v-bind:parentToChild="{lotteryCode:'yf11x5', oldCode:'yf11x5', lotteryName: '一分', period: '1440', type:'syxw'}" />
              <syxw v-bind:parentToChild="{lotteryCode:'sf11x5', oldCode:'sf11x5', lotteryName: '三分', period: '480', type:'syxw'}" />
              <gd11x5 v-bind:parentToChild="{lotteryCode:'gd11x5'}" />
              <bjk3 v-bind:parentToChild="{lotteryCode:'bjk3'}" />
              <jstb v-bind:parentToChild="{lotteryCode:'jstb'}" />
              <gxks v-bind:parentToChild="{lotteryCode:'gxks'}" />
              <ffks v-bind:parentToChild="{lotteryCode:'yfks', oldCode:'yfks', lotteryName: '一分', period: '1440', type:'ks'}" />
              <ffks v-bind:parentToChild="{lotteryCode:'sfks', oldCode:'sfks', lotteryName: '三分', period: '480', type:'ks'}" />
              <ffks v-bind:parentToChild="{lotteryCode:'wfks', oldCode:'wfks', lotteryName: '五分', period: '288', type:'ks'}" />
              <bjkl8 v-bind:parentToChild="{lotteryCode:'bjkl8'}" />
              <xy28 v-bind:parentToChild="{lotteryCode:'ddcp'}" />
              <fflhc v-bind:parentToChild="{lotteryCode:'yflhc', oldCode:'yflhc', lotteryName: '一分', period: '1440', type:'lhc'}" />
              <fflhc v-bind:parentToChild="{lotteryCode:'sflhc', oldCode:'sflhc', lotteryName: '三分', period: '480', type:'lhc'}" />
              <fflhc v-bind:parentToChild="{lotteryCode:'wflhc', oldCode:'wflhc', lotteryName: '五分', period: '288', type:'lhc'}" />
            </div>
          </div>
      </div>
    </div>
 
  </div>
</template>
<script>
import commonFooter from './../../footer/commonFooter'
import dfmmc from '../rule/dfmmc'
import lhc from '../rule/lhc'
import bjsc from '../rule/bjsc'
import cqssc from '../rule/cqssc'
import tjssc from '../rule/tjssc'
import xjssc from '../rule/xjssc'
import jxssc from '../rule/jxssc'
import gdklsf from '../rule/gdklsf'
import hnklsf from '../rule/hnklsf'
import gxklsf from '../rule/gxklsf'
import cqxync from '../rule/cqxync'
import syxw from '../rule/syxw'
import gd11x5 from '../rule/gd11x5'
import jstb from '../rule/jstb'
import bjk3 from '../rule/bjk3'
import gxks from '../rule/gxks'
import bjkl8 from '../rule/bjkl8'
import xy28 from '../rule/xy28'
import fflhc from '../rule/fflhc'
import ffklsf from '../rule/ffklsf'
import ffks from '../rule/ffks'
import ffsc from '../rule/ffsc'
import ffssc from '../rule/ffssc'
import xync from '../rule/xync'
import xyft from '../rule/xyft'
import mmsc from '../rule/mmsc'

export default {
  components: {
    commonFooter,
    dfmmc,
    lhc,
    bjsc,
    cqssc,
    tjssc,
    xjssc,
    jxssc,
    gdklsf,
    hnklsf,
    gxklsf,
    cqxync,
    syxw,
    gd11x5,
    jstb,
    bjk3,
    gxks,
    bjkl8,
    xy28,
    fflhc,
    ffklsf,
    ffks,
    ffsc,
    ffssc,
    xync,
    xyft,
    mmsc
  },
  data () {
    return {
      showRule: true, // 判断是否显示当前游戏
      showList: false, // 判断是否显示其他游戏规则
      lotteryCode: this.$route.query.lotteryCode // 获取传入的游戏code
    }
  },
  methods: {
    // 打开更多规则
    openRule () {
      if (window.$('.item-stable').length === 1 && window.$('.item-stable').next()[0]) {
        window.$('.item-stable').click()
      }
      this.lotteryCode = null
      this.showRule = !this.showRule
      this.showList = !this.showList
    },
    // 后退
    goBack () {
      // this.$store.state.site.nowPosition = 0
      this.$router.go(-1)
      scrollTo(0, 0)
    }
  },
  computed: {
    // 初始化传参
    param (reset) {
      // 当从首页进入游戏规则页面则默认展示第一个游戏规则（秒秒彩）
      if (this.$route.query.lotteryCode === 'xync1') { // 判断从哪个游戏页面进入规则页面的，获取他的lotteryCode，判断是否为自营彩种，如果是，则可以重用页面，并加以赋值
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode, // 游戏code
          oldCode: 'xync1', // 判断是否与游戏code是否一直
          lotteryName: '一分', // 自营游戏彩种（一分、三分、五分）
          period: '1440', // 期数
          type: 'xync'// 游戏类型，此游戏为幸运农场类型
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'xync3') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'xync3',
          lotteryName: '三分',
          period: '480',
          type: 'xync'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'xync5') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'xync5',
          lotteryName: '五分',
          period: '288',
          type: 'xync'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'ks1') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'ks1',
          lotteryName: '一分',
          period: '1440',
          type: 'ks'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'ks3') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'ks3',
          lotteryName: '三分',
          period: '480',
          type: 'ks'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'ks5') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'ks5',
          lotteryName: '五分',
          period: '288',
          type: 'ks'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'yfsc') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'yfsc',
          lotteryName: '一分',
          period: '1440',
          type: 'sc'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'sfsc') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'sfsc',
          lotteryName: '三分',
          period: '480',
          type: 'sc'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'wfsc') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'wfsc',
          lotteryName: '五分',
          period: '288',
          type: 'sc'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'yfssc') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'yfssc',
          lotteryName: '一分',
          period: '1440',
          type: 'ssc'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'sfssc') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'sfssc',
          lotteryName: '三分',
          period: '480',
          type: 'ssc'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'wfssc') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'wfssc',
          lotteryName: '五分',
          period: '288',
          type: 'ssc'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'yflhc') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'yflhc',
          lotteryName: '一分',
          period: '1440',
          type: 'lhc'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'sflhc') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'sflhc',
          lotteryName: '三分',
          period: '480',
          type: 'lhc'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'wflhc') { // 同上
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'wflhc',
          lotteryName: '五分',
          period: '288',
          type: 'lhc'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'sfxync') { // 三分幸运农场
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'sfxync',
          lotteryName: '三分',
          period: '480',
          type: 'xync2'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'yfxync') { // 一分幸运农场
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'yfxync',
          lotteryName: '一分',
          period: '1440',
          type: 'xync2'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'yf11x5') { // 一分11选5
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'yf11x5',
          lotteryName: '一分',
          period: '1440',
          type: 'syxw'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'sf11x5') { // 三分11选5
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'sf11x5',
          lotteryName: '三分',
          period: '480',
          type: 'syxw'
        }
        return lotteryList
      } else if (this.$route.query.lotteryCode === 'xyft') { // 幸运飞艇
        let lotteryList = {
          lotteryCode: this.$route.query.lotteryCode,
          oldCode: 'xyft',
          lotteryName: '幸运飞艇',
          period: '480',
          type: 'xyft'
        }
        return lotteryList
      }

      // 传统游戏则接受lotteryCode并传入即可
      let list = {
        lotteryCode: this.$route.query.lotteryCode
      }
      return list
    }
  }

}
</script>

