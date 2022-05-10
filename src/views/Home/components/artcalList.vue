<template>
  <div>
    <!-- 每个标签页下面手机往上刷新的时候，加载文章 -->
    <!-- offset前面不加v-bind 是因为50是一个值，不是表达式 ；值的话不加v-bind -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- //van-pull-refresh 下拉刷新 -->
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="50"
      >
        <artcalItem
          v-for="t in list"
          :key="t.art_id"
          :tobj="t"
          @dislikeEv="fndislike"
          @reportApi="fnreport"
          @click.native="detailChg(t.art_id)"
        ></artcalItem>
        <!-- //t 应该是一个对象 -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getallartcalListApi, articelDislike, getReportApi } from '@/api/index'
import artcalItem from '@/components/artcalItem.vue'
import { Notify } from 'vant'

// 问题1:网页刚打开，created里请求和onload李请求同时发送，请求的都是最新数据
// onload中，2次数据的合并，数据重复了，key 重复了
// 原因：van-list组件，数组挂载时，默认就会判定一次是否触底  ，（我的理解：开始渲染页面时，盒子高度是0，就触底了）
// 第一页数据也是网络请求回来的，标签先挂载了，数据回来更新DOM，所以标签没有高度，list的onload事件上来就触发
// 解决方案一：查Vant文档，在list那栏，，list组件添加 :immediate-check='false' 默认是true 就是检查触不触底
// 解决方案二：在onLoad第一行，写数组长度的判断
export default {
  props: {
    // list: Array // 文章列表数组
    channelId: Number // 频道ID
  },
  components: { artcalItem },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      theTime: new Date().getTime(),
      isLoading: false,
      Notify
    }
  },
  mounted () {},
  computed: {},
  methods: {
    // 下拉刷新
    async onLoad () {
      if (this.list.length === 0) {
        return // 如果页面没有数据，没有高度，让本次onLoad逻辑代码不往下执行
      }
      const res2 = await getallartcalListApi({
        channel_id: this.channelId,
        timestamp: this.theTime
      })

      this.list = [...this.list, ...res2.data.data.results] // 数组的拼接
      this.theTime = res2.data.data.pre_timestamp // pre_timestamp 是第一发给服务器的时间戳然后返回给我们的山戳
      this.loading = false // 加载状态一定要关闭，不然底部依然是加载状态，下次触底会再次出发onload
    },
    // 上拉刷新
    async onRefresh () {
      this.list = []
      this.theTime = new Date().getTime()
      const res2 = await getallartcalListApi({
        channel_id: this.channelId,
        timestamp: this.theTime
      })

      this.list = [...this.list, ...res2.data.data.results] // 数组的拼接
      this.theTime = res2.data.data.pre_timestamp // pre_timestamp 是第一发给服务器的时间戳然后返回给我们的时间戳
      this.isLoading = false // 表示刷新成功
    },
    // 点击不感兴趣 反馈的信息
    async fndislike (id) {
      await articelDislike({ artId: id })
      Notify({ type: 'success', message: '反馈内容成功' })
    },
    // 点击二级面板的举报
    async fnreport (id, type) {
      await getReportApi({
        autId: id,
        type: type
      })
      Notify({ type: 'success', message: '举报成功' })
    },
    detailChg (id) {
      this.$router.push({ path: `/detail?art_id=${id}` })
    }
  },
  async created () {
    const res2 = await getallartcalListApi({
      channel_id: this.channelId, // 默认推荐频道id  当我们tab标签时 对应页面并没有刷新，有没有监听的active的事件呢？查文档
      timestamp: this.theTime
    })
    console.log(res2)
    // pre-timestamp 下一段开头的那个时间戳
    /**
     * 第一次 系统时间（timestamp） - >转  后台  返回0-9条数据  --携带第10条pre_timestamp【时间戳】 返回
     * 第二次 利用上一次（pre_timestamp）在返回数据 ------ 以此类推
     */
    this.list = res2.data.data.results
    this.theTime = res2.data.data.pre_timestamp
    if (res2.data.data.pre_timestamp === null) {
      this.finished = true // 本次返回来的数据是最后，没有下一页数据了
    }
  }
}
</script>
<style scoped>
</style>
