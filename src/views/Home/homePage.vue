<template>
  <div>
    <div>
      <!-- 固定导航栏 就是有搜索小图标的那个 fixed默认是false 就是在标签内不写 写的话就是true-->
      <van-nav-bar fixed>
        <!--插槽的使用 -->
        <template v-slot:left>
          <van-icon>
            <!-- 放图片，现在还没有 -->
            <img src="" alt="" class="logo" />
          </van-icon>
        </template>
        <template v-slot:right>
          <!-- 坑： postcss只能style里css样式代码，标签内行内样式它无法px 转rem 需手动-->
          <van-icon color="#fff" name="search" size="0.48rem" />
        </template>
      </van-nav-bar>
      <!-- 导航部分 -->
      <!-- v-model只所以绑定的是value属性 active =1 默认选中第一个标签-->
      <!-- animated 过渡效果 -->
      <!--change事件 当激活的标签改变时触发 -->
      <!-- 问题：每次切换tab拿到的数据都是新的 即使你用keep-alive也没用（防止组件被销毁，而你的组件没有销毁，是在点击切换数据） -->
      <!-- 解决上面问题：外面现在用的是同一个数据切换数据（多个ArticleList用的是同一个数组，换会影响别人） -->
      <!-- 文章列表数据，请求，数组，分别放入到ArtcleList内部（自己请求自己的数据）-->
      <!-- @change="changeChannelstab" 可以注释掉了 -->
      <div class="main">
        <van-tabs v-model="channelId" @change="changeChannelstab" animated sticky offset-top="1.226677rem">

          <van-tab  v-for="item in userChannelsData " :key="item.id" :title="item.name">
            <!-- {{item.name}}  这里面的内容太多了，我们可以自己封装组件引入到这里-->
            <artcalList :channelId="channelId"></artcalList>

            </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
// 导入userChannelsApi函数
import { userChannelsApi } from '@/api/index.js'
// 导入文章整个列表artcalList
import artcalList from './components/artcalList.vue'
export default {
  components:
  {
    artcalList
  },
  data () {
    return {
      channelId: 0, // tab导航-激活频道id(默认频道id为0) ，页面刚打开是推荐频道高亮-对应文章数据 active
      userChannelsData: []
      // getartcal: []
    }
  },
  async created () {
    const res = await userChannelsApi()
    console.log(res)
    this.userChannelsData = res.data.data.channels

    // 获取新闻推荐列表
    // const res2 = await getallartcalListApi({
    //   channel_id: this.active, // 默认推荐频道id  当我们tab标签时 对应页面并没有刷新，有没有监听的active的事件呢？查文档
    //   timestamp: (new Date()).getTime()
    // })
    // console.log(res2)
    // this.getartcal = res2.data.data.results
    //* ********************************** */
    // 设置默认tab标签时，渲染的页面；们我可以调用changeChannelstab 方法
    // this.changeChannelstab()
  },
  methods: {
    async changeChannelstab () {
    //   const res2 = await getallartcalListApi({
    //     channel_id: this.active, // 默认推荐频道id  当我们tab标签时 对应页面并没有刷新，有没有监听的active的事件呢？查文档
    //     timestamp: (new Date()).getTime()
    //   })
    //   console.log(res2)
    //   this.getartcal = res2.data.data.results
    // }
    }

  }
}

</script>
<style scoped>
.main{
  padding-top: 44px;
  /* 底部在Layout界面设置好了 */
}
</style>
