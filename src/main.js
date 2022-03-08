import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faChevronRight, faChevronLeft, faChevronDown, faEyeSlash, faEye, faSearch, faPlus, faCopy, faTimes, faLaptopCode, faDesktop, faCodeBranch, faArrowLeft, faArrowRight, faFolder, faQuestionCircle, faHome, faCheck} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronRight, faChevronLeft, faChevronDown, faEye, faEyeSlash, faSearch, faPlus, faCopy, faTimes, faLaptopCode, faDesktop, faCodeBranch, faArrowLeft, faArrowRight, faFolder, faQuestionCircle, faHome, faCheck);


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;
require('@/assets/main.scss');
Vue.use(Vuex);
Vue.use(VueMaterial);

const store = new Vuex.Store({
  state: {
    recentSearches: [],
    branchName: "",
    status: [],
    command: "git status",
    firstTime: true,
    isGit: true,
    workingDir: "",
  },
  mutations: {
    add (state, command) {
      // Adds the most recently searched command
      // to the user's recent searches
      state.recentSearches.push(command);
      console.log("State in add", state.recentSearches);
    },
    setCurrCommand(state, command) {
      state.command = command;
    },
    setBranchName (state, name) {
      state.branchName = name;
    },
    setStatus (state, status) {
      state.status = status;
    },
    setNewUser(state) {
      state.firstTime = false;
    },
    setGitRepo(state, status) {
      state.isGit = status;
    },
    setWorkingDir(state, pwd) {
      state.workingDir = pwd;
    },
  },
  getters: {
    getRecentSearches: state => {
      return state.recentSearches;
    },
    getStatus: state => {
      console.log("status getter", state.status);
      return state.status;
    },
    getBranchName: state => {
      return state.branchName;
    },
    getCurrCommand: state => {
      return state.command;
    },
    getFirstTime: state => {
      return state.firstTime;
    },
    gitRepo: state => {
      return state.isGit;
    },
    getPWD: state => {
      return state.workingDir;
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store: store,
}).$mount('#app')
