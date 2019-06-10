<template>
<div class="yo-safeguard">
    <div class="yo-cen-safegu">
       <template v-if="isStop === 'false'">
        <p>Access to the site is not available due to scheduled
          maintenance, we apologize for any inconvenience caused.</p>
        <h5>本网站进行系统维护中，如有不便之处，<br>敬请见谅!</h5>
        <h6>—预计北京时间<span>{{maintainDate}}</span>结束—</h6>
       </template>
        <template v-if="isStop === 'true'">
           <p>本網站已經停用！</p>
        </template>
    </div>
    <a class="yo-an-sx" href="javascript:;"  @click="refreshPage()">刷新页面</a>
</div>
</template>

<script>

export default {
  data () {
    return {
      maintainDate: sessionStorage.getItem('maintainDate'),
      isStop: sessionStorage.getItem('isStop')
    }
  },
  methods: {
    refreshPage () {
      window.location.reload()
    }
  },
  components: {
  },
  computed: {
  }
}
</script>
<style scoped src="/static/lt_h5_v3/local/css/common/maintain.css"></style>
