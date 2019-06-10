<template>
  <div id="teamReport">
    <!--团队报表-->
    <div class="header yo-home-nav">
      <div class="center">
        <div class="hea-menu hea-left">
          <a href="javascript:;" @click="$router.go(-1)">
            <i class="yo-icon icon-arrows-left"></i>
          </a>
        </div>
        <div class="header-text titile">
          <h1>团队报表</h1>
        </div>
      </div>
    </div>

    <!-- 内容区-->
    <div class="topContent">
      <!-- 时间快选 -->
      <div class="timeTab clearfix">
        <div class="timeItem activeTimeTab">昨日</div>
        <div class="timeItem">本月</div>
        <div class="timeItem">上月</div>
      </div>
      <!-- 搜索 -->
      <div class="search clearfix">
        <div class="account">账号</div>
        <div class="searchInput">
          <input type="text" placeholder="请输入账号">
        </div>
        <div class="searchBtn">
          <img src="/static/RESOURCE_VERSION/local/img/teamManage/搜索 @2x.svg" alt>
          <span>搜索</span>
        </div>
      </div>
    </div>
    <!-- 报表列表 -->
    <div class="reportList">
      <dl>
        <dd>￥100</dd>
        <dt>投注金额</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>中奖金额</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>所得优惠金额</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>推广佣金</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>投注金额</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>中奖金额</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>所得优惠金额</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>推广佣金</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>投注金额</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>中奖金额</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>所得优惠金额</dt>
      </dl>
      <dl>
        <dd>￥100</dd>
        <dt>推广佣金</dt>
      </dl>
      <div class='warmTips'>
          <h4>
              温馨提示：
          </h4>
          <p>
              1.推广佣金(下级）和推广佣金(自身）统计该帐号自己获得的佣金;
          </p>
          <p>
              2.其余栏位为加总该帐号与所属下级的总计资料
          </p>
      </div>
    </div>
  </div>
</template>
<script>
</script>
