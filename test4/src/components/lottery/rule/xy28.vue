<template>
  <div id="ddcp" v-if="parentToChild.lotteryCode==='ddcp'" class="">
    <div class="item-stable item ng-binding" @click="toggleGroup(parentToChild.lotteryCode)">
      <i :class="now===parentToChild.lotteryCode?'icon ion-minus':'icon ion-plus'"></i>
      &nbsp; 幸运28
    </div>
    <div class="item-accordion ng-binding" v-if="now===parentToChild.lotteryCode">
      <div src="'res/templates/app/ddcp.html'" class="">
        <div class="rule-text">
          <div class="orange">
            <strong>游戏规则：</strong>
          </div>
          <ol>
            <li>按北京快乐8的开奖结果为基础；</li>
            <li>将当期第三方开奖数据从小到大进行排序；</li>
            <li>排序后,分别按号码第 1~6 , 7~12 , 13~18 分为【1】【2】【3】三个区；</li>
            <li>把每个区的数字分别相加；</li>
            <li>三个数值相加即为幸运28最终的开奖结果。</li>
          </ol>
          <strong>快乐8开奖结果：北京快乐8开奖结果，每日179期，每天9:00 - 23:55，每5分钟公布一次北京快乐8开奖结果。</strong>
          <div class="orange">
            <strong>投注规则：</strong>
          </div>
          <ol>
            <li>
              <strong>大：</strong>三个位置的数值相加和大于等于14，15,16,17,18,19,20,21,22,23,24,25,26，27为大。
            </li>
            <li>
              <strong>小：</strong>三个位置的数值相加和小于等于00，01,02,03,04,05,06,07,08,09,10,11,12，13为小。
            </li>
            <li>
              <strong>单：</strong>三个位置的数值相加和尾数为单时就为单。</li>
            <li>
              <strong>双：</strong>三个位置的数值相加和尾数为双时就为双。</li>
            <li>
              <strong>大单（三个数值和）：</strong>15,17,19,21,23,25,27为大单。</li>
            <li>
              <strong>小单（三个数值和）：</strong>01,03,05,07,09,11,13为小单。</li>
            <li>
              <strong>大双（三个数值和）：</strong>14,16,18,20,22,24,26为大双。</li>
            <li>
              <strong>小双（三个数值和）：</strong>00,02,04,06,08,10,12为小双。</li>
            <li>
              <strong>极大（三个数值和）：</strong>23,24,25,26,27为极大。</li>
            <li>
              <strong>极小（三个数值和）：</strong>00,01,02,03,04为极小。</li>
            <li>
              <strong>红波（三个数值和）：</strong>03,06，09,12,15,18,21,24为红波。</li>
            <li>
              <strong>绿波（三个数值和）：</strong>01,04,07,10,16,19,22，25为绿波。</li>
            <li>
              <strong>蓝波（三个数值和）：</strong>02,05,08,11,17,20,23,26为蓝波。</li>
            <li>
              <strong>特码包三（三个数值和）：</strong>可选取三个数字投注，选取三个数字当中任何一个与开奖结果相同即中奖，（比如:开奖结果 15 选择 11 15 20,那就视为中奖）。
            </li>
            <li>
              <strong>特码（三个数值和）：</strong>单选取一个数字投注。</li>
            <li>
              <strong>豹子：</strong>当期开出三个数字相同即为豹子（ 例 0+0+0=0,1+1+1=3,2+2+2=6,3+3+3=9,4+4+4=12,5+5+5=15,6+6+6=18,7+7+7=21,8+8+8=24,9+9+9=27）。
            </li>
            <li>
              <strong class="red">*温馨提示：</strong>如开奖结果是0,13,14,27，当投注“红波，绿波，蓝波”将视为不中奖。
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        now: this.sigle === 0 ? this.parentToChild.lotteryCode : ''
      }
    },
    props: ['parentToChild', 'sigle'],
    methods: {
      toggleGroup (t) {
        if (this.now === t) {
          this.now = ''
        } else {
          this.now = t
        }
      }
    }
  }
</script>
