<template>
  <div v-if="parentToChild.type==='xync'">
    <div v-if="parentToChild.lotteryCode===parentToChild.oldCode" class="">
      <div class="item-stable item ng-binding" @click="toggleGroup(parentToChild.lotteryCode)">
        <i :class="now===parentToChild.lotteryCode?'icon ion-minus':'icon ion-plus'"></i>
        &nbsp; {{parentToChild.lotteryName}}快乐十分
      </div>
      <div class="item-accordion ng-binding" v-if="now===parentToChild.lotteryCode">
        <div src="'res/templates/app/farm.html'" class="">
          <div class="rule-text">
            <p class="ng-binding">「{{parentToChild.lotteryName}}快乐十分」是东方集团自主研发的彩票游戏，以东方集团彩票游戏开奖中心派彩为依据，该游戏的投注时间，北京时间（GMT+8）每天白天从上午00：00开到次日的00：00，东方{{parentToChild.lotteryName}}快乐十分每{{parentToChild.lotteryName}}钟开一次，一天开{{parentToChild.period}}期。</p>
            <strong>本公司{{parentToChild.lotteryName}}快乐十分具体游戏规则如下︰</strong>
            <div class="orange">
              <strong>两面盘玩法</strong>
            </div>
            <ol>
              <li>大小∶开出之号码大于或等于11为大，小于或等于10为小</li>
              <li>单双∶开出号码为双数叫双，如8、16；号码为单数叫单，如19、5。</li>
              <li>尾大、小∶开出之尾数大于或等于5为尾大，小于或等于4为尾小。</li>
              <li>合单双∶以号码个位和十位数字之和来判断胜负，如01、12、16为合单；02、11、20为合双。</li>
              <li>中发白∶将20个号码分为三种类，分别为中、发、白（如下），再依三种类下注。若当期号码在相对应的球位落在下注三种类范围内，视为中奖。
                <br>中∶开出之号码为01、02、03、04、05、06、07<br>发∶开出之号码为08、09、10、11、12、13、14<br>白∶开出之号码为15、16、17、18、19、20<br></li>
              <li>方位∶将20个号码分为四种类（如下），再以四种类下注。若当期号码在相应的球位落在下注四种类范围内，视为中奖。
                <br>东∶开出之号码为01、05、09、13、17<br>南∶开出之号码为02、06、10、14、18<br>西∶开出之号码为03、07、11、15、19
                <br>北∶开出之号码为04、08、12、16、20<br>
              </li>
            </ol>
            <div class="orange">
              <strong>总和玩法</strong>
            </div>
            <ol>
              <li>总大小∶所有8个开奖号码的数字总和值85到132为总大；所有8个开奖号码的数字总和值36到83为总分小；所有8个开奖号码的数字总和值为84打和。
                假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖，打和不计算结果。</li>
              <li>总单双∶所有8个开奖号码的数字总和值是单数为总和单，如数字总和值是31、51； 所有8个开奖号码的数字总和值是双数为总和双，如数字总和是42 、80；</li>
              <li>总尾大小∶所有8个开奖号码的数字总和数值的个位数大于或等于5为总尾大，小于或等于4为总尾小。</li>
              <li>龙虎∶以第一球的中奖号码和第八球的中奖号码做为对奖号码。
                <br>龙∶开出之号码第一球的中奖号码大于第八球的中奖号码。如第一球开出14 第八球开出09；第一球开出05 第八球开出01...中奖为龙。
                <br>虎∶开出之号码第一球的中奖号码小于第八球的中奖号码。如第一球开出14 第八球开出16；第一球开出05 第八球开出08...中奖为虎。
                <br></li>
            </ol>

            <div class="orange">
              <strong>连码玩法</strong>
            </div>
            <ol>
              <li>选二任选∶指从01至20中任意选择2个号码对开奖号码中任意2个位置的投注。投注号码与开奖号码中任意2个位置的号码相符，即中奖。</li>
              <li>选二连组∶指从01至20中任意选择2个号码对开奖号码中按开奖顺序出现的2个连续位置的投注。 投注号码与开奖号码中按开奖顺序出现的2个连续位置的号码相符（顺序不限），即中奖。</li>
              <li>选二连直∶指从01至20中任意选择2个号码对开奖号码中按开奖顺序出现的2个连续位置按位相符的投注。 投注号码与开奖号码中按开奖顺序出现的2个连续位置的号码按位相符，即中奖。</li>
              <li>选三任选∶指从01至20中任意选择3个号码对开奖号码中任意3个位置的投注。投注号码与开奖号码中任意3个位置的号码相符，即中奖。</li>
              <li>选三前组∶指从01至20中任意选择3个号码对开奖号码中按开奖顺序出现的前3个连续位置的投注。 投注号码与开奖号码中按开奖顺序出现的前3个位置的号码相符（顺序不限），即中奖。</li>
              <li>选三前直∶指从01至20中任意选择3个号码对开奖号码中按开奖顺序出现的前3个连续位置按位相符的投注。投注号码与开奖号码中按开奖顺序出现的前3个位置的号码按位相符，即中奖。</li>
              <li>选四任选∶指从01至20中任意选择4个号码，对开奖号码中任意4个位置的投注。投注号码与开奖号码中任意4个位置的号码相符，即中奖。</li>
              <li>选五任选∶指从01至20中任意选择5个号码，对开奖号码中任意5个位置的投注。投注号码与开奖号码中任意5个位置的号码相符，即中奖。</li>
            </ol>
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

