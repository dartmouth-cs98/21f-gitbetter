import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Help from '../components/Help.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    }
  ]
})