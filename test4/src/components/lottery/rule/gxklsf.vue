<template>
    <div id="gxklsf" v-if="parentToChild.lotteryCode==='gxklsf'" class="">
        <div class="item-stable item ng-binding" @click="toggleGroup(parentToChild.lotteryCode)">
            <i :class="now===parentToChild.lotteryCode?'icon ion-minus':'icon ion-plus'"></i>
            &nbsp; 广西快乐十分
        </div>

        <div class="item-accordion ng-binding" v-if="now===parentToChild.lotteryCode">
            <div src="'res/templates/app/gxklsf.html'" class="">
                <div class="rule-text">
                    <p>
                        广西福利彩票快乐十分经国家财政部批准，由中国福利彩票发行管理中心在广西区内发行，由广西福利彩票发行中心承销。该游戏的投注时间、开奖时间和开奖号码与广西福利彩票快乐十分完全同步，北京时间（GMT+8）每天上午9:00开到晚上21:30，每十五分钟开一次奖，每天开奖50期。</p>
                  <div class="orange">
                    <strong>游戏规则</strong>
                  </div>
                    <p>假设快乐十分开奖结果为1、2、3、4、5，那么正码是1、2、3、4，特码是5。（每个位数在开奖时，从1〜21中摇出一个结果）选号玩法。</p>
                    <ol>
                        <li>
                            <strong class="red">单双大小：</strong>根据正码一~正码四及特码开出的球号判断胜负。</li>
                        <li>1.大小：开出号码01~10为小，11~20为大，21为和。</li>
                        <li>2.单双：开出号码21为和。</li>
                        <li>
                            <strong class="red">尾大、小：</strong>开出之特码尾数大于或等于5为尾大，小于或等于4为尾小，出21为和。</li>
                        <li>
                            <strong class="red">合单双：</strong>以球号个位和十位数字之合来判断胜负，如01、12、16为合单；02、11、20为合双；出21为和。
                        </li>
                        <li>
                            <strong class="red">福禄寿喜：</strong>
                        </li>
                        <li>1.福：01、02、03、04、05</li>
                        <li>2.禄：06、07、08、09、10</li>
                        <li>3.寿：11、12、13、14、15</li>
                        <li>4.喜：16、17、18、19、20</li>
                        <li>5.若当期号码在相对应的球位落在下注四种类范围内，视为中奖。</li>
                        <li>
                            <strong class="red">色波：</strong>依特码、正码1~4将21个号码分为三种类，分别为红、蓝、绿（如下），再依三种类下注。</li>
                        <li>1.红：1、4、7、10、13、16、19</li>
                        <li>2.蓝：2、5、8、11、14、17、20</li>
                        <li>3.绿：3、6、9、12、15、18、21</li>
                        <li>4.若当期号码在相对应的球位落在下注三种类范围内，视为中奖。</li>
                        <li>
                            <strong class="red">合数单双：</strong>
                        </li>
                        <li>1.合单：指开出球号的个位数加上十位数之和为“单数”，如1、14、18。</li>
                        <li>2.合双：指开出球号的个位数加上十位数之和为“双数”，如11、15、19。</li>
                        <li>
                            <strong class="red">总和：</strong>
                        </li>
                        <li>1.总大小：数字总和值56~95为总大，数字总和值15~54为总小，所有5个开奖号码的总和值为55打和。</li>
                        <li>2.总单双：数字总和值是双数为总和双，数字总和值是单数为总和单。</li>
                        <li>
                            3.总尾大小：所有5个开奖号码的数字总和数值的个位数大于或等于5为总尾大，小于或等于4为总尾小假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖。
                        </li>
                        <li>
                            <strong class="red">龙虎：</strong>
                        </li>
                        <li>1.龙：第一球开奖号码大于第五球开奖号码，如第一球开出10，第五球开出7。</li>
                        <li>2.虎：第一球开奖号码小于第五球开奖号码，如第一球开出3，第五球开出7。</li>
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

