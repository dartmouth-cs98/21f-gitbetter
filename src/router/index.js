import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Help from '../components/Help.vue'
import Welcome from '../components/Welcome.vue'
import Tutorials from '../components/Tutorials.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Home
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/home2',
      name: 'Home',
      component: Welcome
    },
    {
      path: '/tutorials',
      name: 'Tutorials',
      component: Tutorials
    },
  
  ]
})