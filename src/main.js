import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 设置根标签 字体大小
// 全局注册导航组件
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Notify, Popup, Col, Badge, Row, Search } from 'vant'
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

// 封装中间件函数产检
const directiveObj = {
  install (Vue) {
    Vue.directive('fofo', {
      inserted (el) {
        // 指令所在Van-search组件
        // 组件跟标签是div，input在内部
        // 以上都是原生标签对象
        const theInput = el.querySelector('input')
        theInput.focus()
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
