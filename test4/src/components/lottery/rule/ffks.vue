<template>
    <div v-if="parentToChild.type==='ks'">
        <div id="ks3" v-if="parentToChild.lotteryCode===parentToChild.oldCode" ng-controller="Ruleog3" >
            <div class="item-stable item ng-binding" @click="toggleGroup(parentToChild.lotteryCode)">
                <i :class="now===parentToChild.lotteryCode?'icon ion-minus':'icon ion-plus'"></i>
                &nbsp; {{parentToChild.lotteryName}}快3
            </div>
            <div class="item-accordion ng-binding" v-if="now===parentToChild.lotteryCode">
                <div src="'res/templates/app/jstb.html'" >
                    <div class="rule-text">
                        <strong>{{parentToChild.lotteryName}}快3开奖时间：</strong>
                        <dd>
                          <ul>
                            <li>游戏项目：{{parentToChild.lotteryName}}</li>
                            <li>开奖时间：00:00-23:59(北京时间)</li>
                            <li>每日期数：001-{{parentToChild.period}}</li>
                            <li>开奖频率： 每{{parentToChild.lotteryName}}钟</li>
                          </ul>
                        </dd>
                        <div class="orange">
                          <strong>{{parentToChild.lotteryName}}快3</strong>
                        </div>
                        <dd>
                            <ul>
                                <li>大小：三个开奖号码总和值11~17 为大；总和值4~10 为小；若三个号码相同，则不算中奖。</li>
                                <li>
                                    单双:开出的三个号码和为单既是“单”，如2、2、3。开出的三个号码和为双既是“双”，如3、3、2.当投注位数单双与开奖结果的位数单双相符时，即为中奖。若三个号码相同，则不算中奖。
                                </li>
                                <li>
                                    1：三个开奖号码其中一个与所选号码相同时，即为中奖；举例：如开奖号码为1、1、3，则投注三军1或三军3皆视为中奖
                                    <br> 2：其中有一个相同为1赔1，两个相同为1赔2，三个相同为1赔3
                                </li>
                                <li>围骰/全骰:围骰：开奖号码三字同号、且与所选择的围骰组合相符时，即为中奖。全骰：全选围骰组合、开奖号码三字同号，即为中奖。
                                </li>
                                <li>点数:开奖号码总和值为4、5、6、7、8、9、10、11、12、13、14、15、16、17 时，即为中奖；若开出3、18，则不算中奖。举例：如开奖号码为1、2、3、总和值为6、则投注「6」即为中奖。
                                </li>
                                <li>
                                    长牌:任选一长牌组合、当开奖结果任2码与所选组合相同时，即为中奖。举例：如开奖号码为1、2、3、则投注长牌12、长牌23、长牌13皆视为中奖。
                                </li>
                                <li>短牌:开奖号码任两字同号、且与所选择的短牌组合相符时，即为中奖。举例：如开奖号码为1、1、3、则投注短牌1、1，即为中奖。
                                </li>
                            </ul>
                        </dd>
                    </div>
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

