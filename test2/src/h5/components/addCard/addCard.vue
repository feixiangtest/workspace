<template>
    <div class="common-main main-box">
      <div class="reg-box padding-top-0">
        <div class="form-item magt10">
          <label for="realName">真实姓名</label>
          <!-- 如果没有填写真实姓名 -->
          <input type="text" disabled v-if="userInfo.realName" v-model="userInfo.realName">
          <input id='realName' onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
                 v-else type="text"
                 v-model="trueName"
                 @input="inputFix('trueName')"
                 maxlength="20" placeholder="请输入您的真实姓名">
          <!-- 如果已经填写真实姓名 -->
        </div>
        <div class="form-item">
          <label for="bankCard">卡号</label>
          <input id='bankCard' :disabled="isDisbaleAccount" oninput="value=value.replace(/[^\d]/g,'')" v-model="memberBankAccountNo" maxlength="20" type="tel" placeholder="请输入10-20位纯数字卡号">
        </div>
        <div class="form-item" @click="flagBank && selectBankTab()">
          <label for="selectBank">选择银行</label>
          <input id='selectBank' class="input-width-60 ellipsis" v-model="selectedBank" :disabled="isDisbaleBank" readonly type="text" placeholder="请您选择银行">
          <span class="yo-icon right-arrow icon-next"></span>
        </div>
        <div class="form-item">
          <label for="province">开户行省</label>
          <input id='province'
                 v-model="province"
                 :readonly='isReadonly1'
                 :disabled="isDisbalePro" type="text"
                 placeholder="请输入开户行省" maxlength="20" @input="inputFix('province')"/>
        </div>
        <div class="form-item">
          <label for="province">开户行市</label>
          <input id='city'
                 v-model="city"
                 :readonly='isReadonly2'
                 :disabled="isDisbaleCity" type="text"
                 placeholder="请输入开户行市" maxlength="20"  @input="inputFix('province')" />
        </div>
        <div class="form-item magt10">
          <label for="wPsw">取款密码</label>
          <input v-if='isSetDrawMoneyPwd' value="****" disabled type="password">
          <input v-else id='wPsw' oninput="value=value.replace(/[^\d]/g,'')" v-model="drawMoneyPwd" placeholder='请设置4位数取款密码' maxlength="4" type="password">
        </div>
      </div>
      <div class="btn-wrap">
        <div class="btn one-btn" @click="submit()">确定</div>
      </div>
      <!-- 省市银行卡列表 -->
      <div class="page-picker-wrapper" v-show='isShowTab'><!--v-if改成v-show 原因：OT-4591-->
       <mt-picker :slots="addressSlots" :showToolbar='true' @change="onAddressSlots">
           <button class="float-l cancle" @click="cancle()">取消</button>
           {{provinceOrCity}}
           <button class="float-r sure" @click="makeSure()">确定</button>
       </mt-picker>
      </div>
      <!-- {{bankList}} -->
      <div class="mask" @click="cancle()" v-if="isShowTab"></div>

      <div class="bank-list" v-if="isShowBankList">
        <div class="search">
          <input class="title" placeholder="搜索银行名称" v-model='keyWord' />
          <i class="yo-icon icon-search"></i>
          <span class="float-r" @click="cancleSelect()">取消</span>
        </div>
        <ul class="bank">
          <li v-for='bank in list' :key='bank.id' @click="selectBank(bank.bankname,bank.id)">{{bank.bankname}}</li>
          <li class="search-item border-bottom" v-if="hasNoData">
            暂无匹配项
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
// import * as types from '@s/store/shareApi/type'
import { Picker } from 'mint-ui'
Vue.component(Picker.name, Picker)

const address = {
  '北京': ['北京', '其他'],
  '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮', '其他'],
  '上海': ['上海', '其他'],
  '天津': ['天津', '其他'],
  '重庆': ['重庆', '其他'],
  '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛', '其他'],
  '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁', '其他'],
  '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区', '其他'],
  '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州', '其他'],
  '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛', '其他'],
  '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水', '其他'],
  '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁', '其他'],
  '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店', '其他'],
  '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州', '其他'],
  '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区', '其他'],
  '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟', '其他'],
  '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽', '其他'],
  '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城', '其他'],
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水', '其他'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德', '其他'],
  '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州', '其他'],
  '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左', '其他'],
  '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶', '其他'],
  '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州', '其他'],
  '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '其他'],
  '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区', '其他'],
  '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县', '其他'],
  '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州', '其他'],
  '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫', '其他'],
  '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州', '其他'],
  '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州', '其他'],
  '香港': ['香港', '其他'],
  '澳门': ['澳门', '其他'],
  '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市', '其他']
  // '其他': ['其他']
}

export default {
  name: 'addCard',
  data () {
    return {
      loadData: false,
      addressSlots: [
        {
          flex: 1,
          values: Object.keys(address),
          className: 'slot1',
          textAlign: 'center',
          defaultIndex: 0
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['北京', '其他'],
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      flagBank: true, // 是否禁用选择银行方法
      flagAddress: true, // 是否禁用选择开户行省市的方法
      provinceOrCity: '省市',
      placeHolderMsg1: '请选择开户行省市',
      placeHolderMsg2: '',
      isShowProvWarn: false, // 是否显示开户省错误
      isShowCityWarn: false, // 是否显示开户市错误
      isDisbaleAccount: false, // 是否禁用银行卡号输入框
      isDisbalePro: false, // 是否disabled省
      isDisbaleCity: false, // 是否disabled市
      isDisbaleBank: false, // 是否disabled银行
      isReadonly1: false, // 省份只读
      isReadonly2: false, // 市只读
      isSetPro: false, // 是否已经设置过省份  onAddressSlots()中用到
      isShowBankList: false, // 打开银行选择列表
      isShowTab: false, // 是否显示选择列表
      addressProvince: '', // 函数用 中间过度
      addressCity: '', // 函数用 中间过度
      selectedBank: '', // v-model中用
      bankSelect: '', // 函数用 中间过度
      memberBankAccountNo: '', // 银卡卡号
      memberBankName: '', // 银行名称
      trueName: '', // 用户真实姓名
      bankId: '', // 银行id
      drawMoneyPwd: '', // 取款密码
      // openAccountAdress: '', // v-model中用
      province: '',
      city: '',
      bankList: [], // 银行列表
      list: [],
      keyWord: '', // 搜索时输入的关键字
      timer: '',
      isSetDrawMoneyPwd: true,
      validatebankNo: true, // 验证用户卡号
      postLock: true, // 防止用户重复点击提交请求
      itemArr: [], // 匹配银行
      tempValue: null, // 截取临时10位数据
      memberInfo: {}, // 获取用户已绑定银行卡部分信息 OT-4615
      isSetBankCard: false,
      isProOrCity: false // 省或者市有一个后台填写了的话则不允许修改
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo // 用户信息
    }),
    hasNoData () {
      return !this.list.length
    },
    memberSetList () {
      return this.$store.state.user.memberSetList
    },
    onlineDraw () {
      return this.$store.state.payment.onlineDraw
    }
  },
  watch: {
    trueName (val) {
      this.trueName = val.replace(/\s+/g, '')
    },
    // 过滤空格
    city (val) {
      this.city = this.Trim(val)
    },
    memberBankAccountNo (val) {
      if (val) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        if (val.length < 10 && !this.isDisbaleBank) {
          this.selectedBank = ''
          this.bankId = ''
          this.itemArr = []
          this.tempValue = null
          this.isSetBankCard = false
        }
        // 判断用户是否已经填写银行 如果已经选择就不再根据卡号匹配银行  isSetBankCard为true已经填写银行
        if (!this.isSetBankCard && !this.isDisbaleBank && val.length === 10) {
          // if (val.length === 10) {
          // 根据输入的卡号前十位匹配出相应的银行
          this.getBankName(val)
          // }
        }
      }
    },
    keyWord () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyWord) {
        this.list = [...this.bankList]
        return false
      }
      this.timer = setTimeout(() => {
        const result = []
        this.bankList.forEach((item) => {
          if (item.bankname.indexOf(this.keyWord) > -1) {
            result.push(item)
          }
        })
        this.list = result
      }, 100)
    }
  },
  methods: {
    inputFix (name) {
      this[name] = this[name].replace(/\s+/g, '')
      try {
        this[name] = this[name].replace(/\u2006/g, '')
      } catch (e) {
      }
      try {
        this[name] = this[name].slice(0, 20)
      } catch (e) {
      }
    },
    // 根据输入的前十位10号匹配出银行名称
    getBankName (val) {
      this.tempValue = val.slice(0, 10) // 截取卡号前10位
      this.timer = setTimeout(() => { // 防止一直请求计算
        for (let i = this.tempValue.length; i >= 6; i--) { // 10到6 位的匹配查找数据
          let currentVal = this.tempValue.slice(0, i) // 10 到6位的数据
          this.bankList.forEach((item) => { // 根据银行卡列表this.bankList匹配循环查找
            if (item.binCode) { // binCode 后台传过来的数据有的没有binCode 如果有binCode的参与查找，如果没有就不参与查找
              let binCodeArr = item.binCode.split(',') // 字符串截取成数组 一个一个的判断 是否与前端输入的有匹配
              for (let m = 0; m < binCodeArr.length; m++) {
                if (binCodeArr[m] === currentVal) {
                  this.itemArr.push(item)
                }
              }
            }
          })
          // 匹配时如果匹配到多个值，则不自动带出
          if (this.itemArr.length === 1) {
            this.selectedBank = this.itemArr[0].bankname
            this.bankId = this.itemArr[0].id
          } else {
            this.selectedBank = ''
            this.bankId = ''
          }
          // 如果查找到了则不再向下查找
          if (this.itemArr.length > 0) {
            break
          }
        }
      }, 100)
    },
    // 过滤空格
    Trim (str) {
      if (str) {
        return str.replace(/\s+/g, '')
      }
    },
    // 填完资料提交绑定银行卡信息
    submit () {
      // 如果后台已经有了真实姓名则不做校验
      if (this.onlineDraw.memberInfo.cardName === '' || this.onlineDraw.memberInfo.cardName === undefined) {
        if (!this.ifValidateTrueName()) {
          return ''
        }
      }
      if (this.memberBankAccountNo === '') {
        window.layer.msgWarn('请输入卡号')
        return false
      }
      if (this.memberBankAccountNo.length < 10) {
        if (this.isDisbaleAccount) {
          window.layer.msgWarn('卡号信息错误，请联系客服')
        } else {
          window.layer.msgWarn('请输入10-20位纯数字卡号')
        }

        return false
      } else {
        if (!this.validatebankNo) {
          window.layer.msgWarn('添加银行卡失败，银行卡已存在')
          return false
        }
      }
      if (this.selectedBank === '' && this.memberBankAccountNo === '') {
        window.layer.msgWarn('请输入卡号')
        return false
      }
      if (this.selectedBank === '') {
        window.layer.msgWarn('请您选择银行')
        return false
      }
      // if (this.isProOrCity) {
      //   window.layer.msgWarn('开户行省市错误，请联系客服')
      //   return false
      // }
      if (this.province === '' && !this.isDisbalePro) {
        window.layer.msgWarn('请选择开户行省')
        return false
      }
      if (this.city === '' || this.city === undefined) {
        window.layer.msgWarn('请输入开户行市')
        return false
      }
      if (this.drawMoneyPwd.length === 0 && this.isSetDrawMoneyPwd === false) {
        window.layer.msgWarn('请输入取款密码')
        return false
      } else if (this.drawMoneyPwd.length < 4 && this.isSetDrawMoneyPwd === false) {
        window.layer.msgWarn('取款密码为4位数纯数字！')
        return false
      }
      let parm = {
        bankAccount: this.memberBankAccountNo,
        bankId: this.bankId, // 银行名称id
        prov: this.province,
        city: this.city,
        drawMoneyPwd: this.drawMoneyPwd,
        realName: this.trueName || this.userInfo.realName
      }
      // 绑定银行卡请求
      if (this.postLock) {
        this.postLock = false
        this.$store.dispatch('saveBank', parm).then(res => {
          if (res.status === '0') {
            window.layer.msgWarn('银行卡绑定成功!', () => {
              let switchPages = sessionStorage.getItem('switchPages')
              localStorage.setItem('isSetBankCard', '0')
              // 进入出款页面之前将数据清空
              window.store.state.payment.onlineDraw = {}
              if (switchPages === null || switchPages === undefined) {
                window.router.push('wap/common/fastCash')
              } else {
                window.router.push(switchPages)
              }
            })
          } else if (res.msg) {
            window.layer.msgWarn('失败：' + res.msg)
          }
        })
        setTimeout(() => {
          this.postLock = true
        }, 2000)
      }
    },
    // 点击确定时
    makeSure () {
      this.cancle()
      this.province = this.addressProvince
      this.city = this.addressCity
      if (this.province === '其他') {
        this.isReadonly1 = false
        this.placeHolderMsg1 = '请输入开户行省'
        this.province = ''
      } else {
        this.isReadonly1 = true
        this.placeHolderMsg1 = '请选择开户行省市'
      }
      if (this.city === '其他') {
        this.isReadonly2 = false
        this.placeHolderMsg2 = '请输入开户行市'
        this.city = ''
      } else {
        this.isReadonly2 = true
        this.placeHolderMsg2 = ''
      }
    },
    // 点击取消时
    cancle () {
      this.isShowTab = false
      window.indexMain.openScroll()
      document.documentElement.style.position = ''
    },
    cancleSelect () {
      this.isShowBankList = false
    },
    selectBankTab () {
      window.$('input').blur()
      this.keyWord = ''
      this.isShowBankList = true
      this.list = [...this.bankList]
    },
    selectBank (val, id) {
      this.selectedBank = val
      this.bankId = id
      this.cancleSelect()
    },
    // 打开选择省份还是银行tab
    selectTab (index) {
      window.indexMain.stopScroll()
      document.documentElement.style.position = 'fixed'
      if (this.isReadonly1 === true && this.isReadonly2 === true) {
        this.isShowTab = true
      }
      if (index === 1) {
        this.isShowTab = true
      }
      if (index === 2) {
        this.isShowTab = false
      }
    },
    onAddressSlots (picker, values) {
      picker.setSlotValues(1, address[values[0]])
      this.addressProvince = values[0]
      this.addressCity = values[1]
    },
    // 是否开启唯一真实姓名检查
    ifValidateTrueName () {
      let realNameField = {}
      try {
        realNameField = this.memberSetList.realName
      } catch (e) {
      }
      // 开启唯一真实姓名
      if (realNameField && realNameField.ifValidate === 1) {
        // 需要验证
        if (this.trueName) {
          let _res = window.$.httpAsync('/member/account/checkRealName' + '?t=' + new Date().getTime(), {
            realName: this.trueName
          })
          if (_res.code === 0) {
            return true
          } else {
            window.layer.msgWarn(_res.msg)
            return false
          }
        } else {
          window.layer.msgWarn('请输入您的真实姓名')
          return false
        }
      } else if (this.trueName === '') {
        window.layer.msgWarn('请输入您的真实姓名')
        return false
      }
      // 已经有 跳过
      return true
    },
    initDrawData () {
      let $this = this
      this.$store.dispatch('initDrawData.action', {bankType: 0}).then(res => {
        // 1 未绑定银行卡
        if (res.status === '1') {
          let bankId = res.data.memberInfo.bankId
          // 已经填写了银行卡号
          if (res.data.memberInfo.bankAccount) {
            $this.memberBankAccountNo = res.data.memberInfo.bankAccount
            $this.isDisbaleAccount = true
            if ($this.memberBankAccountNo.length >= 10 && !bankId) {
              $this.getBankName($this.memberBankAccountNo)
            }
          }

          if (res.data.memberInfo.cardName) {
            $this.trueName = res.data.memberInfo.cardName
          }

          // 是否设置取款密码
          if (res.data.memberInfo.drawMoneyPwd) {
            $this.isSetDrawMoneyPwd = true
          } else {
            $this.isSetDrawMoneyPwd = false
          }
          // 已经设置了银行
          if (bankId) {
            $this.isDisbaleBank = true
            $this.isSetBankCard = true // 已选择银行
            $this.flagBank = false
            $this.bankId = bankId

            setTimeout(() => {
              if ($this.bankList) {
                $this.bankList.forEach(item => {
                  if (item.id * 1 === bankId * 1) {
                    $this.selectedBank = item.bankname
                  }
                })
              }
            }, 100)
          } else {
            $this.isSetBankCard = false // 未选择银行
          }

          // 省市都已经填写
          // res.data.memberInfo.province = ''
          // res.data.memberInfo.city = 'sdsd'
          if (res.data.memberInfo.province && res.data.memberInfo.city) {
            // 省市都已经填写 直接赋值给前端显示并且不能修改
            $this.province = res.data.memberInfo.province
            $this.city = res.data.memberInfo.city
            $this.isDisbalePro = true // 是否disabled 省
            $this.isDisbaleCity = true // 是否disabled 市
          }
          // 只填写了省 没有填写市
          if (res.data.memberInfo.province && !res.data.memberInfo.city) {
            // 省或者市有一个在后台填写了的话不允许修改直接报提示请联系客服
            $this.isProOrCity = true
            // 禁用省份
            $this.isReadonly1 = true
            $this.province = res.data.memberInfo.province

            $this.isDisbalePro = true // 禁止填写省份
            $this.addressProvince = res.data.memberInfo.province
            $this.city = res.data.memberInfo.city
            $this.isSetPro = true // 是否已经设置过省份  onAddressSlots()中用到
            $this.isReadonly2 = false
            $this.isDisbaleCity = false // 禁止填写市份
            return false
          }
          // 没有填写省份  只填写了市
          if (!res.data.memberInfo.province && res.data.memberInfo.city) {
            // 省或者市有一个在后台填写了的话不允许修改直接报提示请联系客服
            $this.isProOrCity = true
            // 禁用省份
            $this.isReadonly2 = true
            $this.city = res.data.memberInfo.city
            $this.isDisbalePro = false
            $this.isDisbaleCity = true
            $this.isShowProvWarn = false
            $this.isShowCityWarn = false
            return false
          }
        }
        // 0 已绑定
        if (res.status === '0') {
          $this.$router.push('/wap/cardList')
        }
      })
    }
  },
  mounted () {
    // 如果用户已提交过绑定银行卡信息，但是不完整请求接口获取用户已输入信息
    this.initDrawData()
    // 获取银行卡信息
    this.$store.dispatch('shareApi.getBankList.action', {versionFun: true}).then(res => {
      this.bankList = res.data.bankList
    })
    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headTitle = '添加银行卡'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headback = false
    var postActioin = { type: 'h5', versionFun: true }
    this.$store.dispatch('user.register', postActioin).then(res => {
    })
  },
  destroyed () {
    localStorage.removeItem('isSetBankCard')
    window.indexMain.openScroll()
    document.documentElement.style.position = ''
  }
}
</script>
