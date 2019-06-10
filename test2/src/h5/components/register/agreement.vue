<template>
    <div class="details-main main-box" style="background: #fff;"> <!-- ART-68 -->
      <div class="agreement-box yow-content">
        <div class="tips">立即开通本公司账户，享受最优惠的各项红利!</div>
        <ul>
            <li><span class="red">&bull; </span>
                本公司只接受合法博彩年龄的客户申请。同时我们保留要求客户提供其年龄证明的权利。</li>
            <li><span class="red">&bull; </span>在本公司进行注册时所提供的全部信息必须在各个方面都是准确和完整的。在使用借记卡或信用卡时，持卡人的姓名必须与在网站上注册时的一致。</li>
            <li><span class="red">&bull; </span>在开户后进行一次有效存款，恭喜您成为本公司有效会员!</li>
            <li><span class="red">&bull; </span>存款免手续费，开户最低入款金额100人民币，最高单次入款金额50000人民币。</li>
            <li><span class="red">&bull; </span>成为本公司有效会员后，客户有责任以电邮、联系在线客服、在本公司网站上留言等方式，随时向本公司提供最新的个人资料。</li>
            <li><span class="red">&bull; </span>经本公司发现会员有重复申请账号行为时，有权将这些账户视为一个联合账户。我们保留取消、收回会员所有优惠红利，以及优惠红利所产生的盈利之权利。每位玩家、每一住址、每一电子邮箱、每一电话号码、相同支付卡/信用卡号码，以及共享计算机环境 (例如:网吧、其他公共用计算机等)只能够拥有一个会员账号，各项优惠只适用于每位客户在本公司唯一的账户。</li>
            <li><span class="red">&bull; </span>无论是个人或是团体，如有任何威胁、滥用本公司优惠的行为，本公司保留权利取消、收回由优惠产生的红利，并保留权利追讨最高50%手续费。</li>
            <li><span class="red">&bull; </span>所有本公司的优惠是特别为玩家而设，在玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，本公司保留权利要求客户向我们提供充足有效的文件， 并以各种方式辨别客户是否符合资格享有我们的任何优惠。</li>
            <li><span class="red">&bull; </span>客户一经注册开户，将被视为接受所有颁布在本公司网站上的规则与条例。</li>
            <li>本公司是使用传奇软件所提供的在线娱乐软件，若发现您在同系统的娱乐城上开设多个会员账户，并进行套利下注；本公司有权取消您的会员账号并将所有下注盈利取消！ </li>
        </ul>
      </div>
      <div class="btn-wrap no-position" style="margin-top: 15px;"> <!-- ART-68 -->
            <div class="btn one-btn" @click="closeAgreement()">我知道了</div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'agreement',
  computed: {
    openAgreement () {
      if (this.$store.state.h5Home.openAgreement) {
        return this.$store.state.h5Home.openAgreement
      } else {
        return JSON.parse(sessionStorage.getItem('openAgreement'))
      }
    }
  },
  methods: {
    closeAgreement () {
      this.$store.state.h5Home.openAgreement = false
      this.$store.state.h5Home.headTitle = '注册'
    }
  },
  mounted () {
    window.indexMain.gpoScrollTop()
    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headTitle = '开户协议'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headRight = ''
  },
  components: {

  }
}
</script>

