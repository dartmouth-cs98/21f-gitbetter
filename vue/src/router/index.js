import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home.vue'
import Help from '../components/Help.vue'
<<<<<<< HEAD:vue/src/router/index.js
=======
import Welcome from '../components/Welcome.vue'
>>>>>>> cf6b76a2bebbd03d3c0b7d9ceb42832cb07f65a7:src/router/index.js

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
<<<<<<< HEAD:vue/src/router/index.js
=======
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
>>>>>>> cf6b76a2bebbd03d3c0b7d9ceb42832cb07f65a7:src/router/index.js
    }
  ]
})