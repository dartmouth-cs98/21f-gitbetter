
<template>
<div class="main">
  <BeginnerNav />
  <div class="columns">
    <div class="terminal-wrapper column is-half">
        <div class="headline-component">
            Tutorial Home
        </div>
        <div class="help-window">
        </div>
            <TutorialHome @updateSrc="sendSrc"/>
        </div>
        <div class="visualizations-wrapper column is-half">
            <div class="headline-component">
                Visualizations 
            </div>
            <BeginnerViz :command="command"/>
        </div>
    </div>   
</div>
</template>

<script>
import BeginnerViz from './Visualizations/BeginnerViz.vue'
import TutorialHome from './Practice/TutorialHome.vue'
import BeginnerNav from '../router/BeginnerNav.vue'

import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(VueMaterial)

export default {
  name: 'Beginner',
  components: {
    BeginnerViz,
    TutorialHome,
    BeginnerNav,
  },
  data() {
    return {
      step: -1,
      command: "",
    }
  },
  created() {
    // this is where we'll get the result of git config user.name, 
    // if it doesn't exist in the DB will set step to 0 and start tutorial
    this.step = 0;
  },
  methods: {
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
    sendSrc(source) {
      this.command = source;
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

      console.log(this.step)
    },
    resetStep() {
      this.step = 0;
    },
     onEndTutorial() {
      this.step = -1;
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Material+Icons");
.columns {
    height: 100vh;
}
.column {
  width: 83%;
}
.general-wrapper {
  display:flex;
}
.top-wrapper {
  display:flex;
  padding-left: 0;
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
.terminal-wrapper {
  background-color: black;
  border-color: green;
  padding-right: 0;
  padding-top: 0;
  margin-top: 12px;
}
.visualizations-wrapper {
  padding-left: 0;
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
    /* max-width: 60%; */
  }
</style>