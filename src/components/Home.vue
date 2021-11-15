
<template>
<div class="main">
  <Navigation />
  <div class="columns">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <div class="column is-fullheight is-one-fifth sidebar">
          <Sidebar />
      </div>
      <div class="top-wrapper column">
          <div id="terminal-wrapper" class="terminal-wrapper">
            <div class="headline-component">
              <div style="margin-left:auto;">
                Terminal
              </div>
              <div style="margin-left:auto;">
                <button 
                  id="opening-icon" 
                  class="button"
                  @click="openVisualization()"
                  title="Show visualization window"
                >
                  <font-awesome-icon icon="eye"/>
                </button>
              </div>
            </div>
              <Terminal />
          </div>
          <div id="visualizations" class="visualizations-wrapper">
            <div class="headline-component">
              <div style="margin-left:35%;">
                Visualizations 
              </div>
              <div style="margin-right:12px;margin-left:auto;">
                <button 
                    id="closing-icon" 
                    class="button"
                    @click="closeVisualization()"
                    title="Hide visualization window"
                  >
                    <font-awesome-icon icon="eye-slash"/>
                  </button>
              </div>
            </div>
            <VizWindow /> 
          </div>
      </div>   
  </div>
  </div>
</template>

<script>
import VizWindow from './VizWindow.vue'
import Terminal from './Terminal.vue'
import Sidebar from './Sidebar.vue'
import Navigation from './Navigation.vue'

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
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Material+Icons");
.columns {
    height: 100vh;
}
.sidebar {
  padding-right: 0;
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
  min-height: 72px;
}
#terminal-wrapper {
  width: 50%;
  background-color: black;
  position: relative;
  border-color: green;
  /* max-height: 92%; */
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


@media only screen and (max-width: 770px) {
  .sidebar {
    display: none;
  }
  .terminal-wrapper {
    margin-left: 12px;
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