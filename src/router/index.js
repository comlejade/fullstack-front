import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Reg',
    component: () => import(/* webpackChunkName: Reg */'../views/Reg.vue')
  },
  {
    path: '/',
    name: 'Forget',
    component: () => import(/* webpackChunkName: Reg */'../views/Forget.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
