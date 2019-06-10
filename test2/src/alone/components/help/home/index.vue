<template>
    <div class="helpHomeBox">
        <div class="helpCategoryContainer clearfix">
            <div class="helpIcon faqs"></div>
            <div class="helpCategoryTitle">
                <a class="helpTitle" href="javascript:;" @click="toUrl('question',1253617)">常见问题</a>
                <div class="helpBlurb">查找常见问题的答案。</div>
            </div> 
        </div>
        <div class="helpCategoryContainer clearfix">
            <div class="helpIcon techIssues"></div>
            <div class="helpCategoryTitle">
                <a class="helpTitle" href="javascript:;" @click="toUrl('question',1253606)">技术问题</a>
                <div class="helpBlurb">您在使用我们的服务时遇到技术问题？我们在此提供大多数常见问题的解决方法。</div>
            </div> 
        </div>
        <div class="helpCategoryContainer clearfix">
            <div class="helpIcon rules"></div>
            <div class="helpCategoryTitle">
                <a class="helpTitle" href="javascript:;" @click="toUrl('question',1253712)">规则</a>
                <div class="helpBlurb">我们的体育投注和游戏规则可以在此查看。</div>
            </div> 
        </div>
        <div class="helpCategoryContainer clearfix">
            <div class="helpIcon payments"></div>
            <div class="helpCategoryTitle">
                <a class="helpTitle" href="javascript:;" @click="toUrl('pay','deposit')">支付方式</a>
                <div class="helpBlurb">我们提供一系列方式帮助您进行简便快捷的存/提款。</div>
            </div> 
        </div>
    </div>
</template>
<script>
    export default {
      data () {
        return {
        }
      },
      created () {
        this.$store.state.help.activeId = 'home' // 设置选中的文章条目为传过来的参数
      },
      methods: {
        toUrl (name, id) {
          this.$router.push({ name: name, params: { id: id } })
        }
      },
      computed: {
      }
    }
</script>


