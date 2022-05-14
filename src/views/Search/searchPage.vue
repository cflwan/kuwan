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
        @search="searchFn"

      />
      <!--  vant自定义事件 @input="inputFn"  input输入框内容变化时触发 -->
    </div>
    <!-- 搜索建议列表 -->
    <!-- v-if="kw.length !==0" 如果搜索框里有关键字就显示搜索建议列表，没有关键字的话就显示搜索历史列表 -->
    <div class="sugg-list"  v-if="kw.length !==0">
      <div
        class="sugg-item"

        v-for="(sugg, index) in suggestListItem"
        :key="index"
        v-html="chgColor(sugg, kw)"
        @click="suggestFn(sugg)"
      >
        <!-- {{ chgColor(sugg,kw)}} -->
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history"  v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon"  @click="clearFn"/>
          <!-- @click="clearFn" 清空历史记录 -->
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list" >
        <span

          class="history-item"
          v-for="(historydata, index) in history"
          :key="index"
          @click="historyFn(historydata)"
          >{{ historydata }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { suggestDataApi } from '@/api/index'
import { getStorage, setStorage } from '@/utils/storage'
// 1 输入搜索内容，确定时----》搜索结果页
// 2 点击搜索历史记录时-----》确定结果页
// 3 点击联想内容时------》转到搜索页面
export default {
  name: 'searchPage',
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null, // 设置定时器为空
      suggestListItem: [],
      history: JSON.parse(getStorage('his')) || []// 搜索历史
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
      return orgData.replace(reg, (match) => {
        return `<span style="color:red;">${match}</span>`
      })
    },
    // 输入搜索框并且确认时，跳转搜索页,并且传参
    searchFn () {
      if (this.kw.length !== 0) {
        this.history.push(this.kw) // 把输入文字保存到history数组里
        setTimeout(() => {
          this.$router.push({ path: `/search_result/${this.kw}` })
        }, 0)
      }
    },
    // 搜索建议，点击搜索建议---》跳转到结果页并且传参
    suggestFn (sugg) {
      if (this.kw.length !== 0) {
        this.history.push(sugg)// 把搜索建议保存到history数组里
        setTimeout(() => { // 这里和下面加定时器的原因:但是发现跳转后, 并未保存到本地(【watch是异步的】原因: 先跳转了, watch还未来的及执行==)给路由跳转加个定时器(最后执行
          this.$router.push({ path: `/search_result/${sugg}` })
        }, 0)
      }
    },
    // 点击搜索历史记录----》跳转到结果页并且传参
    historyFn (historydata) {
      this.$router.push({ path: `/search_result/${historydata}` })
    },
    // 点击删除按钮，清空历史记录
    clearFn () {
      this.history = []
    }
  },
  // 侦听器的使用 侦听上面保存history数组的变化，并保存
  watch: {
    history: {
      deep: true,
      handler () {
        // ES6新增了2种引用类型（以前Array，Object） 新增（Set Map）
        /*
        Set：无序的不允许重复的value集合体（无下角标）
        特点：你传入的数组类型，如果有重复元素，会自动清理掉重复的元素，返回无重复的Set对象
        注意：如果值是对象比较的是对象的内存地址
        */
        const theSet = new Set(this.history)
        //  Set类型对象-》转回 -》Array数组类型
        const arr = Array.from(theSet)
        setStorage('his', JSON.stringify(arr))
      }

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
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}
// 搜索历史
.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
