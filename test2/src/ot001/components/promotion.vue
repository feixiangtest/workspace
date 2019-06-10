<template>
    <div id="PromotionPage">
        <div class="header">
            <div class="center">
                <com-header></com-header>
                <div class="banner-wrap lottery-banner-wrap"></div>
                <last-new></last-new>
            </div>
        </div>
        <promotion-box></promotion-box>

        <div id="indexFoot">
            <div class="footer">
                <div class="center">
                    <com-footer></com-footer>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import comHeader from './comment/comHeader'
import lastNew from './comment/lastNew'
import comFooter from './comment/comFoot'
import promotionBox from './promotionMain'
export default {
  name: 'promotion',
  components: {
    comHeader,
    lastNew,
    promotionBox,
    comFooter
  },
  data () {
    return {}
  },
  mounted () {
    this.reStyle()
  },
  methods: {
    reStyle: function () {
      window.$('body').removeClass('indexBody')
      window.$('html').addClass('bannerHtml')
    }
  }
}
</script>
