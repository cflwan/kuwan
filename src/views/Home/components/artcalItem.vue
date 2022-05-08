<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ tobj.title }}</span>
        <!-- 单图图片放置 -->
        <img
          class="thumb"
          v-if="tobj.cover.type === 1"
          :src="tobj.cover.images[0]"
        />
      </div>
      <!-- 三图  判断大于一比较严谨-->
      <div class="thumb-box" v-if="tobj.cover.type > 1">
        <img
          class="thumb"
          v-for="(imgUrl, index) in tobj.cover.images"
          :key="index"
          :src="imgUrl"
          alt="#"
        />
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ tobj.aut_id }}</span>
          <span>{{ tobj.comm_count }}评论</span>
          <span>{{ formatTime(tobj.pubdate) }}</span>
        </div>
        <!-- 反馈按钮 -->
        <!-- @click="show = true 绑定点击事件，给show赋值true，然后反馈组件显示 -->
        <van-icon name="cross" @click="show = true" />
      </div>
      <!-- 下面是反馈组件   get-container="body" 把反馈组件遮罩挂载到body标签上，
      因为每个ceil里有 overflow：hidden反馈里有cancel-text="取消"-->
      <van-action-sheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        get-container="body"
        :cancel-text="cancelText"
        @cancel="onCancel"
      />
    </template>
  </van-cell>
</template>

<script>
import { timeAgo } from '@/utils/date.js'
import { actionsDateA, actionsDateB } from '@/utils/actionsDate'
//
export default {
  data () {
    return {
      show: false,
      // actions 定义面板选项列表 ，下面的数据可以封装在函数里，用的时候调用
      actions: actionsDateA(),
      cancelText: '取消'
    }
  },
  props: {
    tobj: Object
  },
  methods: {
    formatTime: timeAgo, // timeAgo是一个方法,插件封装在utils
    // 点击反馈面板上的文字，触发下面的方法
    onSelect (item, value) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // console.log(item)  反馈面板文字内容
      // console.log(value)   反馈面板索引
      if (item.name === '反馈垃圾内容') {
        // actions 定义面板选项列表 ，下面的数据可以封装在函数里，用的时候调用
        this.actions = actionsDateB()
        this.cancelText = '返回'
        //  this.cancelText = '返回'  选项面板出现返回
      } else if (item.name === '不感兴趣') {
        this.$emit('dislikeEv', this.tobj.aut_id)
        // 上面一行代码是子组件向父组件传递数据，第一个函数是自定义事件，后面是要传递的数据
        this.show = false
        // 不感兴趣之后，面板隐藏
      } else {
        this.$emit('reportApi', this.tobj.aut_id, item.value)
        this.show = false
      }
    },
    onCancel () {
      if (this.cancelText === '返回') {
        //  actionsDateA() 一级反馈面板，出现面板
        this.actions = actionsDateA()
        // this.show = true

        this.cancelText = '取消'
        this.show = true // 点返回不要让弹窗关闭, 点取消文字按钮, 弹窗默认关闭
      }
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
