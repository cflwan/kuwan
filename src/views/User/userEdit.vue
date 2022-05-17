<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
           :src="userprofileList.photo"

            @click="getImgClick"
          />
          <!-- : -->
          <!-- 下面是上传文件输入框 -->
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        is-link
        :value="userprofileList.name"
        @click="editname"
      />
      <van-cell title="生日" is-link :value="userprofileList.birthday"   @click="dtpinkerFn"/>
    </van-cell-group>
    <!-- 点击名称按钮，出现提示，并且可修改名称，这样可以在vant中用自定义组件的方式 -->
    <van-dialog
      v-model="show"
      title="您确定要更改名称吗？"
      show-cancel-button
      :beforeClose="cfmFn"
    >
      <input type="text" v-fofo v-model="changename" />
    </van-dialog>
    <!--</van-dialog> 里面就是自定义的内容  -->

    <!-- 在Popup 弹出层面板上包裹时间选择面板，可以在点击生日单元格时出现在屏幕底部 -->
    <!-- DatetimePicker 时间选择面板 -->
    <van-popup
      v-model="datatimePinkerShow"
      position="bottom"
      :style="{ height: '50%' }"

    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancelFn"
        @confirm="confirmFn"
      />
    </van-popup>
  </div>
</template>

<script>
// 导入用户个人资料的API
import {
  getProfileMsgApi,
  updataUserPhotoApi,
  updataUserProfileApi
} from '@/api/index'
import Notify from '@/ui/Notify'
import { formatDate } from '@/utils/date'
export default {
  name: 'UserEdit',
  data () {
    return {
      userprofileList: {}, // 用户个人资料
      show: false,
      changename: '', // 用户再输入框输入的名称
      minDate: new Date(1920, 1, 1),
      maxDate: new Date(), // 最大时间就是当前时间，这个面板是选择出生日期的。
      currentDate: new Date(), // 默认时间
      datatimePinkerShow: false // 设置弹出面板是否显示
    }
  },
  //   个人资料铺设
  async created () {
    const res = await getProfileMsgApi()
    this.userprofileList = res.data.data
    this.$store.commit('SET_USERPHOTO', this.userprofileList.photo)
  },
  methods: {
    //   给change事件【该事件在输入框的值发生变动时触发】绑定方法
    async onFileChange (e) {
      console.log(e.target.files[0])
      if (e.target.files.length === 0) {
        return
      }
      const thefd = new FormData()
      thefd.append('photo', e.target.files[0])
      const res2 = await updataUserPhotoApi(thefd)
      //   this.userprofileList.photo =res.
      console.log(res2)
      this.userprofileList.photo = res2.data.data.photo // 传入到后台的图片再呈现在页面上
    },
    getImgClick () {
      this.$refs.iptFile.click()
    },
    // 编辑名称方法
    editname () {
      this.show = true
      this.changename = this.userprofileList.name
    },
    // 个人中心--姓名修改-验证
    async cfmFn (action, done) {
      if (action === 'confirm') {
        // 点确认后要给输入的文字进行校验，校验的规则是：1-7位中英文数字组合
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.changename)) {
          await updataUserProfileApi({
            name: this.changename
          })
          this.userprofileList.name = this.changename
          done()
        } else {
          done(false)
          Notify({
            type: 'warning',
            message: '用户名只能是1-7位中英文数字组合'
          })
        }
      } else {
        done()
      }
    },
    // 点击面板就会显示
    dtpinkerFn () {
      this.datatimePinkerShow = true
      // 设置默认时间 , this.currentDate需要一个时间对象，因此，new Date(参数)可以改变时间参数
      this.currentDate = new Date(this.userprofileList.birthday)
    },
    // 时间面板取消按钮事件
    cancelFn () {
      this.datatimePinkerShow = false
    },
    // 点击面板上的确定时,把时间数据【要求是对象】 传送到服务器 ，因为服务器传送类型是 PATCH 的，所以传动之后在此铺设数据到页面
    async confirmFn () {
      await updataUserProfileApi({
        birthday: formatDate(this.currentDate)
      })

      this.userprofileList.birthday = formatDate(this.currentDate) // 时间格式化
      this.datatimePinkerShow = false
    }
    // birthday:formatDate(this.currentDate) 把该对象格式化字符串的样式，因为服务器需要字符串形式的
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
/deep/ .van-dialog__content {
  text-align: center;
  input {
    border: none;
    outline: none;
    text-align: center;
    padding: 0;
  }
}
</style>
