<template>
    <div class="header-right">
                <div class="mem-info clearfix">
                    <div class="ele-accinfo ele-acc-name">
                        <span>账号：</span>
                        <strong>{{userInfo.account}}</strong>
                    </div>
                    <div class="ele-accinfo">
                        <div class="ele-accinfo">
                            系统余额：
                            <span v-if='isOnloading'>加载中..</span>
                            <span id="totalMoney" v-else>{{totalDataform.totalMoney | moneyFilter}}</span>
                             <balance :changeToOnLoading='changeToOnLoading' :showBalanceBox="showBalanceBox" :userInfo="userInfo" :changeShowBalance="getShowBalanceBox"></balance>
                        </div>
                        <div class="ele-obalance-wrap">
                            <div class="ele-square">
                                <i class="fa-plus-square" @click.stop="showDownBalance()"></i>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="SU-Menual clearfix">
                    <ul class="login-Menual">
                        <li>
                            <a href="javascript:void(0);" @click="toUrl('/center/myAccount/baseConsole')" title="会员中心">会员中心</a>
                        </li>
                        <li>
                            &nbsp;|
                            <a href="javascript:void(0);" @click="toUrl('/center/bankTransaction/onlinePayment','线上存款')" title="线上存款">线上存款</a>
                        </li>
                        <li>
                            &nbsp;|
                            <a href="javascript:void(0);" @click="toUrl('/center/bankTransaction/onlineWithdrawals','线上取款')" title="线上取款">线上取款</a>
                        </li>
                        <li id="redPoint">
                            &nbsp;|
                            <a href="javascript:void(0);" @click="toUrl('/center/personInfo/personMsg')" title="未读讯息">未读讯息(<span id="Messages">{{msgCount}}</span>)</a>
                            <img src="/resource/share/RESOURCE_VERSION/imgs/red-dot.png" v-if="msgCount > 0">
                        </li>
                        <li>
                            &nbsp;
                            <a href="javascript:;" @click='loginOut' title="登出">登出</a>
                        </li>
                    </ul>
                </div>
            </div>
</template>

<script>
    import loginAfter from '@s/components/loginAfter'
    let _loginAfter = window._.extend({}, loginAfter)
    export default _loginAfter
</script>

