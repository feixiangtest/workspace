<template>
  <div id="preApp" class="pane">
    <div class="yo-page-body">
      <div class="header yo-home-nav">
        <div class="center">
        </div>
      </div>
      <div class="wrapper">
        <div style="position: relative;">
          <div class="banner">
            <div class="mint-swipe">
            </div>
          </div>
          <div class="yo-gonggao">
          </div>
        </div>
        <div class="quickNav">
          <ul>
            <li><a href="javascript:;" class="promotion"><i class="yo-icon icon-promotion"></i>
            </a></li>
            <li><a href="javascript:;" class="my-favorite"><i class="yo-icon icon-favorite"></i>
            </a></li>
            <li><a href="javascript:;" class="lately-browse"><i class="yo-icon icon-download"></i>
            </a></li>
          </ul>
        </div>
        <div class="indexGame" style="margin-top: 10px;">

        </div>
      </div>
      <div class="yo-footer indexFot">
        <ul>
          <li><a href="javascript:;"><i class="yo-icon icon-free"></i> <span>免费试玩</span></a></li>
          <li><a href="javascript:;"><i class="yo-icon icon-account"></i> <span>立即登录</span></a></li>
          <li><a href="javascript:;"><i class="yo-icon icon-forget"></i> <span>忘记密码</span></a></li> <!----> <!---->
          <!-- -->
          <li><a href="javascript:;"><i class="yo-icon icon-service"></i> <span>在线客服</span></a></li>
        </ul>
      </div>
 <!----></div> <!---->
  </div>
</template>
<script>

export default {
  name: 'preApp', // 页面骨架
  data () {
    return {
    }
  }
}
</script>

<style lang='less'>
  @anyUrl: 'CDNURL_VARIABLE/static/RESOURCE_VERSION/local'; // RESOURCE_VERSION该字符串是会在打包时替换，必须不能放在less文件中
  @import '../base/assets/less/app.less';
</style>
<style lang='less'>
   @folderV: 'RESOURCE_VERSION';
   @import '../base/assets/less/skin_default/index.less'; // 默认皮肤——注：除本地环境外，其它环境这里一定不能放开任何一个皮肤
  // @import '../base/assets/less/skin_op/a04/index.less'; // a04皮肤——注：除本地环境外，其它环境这里一定不能放开任何一个皮肤
</style>
