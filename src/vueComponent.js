import Vue from 'vue'
// 全局注册导航组件
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Notify, Popup, Col, Badge, Row, Search, divider, tag, cellGroup, Image as VanImage, Dialog, DatetimePicker, Loading, Lazyload } from 'vant'
Vue.use(Lazyload, {
  preLoad: 0.8, // 预加载图片范围 屏幕高度的范围百分0-1
  error: 'https://img1.baidu.com/it/u=2744205250,1425193194&fm=253&fmt=auto&app=120&f=JPEG?w=658&h=376'
})
Vue.use(Loading)
Vue.use(DatetimePicker)
Vue.use(Dialog)
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
