import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const Login = () => import(/* webpackChunkName: 'login' */'../views/Login.vue')

const Reg = () => import(/* webpackChunkName: 'reg' */'../views/Reg.vue')

const Forget = () => import(/* webpackChunkName: 'forget' */'../views/Forget.vue')

const Index = () => import(/* webpackChunkName: 'channels-index' */'../views/channels/Index.vue')

const Template1 = () => import(/* webpackChunkName: 'channels-template-1' */'../views/channels/Template1.vue')

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: '/index/:catelog',
        name: 'template1',
        component: Template1
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg,
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: Forget,
    beforeEnter: (to, from, next) => {
      if (from.name === 'login') {
        next()
      } else {
        next('/login')
      }
    }
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
