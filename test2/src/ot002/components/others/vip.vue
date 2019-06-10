<template>
  <div id="vip">
    <div style='position:absolute;top:140px;left:0;right:0;'>
      <menu-bar></menu-bar>
    </div>
    <div class="container">
      <div class="inner-banner">
        <figure class="vip-banner"></figure>
      </div>
      <div class="indexCont vip-content-bg">
        <div class="contentBox">
          <div class="vip-content">
            <div id="vip-tab-wrap">
              <div class="vip-tab-bar">
                <ul class="clearfix">
                  <li v-for='(item,index) in vipTab' :key='index' @click='curTabIndex = index' :class='{on:curTabIndex == index}'>
                    {{item}}
                  </li>
                  <!-- <li class="on">关于VIP</li>
                  <li>贵宾福利</li>
                  <li>常见问题</li>
                  <li>贵宾等级</li> -->
                </ul>
              </div>
              <div class="vip-tab-details">
                <div class="vip-details-box" v-show='curTabIndex===0'>
                  <a><img src="/resource/ot003/images/vip_tab1_pic_01.jpg" alt=""></a>
                  <a><img src="/resource/ot003/images/vip_tab1_pic_02.jpg" alt=""></a>
                  <a href="#"><img src="/resource/ot003/images/vip_tab1_pic_03.jpg" alt=""></a>
                  <a href="#"><img src="/resource/ot003/images/vip_tab1_pic_04.jpg" alt=""></a>
                  <a href="#"><img src="/resource/ot003/images/vip_tab1_pic_05.jpg" alt=""></a>
                  <a href="#"><img src="/resource/ot003/images/vip_tab1_pic_06.jpg" alt=""></a>
                  <a><img src="/resource/ot003/images/vip_tab1_pic_07.jpg" alt=""></a>
                </div>
                <div class="vip-details-box" v-show='curTabIndex===1'>
                  <h2 class="vip-details-titel">关于VIP会员宗旨及使命</h2>
                  <div class="vip-details-content">
                    <img src="/resource/ot003/images/vip_tab2_pic.jpg" alt="">
                  </div>
                </div>
                <div class="vip-details-box" v-show='curTabIndex===2'>
                  <h2 class="vip-details-titel">VIP福利</h2>
                  <div class="vip-details-content">
                    <img src="/resource/ot003/images/vip_tab3_pic.jpg" alt="">
                  </div>
                </div>
                <div class="vip-details-box" v-show='curTabIndex===3'>
                  <h2 class="vip-details-titel">常见问题、规则与条款</h2>
                  <div class="vip-details-content">
                    <p>贵宾厅计划如何实施？<br> 从您注册成为会员，第一次投注开始，积极投注您就会由系统管理定期邀请。
                      <br><br> 如何获得VIP资格并达到钻石级别？
                      <br> 请访问我们网站，并点击这里查看更多VIP贵宾信息
                      <br><br> VIP会员有什么不同？
                      <br> 进入贵宾等级在“VIP待遇”查看每个级别福利。
                      <br><br> 作为VIP会员，奖励会失效吗？
                      <br> 是或不是。黄金VIP级别积分有效期为3个月；钻石VIP级别有效期为6个月；皇冠VIP级别有效期为12个月。
                      <br><br> 每位VIP会员等级的有效性是什么？
                      <br> VIP会员等级状态从黄金VIP，钻石VIP和皇冠VIP，您可以看到每个级别的有效和状态。请在贵宾等级页面查看规则条款使用。
                      <br><br> 贵宾厅分多少级别？
                      <br> 总共有4个级别。有黄金，钻石和皇冠构成。享受“贵宾之所”提供的各项福利，您值得如此礼遇。
                      <br><br> 作为贵宾厅VIP会员，是否需要支付月费或年费？
                      <br> 不需要，这个项目旨在为所有忠诚会员并积极支持vip.cm玩家回馈和游戏体验。
                      <br><br> 如何申请成为贵宾厅VIP会员？
                      <br><br> 每月第1个星期一至下月第1个星期一前的周日作为一个审核周期，会员确定当月达到申请条件可在第二月周一发送邮件至gbt88vip@gmail.com，审核周期固定为7天告知会员审核结果。
                      <br> 邮件格式如下：
                      <br> 邮件主题：申请（贵宾厅）黄金VIP
                      <br> 邮件内容：会员账号：gbt88.com
                      <br> 手机号码：158******
                      <br> 审核通过后，专员将在1个工作日内为您致电说明申请审核状态及其他事项。
                    </p>
                    <p style="line-height: 40px;margin-top: -55px;">贵宾厅仅提供给vip.cm注册会员<br> 贵宾厅娱乐城管理保留在无通知的情况下改变，修改，增加或删除规则和条款的权利
                      <br> VIP会员需遵循网站所规定的条款规则
                      <br> 我们的贵宾厅VIP会员仅提供娱乐性质的玩家，贵宾厅娱乐才将有权决定取消玩家参与任何问题资格的权利
                      <br> 贵宾厅娱乐城将有权在任何时间查看客户的交易记录，登录状态。如我们发现并确定任何终端用户或个人团体滥用条款，我们有权取消资格
                      <br> 贵宾厅娱乐城保留修改，解释或无效VIP会员规则的权利
                      <br> 对于会员兑换任何礼物/奖励我们没有提供，将保留权利更换为其他等值礼品
                      <br> VIP级别积分兑换折扣不适用于兑换免费投注
                      <br> 该项目无需交付任何费用，旨在为所有忠诚会员并积极支持vip.cm玩家回馈和游戏体验
                      <br> 所有VIP会员参加参与活动仅限自己的账号
                      <br> 我们保留权利判断会员资格，并且保留权利拒绝任何会员加入我们VIP团队
                      <br> 任何滥用优惠条款或VIP数据及其他规则将导致取消会员资格并扣除因此获得的奖励
                      <br> 贵宾厅娱乐城保留最终决定和全权处理所有项目的权利
                      <br> 贵宾厅VIP会员同样适用于一般的规则和条款
                      <br> 贵宾厅不接受任何会员将会员资格转让给第三方会员
                      <br> 贵宾厅是一项特别项目，专业的服务和愉快的合作需要双方共同配合完成
                    </p>
                  </div>
                </div>
                <div class="vip-details-box" style="display: none">
                  <h2 class="vip-details-titel">VIP等级</h2>
                  <div class="vip-details-content">
                    <img src="/resource/ot003/images/vip_tab4_pic_01.jpg" alt="">
                    <img src="/resource/ot003/images/vip_tab4_pic_02.jpg" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import menuBar from '../header/menuBar'
  export default {
    name: 'vip',
    data () {
      return {
        vipTab: ['关于VIP', '贵宾福利', '常见问题', '贵宾等级'],
        curTabIndex: 0
      }
    },
    components: {
      menuBar
    }
  }
</script>

