<template>
  <div id="app">
    <!-- 可以设置不要缓存的组件 -->
    <keep-alive exclude="searchPage,SearchResult,detailPage,UserEdit,loginPage">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>
<script>
// 下面是测试的接口
// import { allItem } from '@/api/index'

export default {
  // async  created () {
  //   try {
  //     const res = await allItem()
  //     console.log(res)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
}
// try 里面的内容出错不会执行，会在catch里执行
</script>

<style lang="less">
</style>
