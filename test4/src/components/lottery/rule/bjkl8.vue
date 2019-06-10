<template>
    <div id="bjkl8" v-if="parentToChild.lotteryCode==='bjkl8'" class="">
        <div class="item-stable item ng-binding" @click="toggleGroup(parentToChild.lotteryCode)">
            <i :class="now===parentToChild.lotteryCode?'icon ion-minus':'icon ion-plus'"></i>
            &nbsp; 北京快8
        </div>
        <div class="item-accordion ng-binding" v-if="now===parentToChild.lotteryCode">
            <div class="rule-text">
                <div src="'res/templates/app/kl8.html'">
                  <strong>北京快乐8开奖时间：</strong>
                  <table class="tabrule">
                    <tbody>
                    <tr>
                      <th width="50%" bgcolor="#AFAFE4" align="center" class="subtitle2">开奖时间</th>
                      <th width="25%" bgcolor="#AFAFE4" align="center" class="subtitle2">每日期数</th>
                      <th width="25%" bgcolor="#AFAFE4" align="center" class="subtitle2">开奖频率</th></tr>
                    <tr>
                      <td bgcolor="#FFF7F0" class="point" align="center">09:00-23:55(北京时间)</td>
                      <td bgcolor="#FFF7F0" class="point" align="center">001-179</td>
                      <td bgcolor="#FFF7F0" class="point" align="center">每5分钟</td></tr>
                    </tbody>
                  </table>
                    <strong>本公司北京快乐8具体游戏规则如下：</strong>
                    <div class="orange">
                      <strong>正码</strong>
                    </div>
                    <dl>
                        <dd>
                            <ul>
                                <li>
                                    投注的1个号码与当期摇出的20个号码中的任1个号码相同，则中奖
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <div class="orange">
                      <strong>总和</strong>
                    </div>
                    <dl>
                        <dd>
                            <ul>
                                <li>
                                    以所有开出的全部20个号码加起来的和值来判定。
                                </li>
                                <li>
                                    总和大/小：20个号码加总的和值大于810，为和大；20个号码加总的和值小于810，则为和小。
                                </li>
                                <li>
                                    总和单/双：20个号码加总的和值为单，叫做和单；20个号码加总的和值为双，叫做和双。
                                </li>
                                <li>
                                    总和810：20个号码加总的和值等于810，叫和值810。(当和值等于810,则大小退回本金)举例：开奖号码为1，2，3，4，5，6，7，8，9，10，11，12，13，14，15，16，17，18，19，20；那么此20个开奖号码的和值总和为210，则为小，为双。则投注小和双者中奖。投注大、单、和值810者不中奖。
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <div class="orange">
                      <strong>总和过关</strong>
                    </div>
                    <dl>
                        <dd>
                            <ul>
                                <li>
                                    开出的20个号码的总和的游戏，分为「大单」，「小单」，「大双」和「小双」。
                                </li>
                                <li>
                                    总和大于810为「总数大」,小于810为「总数小」。
                                </li>
                                <li>
                                    总和为双数叫「双」，单数叫「单」。
                                </li>
                                <li>
                                    通过大小和单双组合产生「大单」，「小单」，「大双」和「小双」四种结果。
                                </li>
                                <li>
                                    总和等于810，则视为和局。
                                </li>
                                <li>
                                    举例：开奖号码为01、04、05、10、11、13、20、27、30、32、33、36、40、47、54、59、61、64、67、79，总和是693，总和小于810，并且是单数，则为「小单」。下注「小单」为赢，反之则输。
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <div class="orange">
                      <strong>前后和</strong>
                    </div>
                    <dl>
                        <dd>
                            <ul>
                                <li>
                                    开奖号码1至40为前盘号码，41至80为后盘号码。
                                </li>
                                <li>
                                    开出的20个号码中，前盘号码（1-40）在此局开出号码数目占多数时，此局为：前(多)。
                                </li>
                                <li>
                                    开出的20个号码中，后盘号码（41-80）在此局开出号码数目占多数时，此局为:后(多)。
                                </li>
                                <li>
                                    开出的20个号码中，前盘号码（1－40）和后盘号码（41-80）在此局开出的数目相同时（各10个数字），此局为：前后(和)。且投注前（多）或后（多）视为不中奖，不返回投注金额。
                                </li>
                                <li>
                                    举例：此局开出1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20. 此局为：前(多)。
                                </li>
                                <li>
                                    举例：此局开出41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60 此局为：后(多)。
                                </li>
                                <li>
                                    举例：此局开出 1,2,3,4,5,6,7,8,9,10,41,42,43,44,45,46,47,48,49,50 此局为：前后(和)。
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <div class="orange">
                      <strong>单双和</strong>
                    </div>
                    <dl>
                        <dd>
                            <ul>
                                <li>
                                    开奖号码中1，3，5，7，…，75，77，79为单数号码，2，4，6，8，……，76，78，80为双数号码。当期开出的20个中奖号码中，如单数号码数目占多数时（超过10个），则为单(多)，投注单(多)中奖；双数号码占多数时（超过10个），则为双(多)，投注双(多)中奖；如果单数和双数号码数目相同时（均为 10个），则为单双(和)，投注单双(和)者中奖。且投注单（多）或双（多）视为不中奖，不返回下注金额。
                                </li>
                                <li>
                                    举例：此期开出1，3，5，7，9，11，13，15，17，19，21，22，24，26，28，30，32，34，46，68， 其中单数11个双数9个，此期为：单(多)。
                                </li>
                                <li>
                                    举例：此期开出2，4，6，8，10，12，14，16，44，48，66，68，25，27，31，35，37，39，41，55， 其中双数12个单数8个，此期为：双(多)。
                                </li>
                                <li>
                                    举例：此期开出2，4，6，8，10，12，14，16，18，20，41，43，45，47，49，51，53，55，57，59， 其中单数10个双数10个，此期为：单双(和)。
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <div class="orange">
                      <strong>五行</strong>
                    </div>
                    <dl>
                        <dd>
                            <ul>
                                <li>
                                    开出的20个号码的总和分在5个段，以金、木、水、火、土命名：金（210～695）、木（696～763）、水（764～855）、火（856～923）和土（924～1410）。
                                </li>
                                <li>
                                    举例：开奖号码为01、04、05、10、11、13、20、27、30、32、33、36、40、47、54、59、61、64、67、79，总和是693，则总分数在210－695段内，则开出的是「金」。下注「金」为赢，反之则输。
                                </li>
                            </ul>
                        </dd>
                    </dl>
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

