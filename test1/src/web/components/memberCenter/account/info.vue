<template>
<div>
   <div class="header yo-home-nav">
    <div class="center">
      <div class="hea-menu hea-left">
          <a href="javascript:;" @click="goback()"><i class="yo-icon icon-arrows-left"></i></a>
      </div>
      <div class="header-text titile">
        <h1>个人资料</h1>
      </div>
      <div class="hea-user hea-right">
          <a href="javascript:;" @click="home()"><i class="yo-icon icon-home"></i></a>
      </div>
    </div>
  </div>
  <div class="centerBox mainCenter">
       <div class="depositMain onlineDraw">
            <dl class="secondForm2">
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">会员账号</span>
                        <span class="itemNeir">{{userInfo.account}}</span>
                    </div>
                </dd>
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">真实姓名</span>
                        <span class="itemNeir">{{userInfo.realName}}</span>
                    </div>
                </dd>
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">微信昵称</span>
                        <span class="itemNeir">{{userInfo.weiXinNickName}}</span>
                    </div>
                </dd>
            </dl>
        </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.home.userInfo
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    home () {
      this.$router.push('/wap/index')
    }
  }
}
</script>
