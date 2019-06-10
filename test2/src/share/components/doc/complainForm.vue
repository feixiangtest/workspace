<template>
  <div class="complainForm">
      <div class="complainTittle">投诉建议</div>
      <form>
          <fieldset>
              <div class="bannerWrap">
                  <div class="fldgk">
                      <img class="cry-gif" src="/resource/share/RESOURCE_VERSION/imgs/complain80.gif">
                  </div>
                  <div class="bannerds">
                      <img class="cry-gif" src="/resource/share/RESOURCE_VERSION/imgs/complain395.png">
                  </div>
              </div>
              <p style="padding-bottom: 20px;">
                  <label for="parentName">投诉/建议类型：</label>
              </p>
              <p>
                  <label for="parentName"></label>
                  <input name="proposalType" type="checkbox" value="10" id="proposalType10">&nbsp;客服态度不好&nbsp;
              </p>
              <p>
                  <label for="parentName"></label>
                  <input name="proposalType" type="checkbox" value="9" id="proposalType9">&nbsp;游戏不好玩&nbsp;
              </p>
              <p>
                  <label for="parentName"></label>
                  <input name="proposalType" type="checkbox" value="8" id="proposalType8">&nbsp;游戏太少&nbsp;
              </p>
              <p>
                  <label for="parentName">投诉/建议内容：</label>
                  <textarea name="proposalContent" id="proposalContent" cols="5" rows="6"></textarea>
              </p>
              <p>
                  <strong>账号：</strong>
                  <input type="text" id="accountName" name="accountName" class="user_name">
                  <strong>QQ：</strong>
                  <input type="text" id="qq" name="qq" class="user_qq">
                  <strong>验证码：</strong>
                  <input type="text" id="yzm" name="yzm" class="use_yzm" onfocus="reloadCode();" maxlength="4" autocomplete="off">
                  <img class="img_yzm" id="vcodeImg" onclick="reloadCode();" src="/validCode">
              </p>
          </fieldset>
          <div class="tijiao">
              <input type="button" name="op" value="提交" onclick="tijiao()" class="submitBut">
          </div>
      </form>
  </div>
</template>

<script>
  /*
   vue 单独编译注释：
   单独编译 不要 import 引入
   * */
  export default {
    name: 'complainForm',
    data () {
      return {
      }
    }
  }
</script>

