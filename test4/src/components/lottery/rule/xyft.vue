<template>
    <div id="xyft" v-if="parentToChild.lotteryCode==='xyft'" class="">
        <div class="item-stable item ng-binding" @click="toggleGroup(parentToChild.lotteryCode) ">
            <i :class="now===parentToChild.lotteryCode?'icon ion-minus':'icon ion-plus'"></i>
            &nbsp; 幸运飞艇
        </div>
        <div class="item-accordion ng-binding" v-if="now===parentToChild.lotteryCode">

            <div class="rule-text">
                <strong>幸运飞艇开奖时间：</strong>
              <table class="tabrule">
                <tbody>
                <tr >
                  <th  width="50%" bgcolor="#AFAFE4" align="center" class="subtitle2">开奖时间</th>
                  <th  width="25%" bgcolor="#AFAFE4" align="center" class="subtitle2">每日期数</th>
                  <th  width="25%" bgcolor="#AFAFE4" align="center" class="subtitle2">开奖频率</th></tr>
                <tr >
                  <td  bgcolor="#FFF7F0" align="center" class="point">13:09—04:04(北京时间)</td>
                  <td  bgcolor="#FFF7F0" align="center" class="point">001-180</td>
                  <td  bgcolor="#FFF7F0" align="center" class="point">每5分钟</td></tr>
                </tbody>
              </table>
                <br/>
              <div class="orange"><strong>两面盘（冠军~第十名）</strong></div>
                <dd>
                    <ul>
                        <li>
                            大小∶开出之号码大于或等于6为大，小于或等于5为小。
                        </li>
                        <li>
                            单双∶开出之号码为双数叫双，如4、8；号码为单数叫单，如5、9。
                        </li>
                        <li>
                            冠军 龙/虎∶"第一名"之船号大于"第十名"之船号视为「龙」中奖、反之小于视为「虎」中奖，其馀情况视为不中奖。
                        </li>
                        <li>
                            亚军 龙/虎∶"第二名"之船号大于"第九名"之船号视为「龙」中奖、反之小于视为「虎」中奖，其馀情况视为不中奖。
                        </li>
                        <li>
                            季军 龙/虎∶"第三名"之船号大于"第八名"之船号视为「龙」中奖、反之小于视为「虎」中奖，其馀情况视为不中奖。
                        </li>
                        <li>
                            第四名 龙/虎∶"第四名"之船号大于"第七名"之船号视为「龙」中奖、反之小于视为「虎」中奖，其馀情况视为不中奖。
                        </li>
                        <li>
                            第五名 龙/虎∶"第五名"之船号大于"第六名"之船号视为「龙」中奖、反之小于视为「虎」中奖，其馀情况视为不中奖。
                        </li>
                    </ul>
                </dd>
              <div class="orange"><strong>两面盘（冠亚和）: "冠军船号 + 亚军船号 = 冠亚和"</strong></div>
                <dd>
                    <ul>
                        <li>
                            冠亚和大小∶以冠军船号和亚军船号之和大小来判断胜负，"冠亚和"大于11为大，小于或等于11为小。假如投注组合符合中奖结果，视为中奖，其馀情形视为不中奖。
                        </li>
                        <li>
                            冠亚和单双∶以冠军船号和亚军船号之和单双来判断胜负，"冠亚和"为双数叫双，为单数叫单。 假如投注组合符合中奖结果，视为中奖，其馀情形视为不中奖。
                        </li>
                        <li>
                            冠亚和指定: 以指定冠军船号和亚军船号之和来判断胜负；冠亚船号总和可能出现结果为3~19，投中对应"冠亚和指定"数字视为中奖，其馀情形视为不中奖
                        </li>
                    </ul>
                </dd>
              <div class="orange"><strong>冠军~第十名船号指定:</strong></div>
                <dd>
                    <ul>
                        <li>
                            冠军~第十名船号指定: 每一个船号为一投注组合，开奖结果"投注船号"对应所投名次视为中奖，其馀情形视为不中奖。
                        </li>
                    </ul>
                </dd>
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

