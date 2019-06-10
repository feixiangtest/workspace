<template>
  <dd>
    <div class="item-input quickElect">
      <span v-for="(item, index) in goldList" :key="index" :class="{ 'active': goldActive[index] }" @click="getGlod(index)">{{ item }}</span>
    </div>
  </dd>
</template>
<script>
  export default {
    data () {
      return {
        goldActive: {
          0: false,
          1: false,
          2: false,
          3: false,
          4: false,
          5: false
        }
      }
    },
    props: {
      goldList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      getGlod (index) {
        let $this = this
        window._each(this.goldActive, (val, key) => {
          $this.goldActive[key] = false
          if (key * 1 === index) $this.goldActive[key] = true
        })
        this.$emit('upGold', this.goldList[index])
      }
    },
    computed: {}
  }
</script>
