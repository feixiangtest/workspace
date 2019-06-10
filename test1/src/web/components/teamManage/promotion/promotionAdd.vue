<template>
  <div id="promotionAdd">
    <!--推广添加列表页-->
    <div class="header yo-home-nav">
      <div class="center">
        <div class="hea-menu hea-left">
          <a href="javascript:;" @click="goBack(0)">
            <i class="yo-icon icon-arrows-left"></i>
          </a>
        </div>
        <div class="header-text titile">
          <h1>新增推广链接</h1>
        </div>
      </div>
    </div>
    <!-- 内容列表 -->
    <div class="centerBox">
      <dl>
        <dt class='title'>有效投注返点</dt>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            彩票
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            视讯
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            电子
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            捕鱼
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            棋牌
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            体育
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
      </dl>
      <dl>
        <dt class='title'>损益返点</dt>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            彩票
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            视讯
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            电子
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            捕鱼
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            棋牌
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            体育
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
      </dl>
      <dl>
        <dt class='title'>损益返点</dt>
        <dd class='itemList clearfix'>
          <div class='gameName'>
            充值
          </div>
          <div class='inputStyle'>
            <input type="text"> %
          </div>
          <div class='description'>
            请填写返点比例
          </div>
        </dd>
      </dl>
      <div style='background:white;margin-top:25px;padding:12px 0;'>
        <div class='createLink'>
        生成推广链接
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  // import * as types from '@/base/store/transactionRecord/type'
  // import * as statusCode from '@/base/utils/status_const'
  // import method from '@/base/utils/method'
  export default {
    data () {
      return {
        promotionData: []
      }
    },
    computed: {
      imgUrl () {
        return this.$store.state.home.commonImgUrl
      }
    },
    methods: {
      goBack (type) { // type = 1 表示在当前页面退回平台选择页面 type = 0 表示隐藏详情页面，显示投注列表页面
        if (type === 0) {
          this.$router.go(-1)
        } else if (type === 1) {
          this.showDetail = false
          this.detailData = []
        }
      }
    },
    mounted () {}
  }
</script>
