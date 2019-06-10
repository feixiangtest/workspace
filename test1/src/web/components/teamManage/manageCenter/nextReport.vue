<template>
  <div id="nextReport">
    <!--团队报表-->
    <div class="header yo-home-nav">
      <div class="center">
        <div class="hea-menu hea-left">
          <a href="javascript:;" @click="$router.go(-1)">
            <i class="yo-icon icon-arrows-left"></i>
          </a>
        </div>
        <div class="header-text titile">
          <h1>下级报表</h1>
        </div>
      </div>
    </div>
    <!-- 报表内容 -->
    <div class="content">
      <div class="timeTab">
        <div class='timeActive'>昨日</div>
        <div>本月</div>
        <div>上月</div>
      </div>
      <div class="reportList">
        <div class="reportItem reportHeader">
          <div>账号</div>
          <div>等级</div>
          <div>投注人数</div>
          <div>盈利</div>
        </div>
        <div class="reportItem">
          <div>okok111</div>
          <div>1级会员</div>
          <div>2</div>
          <div class='redStyle'>-8.00</div>
        </div>
      </div>
    </div>
    <!-- 加载完成页脚 -->
    <p class='loadAll'>
      已显示全部
    </p>
  </div>
</template>
<script>

</script>
