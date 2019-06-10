<template>
    <div class="login-after clearfix">
        <div class="clearfix">
            <div style="min-width: 278px;float: left">
                <div class="userBox clearfix">
                    <span>账号：<em>{{userInfo.account}}</em></span>
                    <div id="moreMoney-btn" style="display: inline-block;cursor: pointer;" @click.stop="showDownBalance()">
                        <span>余额：
                            <em id="totalMoney" v-if='isOnloading'>加载中..</em>
                            <em v-else>{{ totalDataform.totalMoney |moneyFilter}}</em>
                            </span>

                        <i class="moreMoney-btn"></i>
                        <balance :changeToOnLoading='changeToOnLoading' :showBalanceBox="showBalanceBox" :userInfo="userInfo" :changeShowBalance="getShowBalanceBox"></balance>
                    </div>
                </div>
            </div>
            <button class="outBtn" @click='loginOut'>退出</button>
        </div>
        <div class="memberCenter">
            <ul class="clearfix">
                <li>
                    <a @click="toUrl('/center/myAccount/baseConsole')" href="javascript:void(0);">会员中心</a>
                    <span>|</span>
                </li>
                <li>
                    <a @click="toUrl('/center/bankTransaction/onlinePayment')" href="javascript:void(0);">线上存款</a>
                    <span>|</span>
                </li>
                <li>
                    <a @click="toUrl('/center/bankTransaction/onlineWithdrawals',1,'线上取款')" href="javascript:void(0);">线上取款</a>
                    <span>|</span>
                </li>
                <li id="redPoint">
                    <a @click="toUrl('/center/personInfo/personMsg')" href="javascript:void(0);">站内信
                            <span id="Messages">({{msgCount}})</span>
                      <img src="/resource/share/RESOURCE_VERSION/imgs/red-dot.png" v-if="msgCount > 0">
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import loginAfter from '@s/components/loginAfter'
    var _loginAfter = window._.extend({}, loginAfter)
    export default _loginAfter
</script>

