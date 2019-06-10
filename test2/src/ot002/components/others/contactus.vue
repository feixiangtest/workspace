<template>
  <div id="contactUs">
      <div class="container">
        <div class="inner-banner">
          <figure class="about-banner"></figure>
        </div>
      </div>

      <div class="indexCont about-content-bg">
        <div class="contentBox">
          <div class="about-content">
            <div class="about-tab-bar">
              <a href="javascript:void(0)" class="on">联系我们</a>
            </div>
            <div class="about-tab-texts">
              <div class="texts-box">
                <p>联系我们</p>
              </div>
              <contact-us-form></contact-us-form>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import contactUsForm from '@s/components/doc/contact'

export default {
  name: 'contactus',
  data () {
    return {
    }
  },
  components: {
    contactUsForm
  }
}
</script>