<template>
    <div class="mainBox">
        <div class="list-part-out">
            <div class="list-part">
                <dl class="public-list clearfix">
                    
                    <dd class="common-item">
                        <h5 class="title">用户名</h5>
                        <p class="con-txt">
                            <input type="text" class="border-none bg-none text-right" placeholder="请输入用户名">
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">密码</h5>
                        <p class="con-txt">
                            <input type="text" class="border-none bg-none text-right" placeholder="请输入密码">
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">确认密码</h5>
                        <p class="con-txt">
                            <input type="text" class="border-none bg-none text-right" placeholder="请再次输入密码">
                        </p>
                    </dd>
                    <dd class="common-item" style="margin-top: 10px;">
                        <h5 class="title">代理余额存入限额</h5>
                        <p class="con-txt">
                            <input type="text" class="border-none bg-none text-right" placeholder="请输入限额">
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">代理余额取出限额</h5>
                        <p class="con-txt">
                            <input type="text" class="border-none bg-none text-right" placeholder="请输入限额">
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">代理余额存入次数限制</h5>
                        <p class="con-txt">
                            <input type="text" class="border-none bg-none text-right" placeholder="请输入次数限制">
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">会员余额存入限额</h5>
                        <p class="con-txt">
                            <input type="text" class="border-none bg-none text-right" placeholder="请输入限额">
                        </p>
                    </dd>
                    <dd class="common-item flex-direction-co" style="margin-top: 10px;height: 106px;">
                        <h5 class="title">备注</h5>
                        <p class="con-txt txtarea">
                            <textarea name="" rows="" cols="" placeholder="请输入备注内容"></textarea>
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
  }
}
</script>
