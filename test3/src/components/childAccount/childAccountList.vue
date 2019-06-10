<template>
	<div class="mainBox">

		<!-- 子账号 -->
		<div class="">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
          				 @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
				<table class="yo-table table-bg">
					<thead>
						<tr>
							<th>用户名</th>
							<th>账号状态</th>
							<th>最后登录时间</th>
							<th>备注</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, key) in subAccountList" :key="key">
							<td><p>{{item.account}}</p></td>
							<td @click="chgUseStatus(item)" v-html="item.useStatus"></td>
							<td>{{item.loginTime}}</td>
							<td><p>{{item.remark}}</p></td>
							<td><i class="yo-icon icon-next"></i></td>
						</tr>
					</tbody>
				</table>
				<div slot="top" class="mint-loadmore-top">
					<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
						<i class="yo-icon icon-load-top"></i>
						<em>松开刷新....</em>
					</span>
					<mt-spinner color="#585252" :type="3" v-show="topStatus === 'loading'"></mt-spinner>
				</div>
				<div slot="bottom" class="mint-loadmore-bottom" style="display: block">
					<mt-spinner color="#585252" :type="3" v-show="bottomStatus === 'loading'"></mt-spinner>
				</div>
			</mt-loadmore>
		</div>

		<!-- <router-link tag='div' to='/addChildAccount'>添加子账号</router-link> -->

	</div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
import Loadmore from 'mint-ui/lib/loadmore' // 按需加载mint-ui的模块
import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
import * as childType from '../../store/childAccount/type'
import * as statusCode from '../../utils/status_const'

Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)

export default {
  data () {
    return {
      pageNo: 1,
      account: '',
      topStatus: '',
      bottomStatus: '',
      allLoaded: false,
      subAccountList: [],
      status: Number // 状态存放
    }
  },
  computed: {
    ...mapState({
      useStatus: state => state.childAccount.useStatus // 状态
    //   limit: state => state.childAccount.limit // 条数
    //   account: state => state.user.userInfo.account // 账号
    })
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadTop () {
      // 加载更多数据
      this.pageNo = 1
      this.subAccountList = []
      this.initData(0)
      this.allLoaded = false // 下拉加载后重置滑动加载
    },
    loadBottom () {
      // 加载更多数据
      this.initData(1)
    },
    /**
     * @augments type 0:下拉刷新  1：上拉加载
     *
     */
    initData (type) {
    //   let limit = window.store.state.childAccount.limit
      let param = {
        'page': this.pageNo,
        'limit': 20,
        'account': this.account
      }
      // 请求基本资料数据
      this.$store.dispatch(childType.SUBACCOUNTLIST_ACTION, param).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          if (res.data.length === 0) {
            this.allLoaded = true // 若数据已全部获取完毕
          } else this.pageNo++
          this.subAccountList = this.subAccountList.concat(res.data)
          console.log(res.data)
        }
        if (Number(type) === 0) {
          this.$refs.loadmore.onTopLoaded()
        } else if (Number(type) === 1) {
          this.$refs.loadmore.onBottomLoaded()
        }
      })
    },
    // 修改账号状态
    chgUseStatus (item) {
      let confirmMsg = ''
      // 判断状态是否等于0 ，0为启用 1为停用
      if (item.useStatus === window.store.state.childAccount.blockUp) {
        this.status = 0
        confirmMsg = '是否要启用此账号？'
      } else {
        if (item.errorNum < 6) {
          this.status = 1
          confirmMsg = '是否要停用此账号？'
        } else {
          this.status = 0
          confirmMsg = '是否要解冻此账号？'
        }
      }
      let param = {
        'id': item.id,
        'status': this.status
      }
      window.layer.confirm(confirmMsg, () => {
        // 请求基本资料数据
        this.$store.dispatch(childType.CHANGEUSESTATUS, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            if (this.status === 0) {
              item.useStatus = window.store.state.childAccount.startUsing
            } else {
              item.useStatus = window.store.state.childAccount.blockUp
            }
            window.layer.msgWarn('账号状态修改成功！')
          }
        })
      })
    }
  },
  mounted () {
    this.$store.state.home.headerType = 4
    this.historyRecordData = []
    this.initData()
  }
}
</script>

