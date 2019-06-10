<template>
    <div>
        <el-collapse v-model="activeNames" v-show="$route.params.id === 'deposit'">
            <el-collapse-item title="在线支付" name="1">
                <div>线上支付是电子支付的一种形式，它是通过第三方提供的与银行之间的支付接口进行的即时支付方式，
                线上支付优势在于可以直接把资金从用户的银行卡中转账到网站账户中，汇款马上到账，不需要人工确认。</div>
                <div>服务费：免费</div>
                <div>处理时间:即时</div>
            </el-collapse-item>
            <el-collapse-item title="银行汇款" name="2">
                <div>银行汇款是指通过自动柜员机、柜台等线下方式存入或者转账，为您的游戏账号充值的一种支付方式，在进行银行汇款时请尽量
                    多汇入0.1元，并且在汇款成功后第一时间与本站客服联系！需要注意的是不同的转账方式，到账时间会稍有不同，特别是跨行转
                    账可能需要较长到账时间。</div>
                <div>服务费:免费(银行可能会对交易收取交易费用。)</div>
                <div>处理时间:即时</div>
            </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames2" v-show="$route.params.id === 'withdrawl'">
            <el-collapse-item title="提款" name="1">
                <div>在公司相关部门审阅并核实后，系统会把提款资金从您的游戏账户转账到您的银行账户！
                    提款前，您必须至少完成100%存款额的投注！
                    在使用过程中，如有任何疑问请随时联系在线客服。
                </div>
                <div>最低提款：RMB 100.00</div>
                <div>服务费：免费</div>
                <div>处理时间:3-10分钟</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
 export default {
   data () {
     return {
       activeNames: ['1', '2'], // 存款默认开启页
       activeNames2: ['1'] // 提款默认开启页
     }
   },
   mounted () {
     this.$store.state.help.activeId = this.$route.params.id // 设置选中的文章条目为传过来的参数
   },
   methods: {
 
   },
   watch: {
     '$route' (to, from) {
       this.$store.state.help.activeId = this.$route.params.id // 设置选中的文章条目为传过来的参数
     }
   }
 }
</script>
