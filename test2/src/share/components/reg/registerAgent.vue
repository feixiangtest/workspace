<template>
    <div class="yo-register yo-md-reg">
		<div class="yo-reg-center">
			<div class="yo-r-main">
				<fieldset>
				 	<legend class="r-zhzc">代理注册</legend>
				 	<div class="yo-rbox-cen">
				 		<div class="reg-box">
				 			<span class="joinus-label"><span class="red-sign">*</span>登录账号：</span>
                            <input class="joinus-input" type="text" maxlength="12" placeholder="请输入您的账号">
                            <p class="y-correct-msg t-tipmsg">账号为6-12个字符的英文字母或数字！</p>
				 		</div>
				 		<div class="reg-box">
				 			<span class="joinus-label"><span class="red-sign">*</span>登录密码：</span>
				 			<div class="yo-pass-box">
				 				<input class="joinus-input" type="password" maxlength="12" placeholder="请输入您的密码">
				 				<a class="yo-mm-xs" href="javascript:;" title=""></a>
				 			</div>
                            <p class=""></p>
				 		</div>
				 		<div class="reg-box">
				 			<span class="joinus-label"><span class="red-sign">*</span>确认密码：</span>
				 			<div class="yo-pass-box">
	                            <input class="joinus-input" type="password" maxlength="12" placeholder="请确认您的密码">
	                            <a class="yo-mm-yc" href="javascript:;" title=""></a>
                            </div>
                            <p class="y-error-msg t-tipmsg">密码输入不统一</p>
				 		</div>
				 	</div>
				</fieldset>

				<fieldset>
				 	<legend class="r-dlsj">代理数据</legend>
				 	<div class="yo-rbox-cen">
				 		<div class="reg-box">
				 			<span class="joinus-label">真实姓名：</span>
                            <input class="joinus-input" type="text" maxlength="12" placeholder="请输入真实姓名">
                            <p class="y-warn-msg t-tipmsg">必须与您的银行账户相同，否则不能出款！</p>
				 		</div>
                        <div class="reg-box">
				 			<span class="joinus-label">推广网址：</span>
                            <input class="joinus-input" type="text" maxlength="12" placeholder="请您输入www.abc.com格式">
                            <p class="y-warn-msg t-tipmsg"></p>
				 		</div>
                        <div class="reg-box">
				 			<span class="joinus-label">其他推广网址：</span>
                            <input class="joinus-input" type="text" maxlength="12" placeholder="请输入您的其它推广平台或文字叙述">
                            <p class="y-warn-msg t-tipmsg"></p>
				 		</div>
                        <div class="reg-box">
				 			<span class="joinus-label">手机：</span>
                            <input class="joinus-input" type="password" maxlength="12" placeholder="请输入手机号码">
                            <p class=""></p>
				 		</div>
                        <div class="reg-box">
				 			<span class="joinus-label">QQ：</span>
                            <input class="joinus-input" type="password" maxlength="12" placeholder="请输入QQ账号">
                            <p class=""></p>
				 		</div>
				 		<div class="reg-box yo-special">
				 			<span class="joinus-label">Email：</span>
                            <input class="joinus-input" type="password" maxlength="12" placeholder="请输入您的常用邮箱地址">
                            <div class="spec-div ">
                            	<p class="yo-mail">未收到邮件？<a class="yo-c-link" href="javascript:;">重新发送</a></p>
                            </div>
                            <p class=""></p>
				 		</div>
                    </div>
                </fieldset>

                <fieldset>
				 	<legend class="r-yhzl">银行资料</legend>
                    <div class="yo-rbox-cen">
				 		<div class="reg-box">
				 			<span class="joinus-label"><span class="red-sign">*</span>出款银行：</span>
                            <input class="joinus-input" type="text" maxlength="12" placeholder="请输入英文姓名">
                            <p class=""></p>
				 		</div>
				 		<div class="reg-box">
				 			<span class="joinus-label"><span class="red-sign">*</span>银行账号：</span>
                            <input class="joinus-input" type="password" maxlength="12" placeholder="请输入您的银行账号">
                            <p class=""></p>
				 		</div>
                        <div class="reg-box">
				 			<span class="joinus-label"><span class="red-sign">*</span>银行省份：</span>
                            <input class="joinus-input" type="password" maxlength="12" placeholder="请输入您的开户行省份">
                            <p class=""></p>
				 		</div>
                        <div class="reg-box">
				 			<span class="joinus-label"><span class="red-sign">*</span>银行县市：</span>
                            <input class="joinus-input" type="password" maxlength="12" placeholder="请输入您的开户行县市">
                            <p class=""></p>
				 		</div>
				 		<div class="reg-box yo-special">
				 			<span class="joinus-label"><span class="red-sign">*</span>证件号码：</span>
                            <input class="joinus-input" type="password" maxlength="12" placeholder="请输入证件号码">
                            <div class="spec-div radio-type">
                            	<label><input type="radio" name="idPassportNoType" value="0" checked="checked">身份证</label>
                            	<label><input type="radio" name="idPassportNoType" value="1">护照</label>
                            </div>
                            <p class="y-error-msg t-tipmsg">身份证输入格式不正确！</p>
				 		</div>
				 		
				 		<div class="reg-box">
				 			<span class="joinus-label"><span class="red-sign">*</span>取款密码：</span>
                            <input class="joinus-input yo-qkmm" type="password" maxlength="12" placeholder="请输入取款密码">
                            <div class="yo-keyboard">
                            	<div class="yo-shur">
                            		<input type="text" name="" value="">
                            		<input type="text" name="" value="">
                            		<input type="text" name="" value="">
                            		<input type="text" name="" value="">
                            	</div>
                            	<div class="yo-number">
                            		<span>6</span>
                            		<span>7</span>
                            		<span>8</span>
                            		<span>9</span>
                            		<span>2</span>
                            		<span>3</span>
                            		<span>4</span>
                            		<span>5</span>
                            		<span>0</span>
                            		<span>1</span>
                            		<span class="yo-k-qc">AC</span>
                            	</div>
                            </div>
                            <p class=""></p>
				 		</div>
				 		
				 	</div>
				</fieldset>
				<fieldset>
				 	<legend class="r-aqjc">安全检查</legend>
				 	<div class="yo-rbox-cen">
				 		<div class="reg-box">
				 			<span class="joinus-label"><span class="red-sign">*</span>验证码：</span>
				 			<div class="yo-yzmbox">
				 				<input class="joinus-input" type="text" maxlength="12" placeholder="请输入验证码">
				 				<img src="images/code.jpg" alt="">
				 			</div>
                            <p class="y-warn-msg t-tipmsg">您的验证码填写错误！</p>
				 		</div>
				 		<div class="reg-box yo-agreement">
				 			<span class="joinus-label"><input type="checkbox" name=""></span>
				 			<h6>本人已满合法年龄，且同意开户协议！</h6>
				 		</div>
				 		<div class="reg-box submit-box">
				 			<a class="yo-sub-but" href="javascript:;" title="">提交信息</a>
				 		</div>
				 	</div>
				</fieldset>
			</div>
			<div class="yo-r-bot">
				<h6>备注：</h6>
				<ol>
					<li>标记有<span class="red-sign">*</span>者为必填项目。</li>
					<li>取款密码为取款金额时的凭证，请会员务必填写牢记。</li>
					<li>温馨提示：注册时如遇到同名或注册不了等其它问题请联系在线客服，我们会第一时间为您解决好！</li>
				</ol>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

