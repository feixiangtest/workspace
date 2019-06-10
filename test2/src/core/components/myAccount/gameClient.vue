<template>
    <div class='contentBox'>
        <table class="yoMemTable2">
            <thead>
                <tr>
                    <th colspan="6">游戏平台</th>
                </tr>
                <tr>
                    <th>游戏平台</th>
                    <!-- <th>操作说明</th> -->
                    <th>账号密码</th>
                    <th colspan="3">操作方式</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>AG手机客户端</td>
                    <!-- <td><a href="http://status.bwtddos.com/man/MobileOperationManual.rar" target="_blank">手机端操作说明</a></td> -->
                    <td>
                        <p>请进入AG游戏内<br> 扫描二维码登录
                        </p>
                    </td>
                    <td colspan="2">
                        <p>1.在手机上输入agmbet.con<br> 2.扫描右侧二维码
                        </p>
                    </td>
                    <td>
                        <a href="javascript:;" v-show="agCodeFlag" @click="agCodeFlag = false">安卓手机端二维码</a>
                        <img src="/resource/core/images/ag_phone_img.png" @click="agCodeFlag = true" v-show="!agCodeFlag" class="agPhoneImg"/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  data () {
    return {
      agCodeFlag: true // 展示AG图片标识
    }
  }
}
</script>
