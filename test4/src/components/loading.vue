<template>
  <!-- 如果是去后端拿数据，则进行load -->
  <div class="mengceng leftMengceng" v-show="showBetLoading">
    <div id="loading" class="lds-css ng-scope">
      <div class="yo-jiazai">
        <div class="lds-ellipsis">
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
        <span style="position: relative;top:-40px;left:108px;font-size:16px;color:#FFFFFF">加载中...</span>
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
  components: {
  },
  computed: {
    showBetLoading () {
      return this.$store.state.site.showBetLoading
    }
  }
}
</script>

<style type="text/css">
body{
  margin: 0px;
  padding: 0px;
}
.lds-css{
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 99999;
  background: rgba(0,0,0,.5);
}
.yo-jiazai{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -135px;
  width: 200px;
}
/*球间距 0%, 25 第一个球到第二个球的间距,越小越大*/
@keyframes lds-ellipsis3 {
  0%, 25% {
    left: 108px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
/*第二个球到第三个球的间距*/
  50% {
    left: 108px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  /*第三个球到第四个球的间距*/
  75% {
    left: 140px;
  }
  /*第四个球到第五个球的间距*/
  100% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@-webkit-keyframes lds-ellipsis3 {
  0%, 25% {
    left: 108px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    left: 108px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  75% {
    left: 140px;
  }
  100% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  25%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
@-webkit-keyframes lds-ellipsis2 {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  25%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
@keyframes lds-ellipsis {
  0% {
    left: 108px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  25% {
    left: 108px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    left: 140px;
  }
  75% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    left: 168px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
@-webkit-keyframes lds-ellipsis {
  0% {
    left: 108px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  25% {
    left: 108px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    left: 140px;
  }
  75% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    left: 168px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
.lds-ellipsis {
  position: relative;
}
/*球大小*/
.lds-ellipsis > div {
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
}
/*球大小*/
.lds-ellipsis div > div {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #f00;
  position: absolute;
  top: 140px;
  left: 108px;
  -webkit-animation: lds-ellipsis 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  animation: lds-ellipsis 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
}
.lds-ellipsis div:nth-child(1) div {
  -webkit-animation: lds-ellipsis2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  animation: lds-ellipsis2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  background: #FAC092;
}
.lds-ellipsis div:nth-child(2) div {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
  background: #FEFECB;
}
.lds-ellipsis div:nth-child(3) div {
  -webkit-animation-delay: -0.25s;
  animation-delay: -0.25s;
  background: #C3F6D2;
}
.lds-ellipsis div:nth-child(4) div {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  background: #FE7C81;
}
.lds-ellipsis div:nth-child(5) div {
  -webkit-animation: lds-ellipsis3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  animation: lds-ellipsis3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  background: #FAC092;
}
.lds-ellipsis {
  width: 200px !important;
  height: 200px !important;
  -webkit-transform: translate(-140px, -140px) scale(1) translate(140px, 140px);
  transform: translate(-140px, -140px) scale(1) translate(140px, 140px);
}
</style>
