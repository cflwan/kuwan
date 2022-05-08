<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-fofo
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        v-model.trim="kw"
        @input="inputFn"
      />
      <!--  vant自定义事件 @input="inputFn"  input输入框内容变化时触发 -->

    </div>
    <!-- 搜索建议列表 -->
      <div class="sugg-list">
        <div
          class="sugg-item"
          v-for="(sugg,index) in suggestListItem"
          :key="index"  v-html="chgColor(sugg,kw)"
        >
          <!-- {{ chgColor(sugg,kw)}} -->
        </div>

      </div>
  </div>
</template>

<script>
import { suggestDataApi } from '@/api/index'
export default {
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null, // 设置定时器为空
      suggestListItem: []
    }
  },
  methods: {
    inputFn () {
      //   输入框防抖
      clearTimeout(this.timer) // 下一次执行时清空定时器
      if (this.kw.length === 0) {
        this.suggestListItem = []
      } else {
        this.timer = setTimeout(async () => {
          const res = await suggestDataApi({
            keywords: this.kw
          })
          this.suggestListItem = res.data.data.options
        }, 300)
      }
    },
    // 把输入的关键字替换提示信息并且变颜色
    chgColor (orgData, keyData) {
      /*
         orgDate:联想后的字符串【请求服务器给的】；原字符串
         keyData:用户再输入框输入的关键字
         字符串.replace()--->替换第一个符合条件的
         字符串.replaceAll()-->替换全部
        例如：联想后的字符串:"好同志，就是厉害" ，用户输入的关键字:"好"
        返回值：替换后的完整字符串
        */
      const reg = new RegExp(keyData, 'ig')
      //   如果你要使用变量，作为正则的匹配条件，不能用语法糖简化写法
      return orgData.replaceAll(reg, (match) => {
        return `<span style="color:red;">${match}</span>`
      })
    }

  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
