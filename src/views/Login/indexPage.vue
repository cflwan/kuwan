<template>
  <div>
  <van-nav-bar title="登录" />
 <van-form @submit="onSubmit">
   <!-- v-model 数据的双向绑定 -->
  <van-field
    v-model="user.mobile"
    required
    name="mobile"
    label="手机号"
    placeholder="请输入11位手机号"
    :rules="[{ required: true, message: '请填写正确手机号' ,pattern:/^1[3-9]\d{9}$/}]"
  />
  <van-field
    v-model="user.code"
    required
    type="password"
    name="code"
    label="密码"
    placeholder="请输入6位密码"
    :rules="[{ required: true, message: '请填写正确密码' , pattern:/^\d{6}$/}]"
  />
  <div style="margin: 16px;">
    <!-- round没写值因为默认是true ，省略形式的写法 ;
    type表示类型 不同的类型有不同的登录按钮的颜色，我们这个项目时蓝色的
    native-type代表原生button的type属性；代表van-button组件渲染的原生button标签
    type是submit提交整个表单功能的按钮
    -->
    <!--如果网速慢 或者用户频繁按登录按钮 就要给用户提示  -->
    <!-- 目标：点击登录后给用户展示（登录状态）2、防止用户频繁点击 -->
    <van-button round block type="info" native-type="submit"
        :disabled='isflag'
       :loading='isflag'
    >登录</van-button>
  </div>
 </van-form>
  </div>
</template>

<script>
import { loginApi } from '@/api/index'
import { setToken } from '@/utils/token.js'
import { Notify } from 'vant'
export default {
  data () {
    return {
      user: {
      //  这两个名字要到接口文档里去查看 code 验证码
        mobile: '13888888888',
        code: '246810'
      },
      isflag: false // 登录加载状态先屏蔽掉，登录的时候在显示
    }
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    // 这里的value 就是上面name 收集到用户填写的数据
    async onSubmit (values) {
      console.log('submit', values)
      this.isflag = true // 提交表单的时候，更改登录状态，告诉用户我正在登录
      // 另一种方式获取用户输入表单的值
      // console.log('submit', this.user)
      try { // 使用try catch 捕获异常， 比如密码输入错的时候
        const res = await loginApi(this.user) // values 也行
        console.log(res)
        Notify({ type: 'success', message: '登录成功' })
        // 登录成功要保存Token
        setToken(res.data.data.token)
        // 登录之后页面跳转路由界面
        // this.$router.push({ path: ' ' })  此语句跳转后有历史记录，可以回退，登录后回退不合理
        this.$router.replace({ path: '/Layout/Home' }) // 替换 （不会产生历史记录）
        // 因为我们路由/layout里面没有重定向，所以可以直接写全 {path:'/Layout/Home'}
        // 也可以跳到根路由，它有重定向
      } catch (err) {
        // console.log(err)
        Notify({ type: 'danger', message: '账号或密码错误' })
      }
      this.isflag = false // 登录完成后，登录状态也要响应的结束
    }
  }
}
</script>
<style scoped lang='less'>
// .van-nav-bar{
//   background-color: #007bff;
// }
// 此选择器名字是van-nav-bar组件内标签 scoped尝试把此选择器后属性选择器匹配当前页面标签
// 选不中组件内部的
// lang= 'less' 当前style 标签内是less 语法
// /deep/ 就不会被VScode标记红线
// /deep/会把属性选择器加到前面（用后代选择器的方式往里找匹配的类名）
// /deep/ .van-nav-bar__title {
//   color: #ffffff;
// }
</style>
