<template>
  <div v-if="detail" class="msgDetail">
      <div class="text-right backUp">
         <!-- <h2 style='text-align:center;float:left;line-height:36px;font-size:14px;'>{{detailTitle}}</h2> -->
         <h2 style='text-align:center;float:left;line-height:36px;font-size:14px;width:700px;text-align:left'>{{detailTitle}}</h2>
          <el-button @click="backUp" >返回上一级</el-button>
      </div>
      <p class="text-right"><span><i class="el-icon-time"></i>{{detailDate}}</span></p>
      <div class="detailCon" style="word-break: break-all;">{{detailConten}}</div>
  </div>
</template>
<script>
export default {
  props: ['detail', 'detailConten', 'detailDate', 'backUp', 'detailTitle']
  // data () {
  //   return {
  //     title: '让黎畅明没想到的是，上次在澳大没见着总书记，这回在珠海遇上了。22日下午，习近平在时隔六年后再次赴广东考察，第一站就到了横琴粤澳合作中医药科技产业园'
  //   }
  // }
}
</script>
