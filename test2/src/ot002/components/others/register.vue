<template>
    <div>
        <div class="container">
            <div class="inner-banner">
            <figure class="about-banner"></figure>
            </div>
        </div>
        <div class="indexCont about-content-bg">
            <div class="contentBox">
                <div class="about-content">
                    <figure class="reg-title"><img src="/resource/ot002/images/reg_title.png" alt=""></figure>
                    <!-- 注册会员 -->
                    <register-box></register-box>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import menuBar from '../header/menuBar'
import registerBox from '@s/components/reg/register'

export default {
  data () {
    return {
    }
  },
  components: {
    menuBar,
    registerBox
  }
}
</script>

