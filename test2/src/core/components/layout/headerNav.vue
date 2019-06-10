<template>
    <div class="memberTab">
        <ul class="headerNav clearfix">
            <li style='' v-for='(item,index) in headerMenu' :key='index' :class="{activeTab:menuIndex===item.routeId}" @click='menuChange(item.routeId,item)'>{{item.title}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
      props: ['menuChange'],
      data () {
        return {
        }
      },
      methods: {
      },
      computed: {
        headerMenu () {
          return this.$store.state.member.menuTab // 右侧 tab 数据
        },
        menuIndex () {
          return this.$store.state.member.activeTab // 右侧 tab 数据
        }
      }
    }
</script>


