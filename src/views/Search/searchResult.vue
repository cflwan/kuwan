<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
    <!-- 搜索结果 -->
    <div>
      <van-list
       :immediate-check=false
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <artcal-item
          v-for="(obj, index) in artcalDate"
          :key="index"
          :tobj="obj"
          :iShow="false"
          @click.native="detailChg(obj.art_id)">
        </artcal-item>
      </van-list>
    </div>
  </div>
</template>

<script>
// 事件修饰符.navtive ->给组件内根标签，绑定原生的click点击事件
import { getSearchApi } from '@/api/index'
import artcalItem from '@/components/artcalItem.vue'

export default {
  components: { artcalItem },
  data () {
    return {
      page: 1,
      artcalDate: [],
      loading: false,
      finished: false

    }
  },
  name: 'SearchResult',
  //   q: this.$route.params.key  要求传入搜索关键词 可以从路由中获取 因为路由里的哪个参数已经被用户输入关键字和历史记录关键字和联系字符串关键字传过了
  async created () {
    const res = await getSearchApi({
      page: this.page,
      q: this.$route.params.key
    })
    console.log(res)
    this.artcalDate = res.data.data.results
  },
  methods: {
    async onLoad () {
      this.page++

      const res2 = await getSearchApi({
        page: this.page,
        q: this.$route.params.key
      })
      if (res2.data.data.results.length === 0) {
        this.finished = true
      }
      console.log(res2)
      this.artcalDate = [...this.artcalDate, ...res2.data.data.results]
      this.loading = false
    },
    detailChg (id) {
      this.$router.push({ path: `/detail?art_id=${id}` })
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
/deep/ .van-nav-bar .van-icon{
  color: #fff;
}
</style>
