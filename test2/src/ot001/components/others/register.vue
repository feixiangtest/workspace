<template>
    <div>
        <div class="header">
            <div class="center">
                <com-header></com-header>
                <div class="banner-wrap aboutBanner"></div>
                <last-new></last-new>
            </div>
        </div>

        <!-- 注册会员 -->
        <div class="center clearfix">
            <div class="pageContent">
                <register-box></register-box>
            </div>
        </div>
        
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
import comHeader from '../comment/comHeader'
import lastNew from '../comment/lastNew'
import comFooter from '../comment/comFoot'
import registerBox from '@s/components/reg/register'
import registerAgentBox from '@s/components/reg/registerAgent'

export default {
  data () {
    return {
    }
  },
  components: {
    comHeader,
    lastNew,
    comFooter,
    registerBox,
    registerAgentBox
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

