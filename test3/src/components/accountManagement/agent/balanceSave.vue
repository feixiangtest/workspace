<template>
  <div class="mainBox">
    <div class="list-part-out">
      <div class="list-part">
        <div class="list-title yo-title"><i class="yo-icon icon-info-3"></i>基本信息</div>
        <dl class="public-list clearfix">
          <dd class="common-item">
            <h5 class="title">上级用户</h5>
            <p class="con-txt subText">
              d202020(一级代理）
            </p>
          </dd>
          <!--添加下级代理新增-->
          <dd class="common-item">
            <h5 class="title">账号类型</h5>
            <p class="con-txt">代理<i class="yo-icon icon-next"></i></p>
          </dd>
          <!--end-->
          <dd class="common-item">
            <h5 class="title">用户名</h5>
            <p class="con-txt">
              d
              <input type="text" placeholder="请输入姓名">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">密码</h5>
            <p class="con-txt">
              <input type="password" placeholder="6-12位字母和数字的组合">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">昵称</h5>
            <p class="con-txt">
              <input type="text" placeholder="请输入1-20个字符">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">账号状态</h5>
            <p class="con-txt">
              <label class="mint-switch"><input type="checkbox" class="mint-switch-input"> <span class="mint-switch-core"></span> <div class="mint-switch-label"></div></label>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">投注状态</h5>
            <p class="con-txt">
              <label class="mint-switch"><input type="checkbox" class="mint-switch-input"> <span class="mint-switch-core"></span> <div class="mint-switch-label"></div></label>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">余额</h5>
            <p class="con-txt">
              <input type="text" placeholder="金额留空默认为0">
            </p>
          </dd>
        </dl>
      </div>
      <div class="list-part">
        <div class="list-title yo-title clearfix">
            <div class="float-l">
              <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  width="20px" height="20px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                <g>
                  <circle fill="#C7CFFF" cx="24.4" cy="25" r="23.5"/>
                  <path fill="#FFFFFF" d="M30.301,41.6c6.199,0,11.799-2.398,16.1-6.199c1.602-3.199,2.5-6.801,2.5-10.601c0-13-10.5-23.5-23.5-23.5
                    c-7.199,0-13.6,3.2-17.899,8.3c-0.8,2.5-1.3,5.101-1.3,7.801C6.2,30.8,17,41.6,30.301,41.6z"/>
                  <path fill="#557FDD" d="M25,0C11.2,0,0,11.2,0,25s11.2,25,25,25c13.801,0,25-11.2,25-25S38.801,0,25,0z M25,47.2
                    c-12.3,0-22.2-10-22.2-22.2S12.7,2.8,25,2.8c12.199,0,22.199,9.9,22.199,22.2C47.1,37.2,37.199,47.2,25,47.2z"/>
                  <g>
                    <path fill="#F3B301" d="M30.699,14.1C30,13.7,29.199,14,28.801,14.7L18.1,33.9c-0.4,0.699-0.1,1.5,0.6,1.898
                      c0.701,0.4,1.5,0.102,1.9-0.6l10.6-19.301C31.6,15.4,31.301,14.5,30.699,14.1z"/>
                    <path fill="#F3B301" d="M32.699,23.8c-2.799,0-5,2.3-5,5.2s2.301,5.2,5,5.2c2.701,0,5-2.3,5-5.2S35.4,23.8,32.699,23.8z
                      M32.699,31.4C31.5,31.4,30.5,30.299,30.5,29s1-2.4,2.199-2.4c1.201,0,2.201,1.102,2.201,2.4S33.9,31.4,32.699,31.4z"/>
                    <path fill="#F3B301" d="M22.1,20.1c0-2.899-2.299-5.199-5-5.199c-2.699,0-5,2.3-5,5.199c0,2.9,2.301,5.2,5,5.2
                      C19.801,25.3,22.1,23,22.1,20.1z M17,22.5c-1.2,0-2.2-1.1-2.2-2.4c0-1.3,1-2.399,2.2-2.399c1.199,0,2.199,1.1,2.199,2.399
                      C19.199,21.4,18.301,22.5,17,22.5z"/>
                  </g>
                </g>
              </svg>
            </div>&nbsp;&nbsp;返点设置
          </div>
        <dl class="public-list clearfix">
          <dd class="common-item">
            <h5 class="title">AG视讯</h5>
            <p class="con-txt">
              <input class="small input-type1" type="number" placeholder="最低返点"><span>% —</span><input class="small" type="number" placeholder="最高返点"><span>%</span>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">OG视讯</h5>
            <p class="con-txt">
              <input class="small input-type1" type="number" placeholder="最低返点"><span>% —</span><input class="small" type="number" placeholder="最高返点"><span>%</span>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">BB视讯</h5>
            <p class="con-txt">
              <input class="small" type="number" placeholder="最低返点"><span>% —</span><input class="small" type="number" placeholder="最高返点"><span>%</span>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">AB视讯</h5>
            <p class="con-txt">
              <input class="small" type="number" placeholder="最低返点"><span>% —</span><input class="small" type="number" placeholder="最高返点"><span>%</span>
            </p>
          </dd>
        </dl>
      </div>
      <div class="btn-box btn-block text-center">
        <a href="javascript:void(0)" class="btn btn-lg btn-primary">保存</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'agentAdd',
    components: {
    },
    mounted () {
      let id = this.$route.params.id
      console.log('agentAdd 层级', id)
      // 会员层级
    }
  }
</script>
