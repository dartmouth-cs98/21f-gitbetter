import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faChevronRight, faChevronLeft, faChevronDown, faEyeSlash, faEye, faSearch, faPlus, faCopy, faTimes, faLaptopCode, faDesktop, faCodeBranch, faArrowRight, faFolder, faQuestionCircle, faHome} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronRight, faChevronLeft, faChevronDown, faEye, faEyeSlash, faSearch, faPlus, faCopy, faTimes, faLaptopCode, faDesktop, faCodeBranch, faArrowRight, faFolder, faQuestionCircle, faHome);


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;
require('@/assets/main.scss');
Vue.use(Vuex);
Vue.use(VueMaterial);

const store = new Vuex.Store({
  state: {
    recentSearches: [],
    branchName: "",
    status: {
      tracked: [], 
      untracked: [],
      toPush: 0,
    },
    command: "git status",
    firstTime: true,
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
    setStatus (state, output) {
      let toAdd = [];
      let toCommit = []; 

      console.log("Status in store", output.status)
      if(output.status[0] === "Changes to be committed:") {
        console.log("Tracked files")
        let i = 2;
        while(i < output.status.length && (!output.status[i].includes("Changes not staged for commit:")) && !output.status[i].includes("Untracked files:")) {
          console.log("Adding to toAdd", output.status[i])
          if(output.status[i].includes("[32")) {
            toAdd.push(output.status[i])
          }
          i++;
        }
        while(i < output.status.length) {
          console.log("Adding to toCommit", output.status[i])
          if(output.status[i].includes("[31")) {
            toCommit.push(output.status[i])
          }
          i++;
        }
        state.status = {tracked: toAdd, untracked: toCommit};
      }
      else if(output.status[0].includes("working tree clean")) {
        // let push = state.status.toPush + 1
        state.status = {tracked: [], untracked: [], toPush: 1};
      }
    
    },
    setNewUser(state) {
      state.firstTime = false;
    },
  },
  getters: {
    getRecentSearches: state => {
      return state.recentSearches;
    },
    getStatusFiles: state => {
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
    }
  }
})

new Vue({
  render: h => h(App),
  router,
  store: store,
}).$mount('#app')
