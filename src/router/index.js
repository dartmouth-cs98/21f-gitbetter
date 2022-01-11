import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Help from '../components/Help.vue'
import Welcome from '../components/Welcome.vue'
import Tutorials from '../components/Tutorials.vue'
import Finder from '../components/Finder.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
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
      path: '/tutorials',
      name: 'Tutorials',
      component: Tutorials
    },
    {
      path: '/finder',
      name: 'Finder',
      component: Finder
    }
  ]
})