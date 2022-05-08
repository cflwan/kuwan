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
        <van-tabs
          v-model="channelId"
          @change="changeChannelstab"
          animated
          sticky
          offset-top="1.226677rem"
        >
          <van-tab
            v-for="item in userChannelsData"
            :key="item.id"
            :title="item.name"
          >
            <!-- {{item.name}}  这里面的内容太多了，我们可以自己封装组件引入到这里-->
            <artcalList :channelId="channelId"></artcalList>
          </van-tab>
        </van-tabs>
        <!-- 标签栏后面的加号 -->
        <van-icon
          name="plus"
          size="0.37333334rem"
          class="moreChannels"
          @click="showPopup"
        />
        <van-popup v-model="show" class="chgpopup">
          <channel-edit
            @close="closePopup"
            get-container="body"
            :userTab="userChannelsData"
            :uncheckData="unCheckChannelList"
            @addChannelEv="addChannelfn"
            @removeChannnelEv="removeChannnelData"
            v-model="channelId"
          >
          </channel-edit>
        </van-popup>
      </div>
    </div>
  </div>
</template>
<script>
// 导入userChannelsApi函数： 和所用频道标签allItem ：重置频道，从多余的频道添加到用户的频道
import { userChannelsApi, allItem, putUserChannelApi, removeChannelApi } from '@/api/index.js'
// 导入文章整个列表artcalList
import artcalList from './components/artcalList.vue'
// 导入channelEdit组件
import channelEdit from './channelEdit'

// 导入获取所有频道的API

export default {
  components: {
    artcalList,
    channelEdit
  },
  data () {
    return {
      channelId: 0, // tab导航-激活频道id(默认频道id为0) ，页面刚打开是推荐频道高亮-对应文章数据 active
      userChannelsData: [], // 部分用户选择标签，都是数组
      // getartcal: []
      show: false,
      allItem: [] // 获取所有用户频道的标签，都是数组
    }
  },
  async created () {
    const res = await userChannelsApi()
    console.log(res)
    this.userChannelsData = res.data.data.channels
    const res2 = await allItem()
    this.allItem = res2.data.data.channels
    console.log(res2)
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
    },
    showPopup () {
      this.show = true
    },
    closePopup () {
      this.show = false
    },
    // 添加频道
    async  addChannelfn (item2) {
      this.userChannelsData.push(item2)
      // 还好把最新的数组发送给后台
      // 数组里对象字段-》转换
      // 推荐频道不能传递-筛选出不是推荐剩下的频道对象
      //   const newArr = this.userChannelsData.filter((item2) => item2.id !== 0)
      //   newArr.forEach((item2, index) => {
      //     // delete 对象.属性 可以删除键值对
      //     delete item2.name
      //     item2.seq = index
      //   })
      //   const res = await putUserChannelApi({
      //     channels: this.userChannelsData
      //   })
      //   console.log(res)
      // }
      // 上面的代码出问题，新增时，名字被删除了
      // 原因：所有数组里的对象，都是同一个内存地址，影响到ChannelEdit.vue中对象
      const newArr = this.userChannelsData.filter((item2) => item2.id !== 0)
      const theNewArr = newArr.map((item2, index) => {
        // delete 对象.属性 可以删除键值对
        const newObj = { ...item2 } // 拷贝（浅拷贝）
        delete newObj.name
        newObj.seq = index
        return newObj // 让map方法把新对象收集起来形成一个新数组
      })

      const res3 = await putUserChannelApi({
        channels: theNewArr
      })
      console.log(res3)
    },
    // 删除指定频道
    async removeChannnelData (item) {
      const index = this.userChannelsData.findIndex(obj => {
        return obj.id === item.id
      })
      this.userChannelsData.splice(index, 1)
      // 第一种方式，把现在用户数组的数据，在覆盖式的发给后台
      // 需要把上面的更新数组过程，封装一个函数，add和remove里调用（笔记里）
      // 第二种方式 ：只调用删除的接口
      const res4 = await removeChannelApi({
        channelId: item.id
      })
      console.log(res4)
    }
  },
  computed: {
    unCheckChannelList () {
      const newArr = this.allItem.filter((bigObj) => {
        const index = this.userChannelsData.findIndex((smallObj) => {
          return smallObj.id === bigObj.id
        })
        // 如果找到了
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr
    } // 上面这一块代码很重要 视频P66复习能看
  }
}
</script>
<style scoped lang="less">
.main {
  padding-top: 44px;
  /* 底部在Layout界面设置好了 */
}
/* // 设置小图标的样式 */
/* // 设置 tabs 容器的样式 */
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}
// 改变弹出层的大小，重新设置类名因为有的弹出层类名是一样的，不能都设置成那样。
.chgpopup {
  width: 100vw;
  height: 100vh;
  // 如果要给百分百也可以不过也要给父标签设置百分百
  // vw vh 是CSS3 新出的 参考浏览器新出的百分比
}
</style>
