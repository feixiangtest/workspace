// <template>
    <div class="mainBox">

        <div class="list-part-out fullpage">
            <div class="security-page">
                <!--teachPage display-->
                <div class="teachpage" v-if="teachshow">
                    <div class="index-header teach-header">
                        <div class="head-right"><i class="icon-download"></i></div>
                    </div>
                    <div class="teacharrow"><img src="../../../assets/img/teach_arrow.png" alt=""></div>
                    <div class="teachout">
                        <div class="teachbox">
                            未下载<span>【 安全码验证器APP 】</span><br/>
                            可点击此处进行下载
                        </div>
                        <a href="javascript:void(0)" class="btn btn-teach btn-primary" @click="teachhind()">我知道了</a>
                    </div>
                    
                </div>
                <!--teachPage display end-->
                <!-- <nav class="security-nav">
                    <mt-navbar v-model="currentTab" class="flex-container">
                        <mt-tab-item id="1">二维码绑定</mt-tab-item>
                        <mt-tab-item id="2">密钥绑定</mt-tab-item>
                    </mt-navbar>
                </nav> -->
                
                <!-- <mt-tab-container v-model="currentTab" swipeable> -->
                    <!--二维码绑定display-->
                    <!-- <mt-tab-container-item id="1"> -->
                        <div class="qrbind">
                            <section id="display-fix" class="part">
                                <div class="titlestep flex-container">
                                    <div class="title">01</div>
                                    <div class="">
                                        使用传奇安全码验证器扫描下面的二维码。
                                    </div>
                                </div>
                                <div class="flex-container">
                                    <!-- <div class="qrcode"><img src="../../../assets/img/qr.jpg" alt=""></div>  -->
                                    <div class="qrcode"><div class="shear-img"><img src='/api/legend/legendCode' alt=""></div></div>
                                </div>
                            </section>
                            <div class="warn-txt">
                                温馨提示：<br>
                                1.该二维码为身份绑定的二维码，请勿将该二维码泄露给他人<br>
                                2.手机时间必须设置为自动同步，时区选择为”北京时间“否则无法正确生成验证。<br>
                            </div>
                            <!-- <section id="display-fix" class="part">
                                <div class="titlestep flex-container">
                                    <div class="title">02</div>
                                    <div class="">
                                        扫码成功后，请在下方输入安全码验证器APP中显示的6位验证码
                                    </div>
                                </div>
                                <div class="text-center">
                                    <input type="text" placeholder="请输入6位验证码" class="">
                                </div>
                            </section> -->
                            <!-- <a href="javascript:void(0)" class="btn btn-lg btn-block btn-primary">绑定</a> -->
                        </div>
                    <!-- </mt-tab-container-item> -->
                    <!--二维码绑定display end-->
                    <!--密钥绑定display-->
                    <!-- <mt-tab-container-item id="2">
                        <div class="keybind">
                            <section id="display-fix" class="part">
                                <div class="titlestep flex-container">
                                    <div class="title">01</div>
                                    <div class="">
                                        请在“安全码验证器APP”上输入以下账号和密钥的方式进行绑定
                                    </div>
                                    
                                </div>
                                <div class="keybox">
                                    <div class="flex-container">
                                        <div class="account">账号：<span>zz2okok111</span></div>
                                        <div class="copy">复制</div>
                                    </div>
                                    <div class="flex-container">
                                        <div class="key">密钥：<span>7DFGERE2312EREDQS1</span></div>
                                        <div class="copy">复制</div>
                                    </div>
                                </div>
                            </section>
                            <section id="display-fix" class="part">
                                <div class="titlestep flex-container">
                                    <div class="title">02</div>
                                    <div class="">输入密钥成功后，请在下方输入安全码验证器APP中显示的6位验证码
                                    </div>
                                </div>
                                <div class="text-center">
                                    <input type="text" placeholder="请输入6位验证码" class="">
                                </div>
                            </section>
                            <a href="javascript:void(0)" class="btn btn-lg btn-block btn-primary">绑定</a>
                        </div>
                    </mt-tab-container-item> -->
                    <!--密钥绑定display end-->
                <!-- </mt-tab-container> -->
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
import * as userTypes from '@/store/user/type'
import * as statusCode from '@/utils/status_const'
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
export default {
  name: 'securityCode',
  components: {
  },
  data () {
    return {
      currentTab: '1', // tab切换
      teachshow: false, // 提示遮罩
      downloaded: true, // 下载
      srcImg: ''
    }
  },
  methods: {
    teachhind () {
    // 如果列表有数据，那么弹出提示蒙版，并存储在本地
      console.log(window.store.state.user.legendCode + '==========绑定状态')
      this.teachshow = false
      localStorage.setItem('teachshow', 'false')
    },
    getDownloadUrl () {
      this.$store.dispatch(userTypes.LEGENDOWNLOADAPP_ACTION).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          var url = res.data.value
          var reg = new RegExp('^http')
          var reg2 = new RegExp('^https')
          if (reg.test(url) || reg2.test(url)) {
            this.$store.state.user.downloadUrl = url
          } else {
            this.$store.state.user.downloadUrl = '//' + url
          }
        }
      })
    }
  },
  mounted () {
    this.$store.state.home.headerType = 11
    this.$store.state.home.headTitle = '绑定安全码'
    // 请求基本资料数据
    let param = {
      'pageGroupId': 1
    }
    this.$store.dispatch(userTypes.USERINFO_ACTION, param).then(res => {})
    if (window.store.state.user.legendCode === '0') {
      if (!localStorage.getItem('teachshow')) {
        this.teachshow = true
      } else {
        this.teachshow = false
      }
    } else {
      this.teachshow = false
    }
    this.getDownloadUrl()
  }
}
</script>
