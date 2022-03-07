import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Help from '../components/Help/Help.vue'
import Welcome from '../components/Welcome.vue'
import Tutorials from '../components/Tutorial/Tutorials.vue'
import Search from '../components/Practice/Search.vue'
import Beginner from '../components/Beginner.vue'
import Test from '../components/Practice/BegTest.vue'
import Quiz from '../components/Practice/Quiz.vue'
import Info from '../components/Practice/Info.vue'

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
      path: '/beginner',
      name: 'Beginner',
      component: Beginner
    },
    {
      path: '/test',
      name: "Test",
      component: Test
    },
    {
      path: '/startquiz',
      name: "Quiz",
      component: Quiz
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
  ]
})
