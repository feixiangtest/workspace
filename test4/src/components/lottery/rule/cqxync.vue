<template>
    <div id="cqxync" v-if="parentToChild.lotteryCode==='cqxync'" class="addRule">
        <div class="item-stable item ng-binding" @click="toggleGroup(parentToChild.lotteryCode)">
            <i :class="now===parentToChild.lotteryCode?'icon ion-minus':'icon ion-plus'"></i>
            &nbsp; 重庆幸运农场
        </div>

        <div class="item-accordion ng-binding" v-if="now===parentToChild.lotteryCode">
            <div src="'res/templates/app/cqxync.html'" class="">
                <div class="rule-text">
                    <p>
                        每期重庆幸运农场开奖球数共八粒。每粒球除了总和玩法，其它都有单独的投注页面。重庆幸运农场每天开97期，每期间隔10分钟。投注时间为8分钟，等待开奖时间为2分钟，北京时间（GMT+8）每天白天从上午10：00开到凌晨02：00。</p>
                    <strong>本公司重庆幸运农场具体游戏规则如下：</strong>
                    <div class="orange">
                      <strong>两面：指单、双；大、小、尾大、尾小。</strong>
                    </div>
                    <ol>
                        <li>

                        <li>单、双：号码为双数叫双，如8、16；号码为单数叫单，如19、5。</li>
                        <li>大、小：开出之号码大于或等于11为大，小于或等于10为小。</li>
                        <li>尾大、尾小：开出之尾数大于或等于5为尾大，小于或等于4为尾小。</li>
                        <li>合数单双：开出的号码的个位和十位相加，所得数字为单数的为合单，如05、12；所得数字为双数的为合双，如08、19。</li>
                        <li>每一个号码为一投注组合，假如投注号码为开奖号码并在所投的球位置，视为中奖，其余情形视为不中奖。</li>
                    </ol>
                        <div class="orange">
                          <strong>中发白：</strong>
                        </div>
                    <ol>
                        <li>中：开出之号码为01、02、03、04、05、06、07</li>
                        <li>发：开出之号码为08、09、10、11、12、13、14</li>
                        <li>白：开出之号码为15、16、17、18、19、20</li>
                    </ol>
                  <div class="orange">
                    <strong>方位：</strong>
                  </div>
                  <ol>
                        <li>东：开出之号码为01、05、09、13、17</li>
                        <li>南：开出之号码为02、06、10、14、18</li>
                        <li>西：开出之号码为03、07、11、15、19</li>
                        <li>北：开出之号码为04、08、12、16、20</li>
                  </ol>
                  <div class="orange">
                    <strong>总和单双</strong>
                  </div>
                    <ol>
                        <li>
                            所有8个开奖号码的数字总和值是单数为总和单，如数字总和值是31、51；所有8个开奖号码的数字总和值是双数为总和双，如数字总和是42、80；假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖。
                        </li>
                    </ol>
                  <div class="orange">
                    <strong>总和大小</strong>
                  </div>
                  <ol>
                        <li>
                            所有8个开奖号码的数字总和值85到132为总大；所有8个开奖号码的数字总和值36到83为总分小；所有8个开奖号码的数字总和值为84打和；如开奖号码为01、20、02、08、17、09、11，数字总和是68，则总分小。假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖，打和不计算结果。
                        </li>
                  </ol>
                  <div class="orange">
                    <strong>总尾大小</strong>
                  </div>
                  <ol>
                        <li>
                            所有8个开奖号码的数字总和数值的个位数大于或等于5为总尾大，小于或等于4为总尾小；假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖。
                        </li>
                  </ol>
                  <div class="orange">
                            <strong>选二任选</strong>
                  </div>
                  <ol>
                        <li>指从01至20中任意选择2个号码对开奖号码中任意2个位置的投注。 投注号码与开奖号码中任意2个位置的号码相符，即中奖。</li>


                  </ol>
                  <div class="orange">
                    <strong>选二连组</strong>
                  </div>
                  <ol>

                  <li>指从01至20中任意选择2个号码对开奖号码中按开奖顺序出现的2个连续位置的投注。 投注号码与开奖号码中按开奖顺序出现的2个连续位置的号码相符（顺序不限），即中奖。
                        </li>
                  </ol>
                  <div class="orange">
                    <strong>选三任选</strong>
                  </div>
                  <ol>
                        <li>指从01至20中任意选择3个号码对开奖号码中任意3个位置的投注。 投注号码与开奖号码中任意3个位置的号码相符，即中奖。</li>
                  </ol>
                  <div class="orange">
                    <strong>选三前组</strong>
                  </div>
                  <ol>

                  <li>指从01至20中任意选择3个号码对开奖号码中按开奖顺序出现的前3个连续位置的投注。 投注号码与开奖号码中按开奖顺序出现的前3个位置的号码相符（顺序不限），即中奖。
                        </li>
                  </ol>
                  <div class="orange">
                    <strong>选四任选</strong>
                  </div>
                  <ol>
                  <li>指从01至20中任意选择4个号码，对开奖号码中任意4个位置的投注。 投注号码与开奖号码中任意4个位置的号码相符，即中奖。</li>

                  </ol>
                  <div class="orange">
                    <strong>选五任选</strong>
                  </div>
                  <ol>
                  <li>指从01至20中任意选择5个号码，对开奖号码中任意5个位置的投注。 投注号码与开奖号码中任意5个位置的号码相符，即中奖。</li>
                  </ol>
                  <div class="orange">
                    <strong>选二连直</strong>
                  </div>
                  <ol>
                  <li>
                            指从01至20中任意选择2个号码对开奖号码中按开奖顺序出现的2个连续位置按位相符的投注。 投注号码与开奖号码中按开奖顺序出现的2个连续位置的号码按位相符，即中奖。
                        </li>

                  </ol>
                  <div class="orange">
                    <strong>选三前直</strong>
                  </div>
                  <ol>
                  <li>
                            指从01至20中任意选择3个号码对开奖号码中按开奖顺序出现的前3个连续位置按位相符的投注。&nbsp;&nbsp;投注号码与开奖号码中按开奖顺序出现的前3个位置的号码按位相符，即中奖。
                        </li>
                  </ol>
                  <div class="orange">
                    <strong>第一球~第八球</strong>
                  </div>
                  <ol>
                        <li>
                            指1~8球中，假如投注号码为开奖号码并在所投球的位置，视为中奖，如第一球开奖号码是08，下注第一球为08者视为中奖，第五球开奖号码是12，下注第五球为12者视为中奖，其余情形视为不中奖
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

