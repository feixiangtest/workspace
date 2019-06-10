<template>
    <div id="indexFoot">
        <div class="footer">
            <div class="center">
                <div class="footer-feature-wrap clearfix">
                    <div class="feature-service">
                        <div class="feature-title">
                            颠覆性产品 <span>SUBVERSIVE PRODUCTS</span>
                        </div>
                        <div class="feature-text">每一款全新上线的传奇软件产品都是经过大量测试后证实最符合亚洲人的产品，这是一个对既定现状做出强势挑战的创新团队。</div>
                        <div class="feature-title feature-title-partner">
                            合作伙伴 <span>PARTNERS</span>
                        </div>
                        <div class="img-partner"></div>
                        <div class="feature-title feature-title-help">
                            使用帮助 <span>USE HELP</span>
                        </div>
                        <ul class="clearfix">
                            <li>如何存款</li>
                            <li>游戏帮助</li>
                            <li>隐私保护</li>
                            <li>如何提款</li>
                            <li>责任条款</li>
                            <li>规则与条款</li>
                        </ul>
                    </div>
                    <div class="feature-product">
                        <div class="feature-title">
                            关于我们 <span>ABOUT US</span>
                        </div>
                        <div class="feature-text">传奇软件平台，兼容ipad/iphone等各种移动设备是目前市面上用户体验最优秀的产品。</div>
                        <div class="feature-title">
                            优惠活动 <span>ACTIVITY</span>
                        </div>
                        <div class="feature-text">传奇软件时时刻刻为我们的尊贵会员提供最高优惠，能够让您轻松、快乐的享受投注的乐趣。</div>
                        <div class="feature-title">
                            真人娱乐城 <span>LIVE CASINO</span>
                        </div>
                        <div class="feature-text">传奇软件所使用的娱乐城平台必须经过TST Game国际认证，保证每款游戏公平公正。</div>
                    </div>
                </div>
                <com-footer></com-footer>
            </div>
        </div>
    </div>
</template>

<script>
import comFooter from './comFoot'

export default {
  name: 'indexFoot',
  data () {
    return {}
  },
  components: {
    comFooter
  }
}
</script>
