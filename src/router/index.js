import { getToken } from '@/utils/token'
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login/indexPage'
// import Layout from '@/views/Layout/layoutPage'
// import Home from '@/views/Home/homePage'
// import User from '@/views/User/userPage'
// import Search from '@/views/Search/searchPage'
// import searchResult from '@/views/Search/searchResult'
// import articelDetail from '@/views/articelDetail/detailPage'
// import UserEdit from '@/views/User/userEdit'
// import Chat from '@/views/Chat/chatPage'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login/indexPage') // 懒加载
  },
  {
    path: '/Layout',
    component: () => import('@/views/Layout/layoutPage'),
    children: [
      {
        path: 'Home',
        component: () => import('@/views/Home/homePage'),
        meta: {
          scrollT: 0 // 保存首页离开时，滚动条的位置
        }
      },
      {
        path: 'User',
        component: () => import('@/views/User/userPage')
      }
    ]
  },
  // 文章搜索页
  {
    path: '/search',
    component: () => import('@/views/Search/searchPage')
  },
  // 文章搜索结果联想页
  {
    path: '/search_result/:key',
    component: () => import('@/views/Search/searchResult')
  },
  // 跳转文章详情也路由文章详情页
  {
    path: '/detail',
    component: () => import('@/views/articelDetail/detailPage')
  },
  // 个人中心里----》获取用户个人资料路由
  {
    path: '/useredit',
    component: () => import('@/views/User/userEdit')

  },
  // 小思同学
  {
    path: '/chat',
    component: () => import('@/views/Chat/chatPage')
  }

]

const router = new VueRouter({
  routes
})
// 全局导航守卫
// 业务需求：登录过网页之后，不允许再次跳转到登录页面
router.beforeEach((to, from, next) => {
  // 获取本地token,并判断长度大于0 ，并且如果跳转路由到登录页，阻止不进行跳转
  if (getToken()?.length > 0 && to.path === '/login') {
    next(false) // 阻止跳转
  } else {
    next()
  }
})

export default router
