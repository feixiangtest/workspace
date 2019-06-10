<template>
<div>
<nav class="tabs tabs-icon-top tabs-dark" id="app-footer">
	  <a class="tab-item" href="javascript:void(0)" ng-click="goTry()">
	    <i class="icon ion-ios-personadd"></i>
		  免费试玩
	  </a>
	  <a class="tab-item" href="javascript:void(0)" ng-click="goLogin()">
	    <i class="icon ion-ios-contact"></i>
	    立即登录
	  </a>
	  <a class="tab-item" href="/wap/login?type=openForgotPassword">
	    <i class="icon ion-ios-help-outline"></i>
	   忘记密码
	  </a>
	  <a class="tab-item" href="http://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=835639&amp;configID=57719&amp;jid=1460203674" ng-init="chatbubbles = &quot;http://chat7.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=835639&amp;configID=57719&amp;jid=1460203674&quot; ">
	    <i class="icon ion-chatbubbles"></i>
	    在线客服
	  </a>
</nav>
</div>
</template>
<script>

export default {

}
</script>

