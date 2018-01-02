/* eslint-disable */

import Vue from 'vue'
import Router from 'vue-router'

// components
const Home = () => import('@/components/Home.vue')
const Test = () => import('@/components/Test.vue')
const UserDashBoard = () => import('@/components/UserDashBoard.vue')



// middle wares
import Vuelidate from 'vuelidate'

Vue.use(Router)
Vue.use(Vuelidate)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test/:testType',
      name: 'test-page',
      component: Test
    },
    {
      path: '/u/:name',
      name: 'user-dash-board',
      component: UserDashBoard
    }
  ]
})
