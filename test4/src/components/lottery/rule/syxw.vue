<template>
    <div v-if="parentToChild.type==='syxw'">
        <div class="item-stable item ng-binding" @click="toggleGroup(parentToChild.lotteryCode)">
            <i :class="now===parentToChild.lotteryCode?'icon ion-minus':'icon ion-plus'"></i>
            &nbsp; {{parentToChild.lotteryName}}十一选五
        </div>

        <div class="item-accordion ng-binding" v-if="now===parentToChild.lotteryCode">
            <div class="rule-text">
                <p>「{{parentToChild.lotteryName}}十一选五」是东方集团自主研发的彩票游戏，以东方集团彩票游戏开奖中心派彩为依据，该游戏的投注时间，北京时间（GMT+8）每天白天从上午00：00开到次日的00：00，{{parentToChild.lotteryName}}十一选五每{{parentToChild.lotteryName}}钟开一次，一天开{{parentToChild.period}}期。</p>
                <strong>本公司一分11选5具体游戏规则如下（以下所有投注皆含本金。）：</strong>
                <div class="orange">
                  <strong>【单码】- 指第一球、第二球、第三球、第四球、第五球出现的顺序与号码为派彩依据。</strong>
                </div>
                <ol>
                    <li>1.单号：如现场滚球第一个开奖号码为10号，投注第一球为10号则视为中奖，其它号码视为不中奖
                        大小：开出的号码大于或等于6为大，小于或等于5为小，开出11为和 (不计算输赢)。
                    </li>
                    <li>2.单双：号码为双数叫双，如2、8；号码为单数叫单，如5、9；开出11为和 (不计算输赢)。</li>
                </ol>
                <div class="orange">
                  <strong>【总和】-以全部开出的5个号码，加起来的总和来判定。</strong>
                </div>
                <ol>
                    <li>1.总和大小: 所有开奖号码数字加总值大于30为和大；总和值小于30为和小；若总和值等于30为和 (不计算输赢)。</li>
                    <li>2.总和单双: 所有开奖号码数字加总值为单数叫和单，如11、31；加总值为双数叫和双，如42、30。</li>
                    <li>3.总和尾数大小: 所有开奖号码数字加总值的尾数，大于或等于5为尾大，小于或等于4为尾小。</li>

                </ol>
                <div class="orange">
                    <strong>【龙虎】</strong>
                </div>
                <ol>
                    <li>1.龙：第一球开奖号码大于第五球开奖号码，如第一球开出10，第五球开出7。</li>
                    <li>2.虎：第一球开奖号码小于第五球开奖号码，如第一球开出3，第五球开出7。</li>
                </ol>
                  <div class="orange">
                    <strong>选号- 选号玩法是由1~11号中，选出1~5个号码为一投注组合来进行投注。</strong>
                  </div>
                <ol>
                    <li>1.一中一: 投注1个号码与当期开奖的5个号码中任1个号码相同，视为中奖。</li>
                    <li>2.任选二: 投注2个号码与当期开奖的5个号码中任2个号码相同(顺序不限)，视为中奖。</li>
                    <li>3.任选三: 投注3个号码与当期开奖的5个号码中任3个号码相同(顺序不限)，视为中奖。</li>
                    <li>4.任选四: 投注4个号码与当期开奖的5个号码中任4个号码相同(顺序不限)，视为中奖。</li>
                    <li>5.任选五: 投注5个号码与当期开奖的5个号码中5个号码相同(顺序不限)，视为中奖。</li>
                    <li>6.任选六: 投注6个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
                    <li>7.任选七: 投注7个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
                    <li>8.任选八: 投注8个号码中任5个号码与当期开奖的5个号码相同(顺序不限)，视为中奖。</li>
                    <li>9.组选前二: 投注的2个号码与当期顺序开出的5个号码中的前2个号码相同，视为中奖。</li>
                    <li>10.组选前三: 投注的3个号码与当期顺序开出的5个号码中的前3个号码相同，视为中奖。</li>
                    <li>11.直选前二: 投注的2个号码与当期顺序开出的5个号码中的前2个号码相同且顺序一致，视为中奖。</li>
                    <li>12.直选前三: 投注的3个号码与当期顺序开出的5个号码中的前3个号码相同且顺序一致，视为中奖。</li>
                </ol>
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

