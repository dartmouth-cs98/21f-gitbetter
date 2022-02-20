import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Help from '../components/Help/Help.vue'
import Welcome from '../components/Welcome.vue'
import Tutorials from '../components/Tutorial/Tutorials.vue'
import DoItYourself from '../components/Practice/DoItYourself.vue'
import Beginner from '../components/Beginner.vue'

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
      path: '/doityourself',
      name: 'DoItYourself',
      component: DoItYourself
    },
    {
      path: '/beginner',
      name: 'Beginner',
      component: Beginner
    },
  ]
})
