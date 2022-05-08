import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/indexPage'
import Layout from '@/views/Layout/layoutPage'
import Home from '@/views/Home/homePage'
import User from '@/views/User/userPage'
import Search from '@/views/Search/searchPage'
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
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
