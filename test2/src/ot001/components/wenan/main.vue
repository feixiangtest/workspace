<template>
    <div>
        <!--文案标题 begin-->
        <h2 class="about-title">
            {{getCurSection.title}}
        </h2>
        <!--文案标题 end-->
        <div class="about-text-box" v-if='pageMark===1'>
            <div class="about-tab-bar">
                <a href="javascript:void(0)" v-for="(item,index) in getArticleListArr" :key="index"
                    :class="curIndex === index?'on':''" @click="curIndex = index">{{item.titleSim}}</a>
            </div>
            <div class="about-tab-texts">
                <div v-for="(item,index) in getArticleListArr" :key="index" class="texts-box" style='word-break: break-all;'
                    :style="curIndex === index?'display: block;':'display: none;'">
                    <div v-if="item.picStatusSim === 0" v-html="item.contextSim"></div>
                    <img v-if="item.picStatusSim === 1" :src="fastDfsUrl+item.cpicSim">
                </div>
                <contact-form :contact="getContact"></contact-form>
            </div>
        </div>
        <div class="about-text-box" v-else>
            <div class="about-tab-texts">
                <div v-for="(item,index) in getArticleListArr" :key="index" class="texts-box" style='word-break: break-all;'>
                    <p style='color:black;'>{{item.titleSim}}</p>
                    <div v-if="item.picStatusSim === 0" v-html="item.contextSim"></div>
                    <img v-if="item.picStatusSim === 1" :src="fastDfsUrl+item.cpicSim">
                </div>
                <contact-form :contact="getContact"></contact-form>
            </div>
        </div>
    </div>
</template>
<script>
import wenan from '@s/components/wenan'
var _wenan = window._.extend({}, wenan)
export default _wenan
</script>
