<template>
  <div class="home_container">
    <!-- 美化样式, 给router-view外面, 套一个div.home_container,
     并且防止二级页面内容, 被底部导航挡住 -->
    <router-view></router-view>
  <div>
      <!-- route 开启路由模式 就是能用to 进行路由跳转 -->
      <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to="/Layout/Home">首页</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/Layout/User">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>

export default {
  name: 'aLayout',
  data () {
    return {
      active: 0
    }
  },
  mounted () {},
  computed: {},
  methods: {}

}
</script>
<style scoped lang="less">
/* 内容底部内边距(把内容往上挤压, 防止内部被底部导航挡住) */
.home_container {
  padding-bottom: 50px;
}
/* 底部导航上边框 */
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
