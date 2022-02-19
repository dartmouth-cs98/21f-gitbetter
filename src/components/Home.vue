
<template>
<div class="main">
  <Navigation  @help="resetStep" v-bind:ind="step">
    <FirstTime 
      @endTutorial="onEndTutorial" 
      @updateStep="onUpdateStep" 
      v-bind:ind="step" 
      v-show="step >= 2"
    />
  </Navigation>
  <div class="columns">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <div id="sidebar" class="column is-fullheight is-one-fifth sidebar">
          <Sidebar />
      </div>
      <div id="open-side-bar">
      <font-awesome-icon v-on:click="openDirectories" class="faIcon" icon="folder" style="padding-left: 5px;"/>
      </div>
      <div class="top-wrapper column" id="top-wrapper">
          <div id="terminal-wrapper" class="terminal-wrapper">
            <div class="headline-component">
              <div style="margin-left:auto;">
                Terminal
              </div>
              <div class="visButtons">
                <button 
                  id="opening-icon" 
                  class="button"
                  @click="openVisualization"
                  title="Show visualization window"
                >
                  <font-awesome-icon icon="eye"/>
                </button>
              </div>
            </div>
            <div class="help-window">
                <FirstTime 
                  @updateStep="onUpdateStep" 
                  @endTutorial="onEndTutorial" 
                  v-bind:ind="step" 
                  v-show="step == 0"
                /> 
            </div>
              <Terminal />
          </div>
          <div id="visualizations" class="visualizations-wrapper">
            <div class="headline-component">
              <div style="margin-left:35%;">
                Visualizations 
              </div>
              <div class="visButtons">
                <button 
                    id="closing-icon" 
                    class="button"
                    @click="closeVisualization"
                    title="Hide visualization window"
                  >
                    <font-awesome-icon icon="eye-slash"/>
                  </button>
              </div>
            </div>
            <div class="help-window-two">
                <FirstTime 
                  @updateStep="onUpdateStep" 
                  @endTutorial="onEndTutorial" 
                  v-bind:ind="step" 
                  v-show="step == 1"
                /> 
            </div>
            <VizWindow />
          </div>
      </div>   
  </div>
</div>
</template>

<script>
import VizWindow from './Visualizations/VizWindow.vue'
import Terminal from './Terminal.vue'
import Sidebar from './Sidebar/Sidebar.vue'
import Navigation from '../router/Navigation.vue'
import FirstTime from './FirstTime.vue'

import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)

export default {
  name: 'Home',
  components: {
    VizWindow,
    Terminal,
    Sidebar,
    Navigation,
    FirstTime
  },
  data() {
    return {
      step: -1,
    }
  },
  created() {
    // this is where we'll get the result of git config user.name, 
    // if it doesn't exist in the DB will set step to 0 and start tutorial
    this.step = this.$store.getters.getNewUser ? 0 : -1;
  },
  methods: {
    openDirectories() {
      if (document.getElementById("sidebar") == null || document.getElementById("open-side-bar") == null){
        return
      }
      document.getElementById("sidebar").style.display = "block";
      document.getElementById("open-side-bar").style.display = "none";
    },
    closeVisualization() {
      document.getElementById("visualizations").style.display = "none";
      document.getElementById("opening-icon").style.display = "block";
      document.getElementById("terminal-wrapper").style.width = "100%";
    },
    openVisualization() {
      document.getElementById("visualizations").style.display = "block";
      document.getElementById("terminal-wrapper").style.width = "50%";
      document.getElementById("opening-icon").style.display = "none";
    },
    onUpdateStep(val) {
      if(val == -1 && this.step == 0) {
          this.step = 0;
      }
      else if(this.step == 5 && val == 1) {
          this.step = -1;
      }
      else {
          this.step = this.step + val;
      }
    },
    resetStep() {
      this.step = 0;
    },
     onEndTutorial() {
      this.step = -1;
      this.$store.commit('setNewUser');
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Material+Icons");
.columns {
  height: calc(100% - 5rem);
  margin: 0;
  /* margin-top: 0.03rem; */
}
.sidebar {
  padding-right: 0;
}
.column {
  width: 83%;
  padding: 0;
}
.general-wrapper {
  display:flex;
}
.top-wrapper {
  display:flex;
  padding-left: 0;
  max-width: 80%;
}
.headline-component {
  background-color: #53336B;
  border-color: green;
  color: white;
  border-width: 1px;
  border-style: solid;
  font-weight:bold;
  font-size: 20px;
  padding: 15px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 72px;
}
#terminal-wrapper {
  width: 50%;
  background-color: black;
  position: relative;
  border-color: green;
}
.visualizations-wrapper {
  width: 50%;
  position: relative;
}
.closing-icon {
  background-color: #ce93d8;
  border-radius: 15px;
  position: absolute;
  right: 0;
  top: 5px;
}
#opening-icon {
  display:none;
}
#open-side-bar{
  display:none;
  background-color: #272727;
  border-color: green;
  border-width: 1px;
  border-style: solid;
  padding: 1% 0%;
  width: 48px;
}
.faIcon {
  width: 3em;
  cursor: pointer;
  color:white;
}
.visButtons {
  margin-right: 12px;
  margin-left: auto;
}
.help-window { 
  position: absolute;
  right: 12px;
  top: 3.75rem;
  z-index: 6;
  max-width: 60%;
}

.help-window-two { 
  position: absolute;
  left: 12px;
  top: 3.25rem;
  z-index: 6;
  max-width: 50%;
}

@media only screen and (max-width: 770px) {
  .sidebar {
    display: none;
  }
  .top-wrapper {
    height: 100%;
  }
  #opening-icon, #closing-icon {
    width: 15%;
    margin: 0;
  }
  .top-wrapper {
    min-width: 100%;
  }
}
</style>