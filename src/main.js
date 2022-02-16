import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faChevronRight, faChevronLeft, faChevronDown, faEyeSlash, faEye, faSearch, faPlus, faCopy, faTimes, faLaptopCode, faDesktop, faCodeBranch, faArrowLeft, faArrowRight, faFolder, faQuestionCircle, faHome} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronRight, faChevronLeft, faChevronDown, faEye, faEyeSlash, faSearch, faPlus, faCopy, faTimes, faLaptopCode, faDesktop, faCodeBranch, faArrowLeft, faArrowRight, faFolder, faQuestionCircle, faHome);


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;
require('@/assets/main.scss');
Vue.use(Vuex);
Vue.use(VueMaterial);

const store = new Vuex.Store({
  state: {
    recentSearches: []
  },
  mutations: {
    add (state, command) {
      // Adds the most recently searched command
      // to the user's recent searches
      state.recentSearches.push(command);
      console.log("State in add", state.recentSearches);
    }
  },
  getters: {
    getRecentSearches: state => {
      return state.recentSearches;
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store: store,
}).$mount('#app')
