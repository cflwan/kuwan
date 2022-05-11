import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 设置根标签 字体大小
// 全局注册导航组件
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Notify, Popup, Col, Badge, Row, Search, divider, tag, cellGroup, Image as VanImage } from 'vant'
Vue.use(VanImage)
Vue.use(tag)
Vue.use(cellGroup)
Vue.use(divider)
Vue.use(Search)
Vue.use(Col)
Vue.use(Row)
Vue.use(Badge)
Vue.use(Popup)
Vue.use(Notify)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Tabbar)
Vue.use(TabbarItem)

Vue.config.productionTip = false

// 封装中间件函数插件
const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      // el代表指令所在标签
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
      }
    })
  }
}
// 执行目标对象里install方法并传入Vue类
Vue.use(directiveObj)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
