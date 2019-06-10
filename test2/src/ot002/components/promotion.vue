<template>
  <div class="container">
    <div class="inner-banner">
      <figure class="activity-banner"></figure>
    </div>
    <div class="indexCont activity-content-bg">
      <div class="contentBox">
        <div class="ac-content" v-for="(item, index) in activitylist" :key="index" v-if="getActivity(item)">
          <div @click="handleActive(index)">
            <img v-if="item.mouseStatusSim === 0" :src="fastDfsUrl+item.mouseOffPicSim">
            <img v-if="item.mouseStatusSim === 1" :src="fastDfsUrl+item.mouseOutPicSim"
            @mouseout="$event.currentTarget.src=`${fastDfsUrl+item.mouseOutPicSim}`" @mouseover="$event.currentTarget.src=`${fastDfsUrl+item.mouseInPicSim}`">
          </div>
          <div v-html="item.contextSim" v-show="cur === index" v-if="item.picStatusSim === 0">
          </div>
          <div v-show="cur === index" v-if="item.picStatusSim === 1">
            <img :src="fastDfsUrl+item.cpicSim">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import promotion from '@s/components/promotion'
var promo = window._.extend({}, promotion)
export default promo
</script>