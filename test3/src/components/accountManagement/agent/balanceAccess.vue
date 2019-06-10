<template>
    <div class="mainBox">
        <div class="list-part-out">
            <div class="list-part">
                <dl class="public-list clearfix">
                    <dd class="common-item">
                        <h5 class="title">代理</h5>
                        <p class="con-txt subText">dasd11</p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">存取</h5>
                        <p class="con-txt">存入<i class="yo-icon icon-next"></i></p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">金额</h5>
                        <p class="con-txt">
                            <input type="text" placeholder="输入金额">
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">安全码：</h5>
                        <p class="con-txt">
                            <input type="text" placeholder="未绑定请留空" maxlength="6">
                        </p>
                    </dd>
                </dl>
            </div>
            <!-- <div class="yow"><div class="alerttxt">注：为了您的资金安全，余额存取前请绑定安全码！</div></div> -->
            <div class="btn-box btn-block text-center">
                <a href="javascript:void(0)" class="btn btn-lg btn-primary">确定</a>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'balanceAccess',
  components: {
  }
}
</script>
