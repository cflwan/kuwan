import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/indexPage'
import Layout from '@/views/Layout/layoutPage'
import Home from '@/views/Home/homePage'
import User from '@/views/User/userPage'
import Search from '@/views/Search/searchPage'
import searchResult from '@/views/Search/searchResult'
import articelDetail from '@/views/articelDetail/detailPage'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/Layout',
    component: Layout,
    children: [
      {
        path: 'Home',
        component: Home
      },
      {
        path: 'User',
        component: User
      }
    ]
  },
  // 文章搜索页
  {
    path: '/search',
    component: Search
  },
  // 文章搜索结果联想页
  {
    path: '/search_result/:key',
    component: searchResult
  },
  // 跳转文章详情也路由文章详情页
  {
    path: '/detail',
    component: articelDetail
  }

]

const router = new VueRouter({
  routes
})

export default router
