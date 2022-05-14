import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'amfe-flexible' // 设置根标签 字体大小
import './vueComponent' // vant 组件注册，单独的分离成一个js 文件，让main.js更清晰
Vue.config.productionTip = false

// 封装中间件函数插件
const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      // el代表指令所在标签
      // 指令所在标签，被插入到真实DOM时才触发，如果标签用display:none隐藏再出现，不会触发inserted
      inserted (el) {
        // 指令所在Van-search组件
        // 组件跟标签是div，input在内部
        // 以上都是原生标签对象
        // 搜索页面 el是div
        // 文章评论 el是textarea
        // 以后el还可能是input 呢？
        // 知识点：原生DOM.nodeName 拿到标签名字（注意：大写的字符串）
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el本身不是输入框，尝试往里获取一下
          const theInput = el.querySelector('input')
          const theTextArea = el.querySelector('textarea')
          // 判断：不一定能获取得到，需要加判断，有值了，在执行.focus()才不报错
          if (theInput) theInput.focus()
          if (theTextArea) theTextArea.focus()
        }
      },
      update (el) { // 指令所在标签，被更新时触发
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el本身不是输入框，尝试往里获取一下
          const theInput = el.querySelector('input')
          const theTextArea = el.querySelector('textarea')
          // 判断：不一定能获取得到，需要加判断，有值了，在执行.focus()才不报错
          if (theInput) theInput.focus()
          if (theTextArea) theTextArea.focus()
        }
      }
    })
  }
}

// webpack开发服务器--》做代理转发
/*
原因：前端->后端接口跨域问题，但是后端几部支持jsonp也不开启cors,前端无法直接请求
解决：跨域解决方案第三种，用代理服务
使用：还好webpack开发服务器，默认就支持代理转发的功能；但是需要你配置代理转发的地址
（1）：在vue.config.js中，设置devServer服务器配置项
（2）axios请求，要请求本地开发服务器相对地址开头
（3） 改完配置重启服务器

*/
// 例如直接请求，会报跨域错误
axios({
  url: '/api/nc/article/headline/T1348647853363/0-40.html'
}).then((res) => {
  console.log(res)
})

// 执行目标对象里install方法并传入Vue类
Vue.use(directiveObj)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
