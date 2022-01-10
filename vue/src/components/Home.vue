<template>
  <div class="columns">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <div class="column is-fullheight is-one-fifth sidebar">
          <Sidebar />
      </div>
      <div class="top-wrapper column">
          <div class="terminal-wrapper">
            <div class="headline-component">
              Terminal
              <md-button 
                id="opening-icon" 
                class="md-icon-button md-raised closing-icon"
                @click.native="openVisualization()"
              >
                <md-icon class="fa fa-plus"></md-icon>
              </md-button>
            </div>
              <Terminal />
          </div>
          <div id="visualizations" class="visualizations-wrapper">
            <div class="headline-component">
              <div>Visualizations</div>
              <md-button 
                id="closing-icon" 
                class="md-icon-button md-raised closing-icon"
                @click.native="closeVisualization()"
              >
                <md-icon>close</md-icon>
              </md-button>
            </div>
            <VizWindow /> 
          </div>
      </div>   
  </div>
</template>

<script>
import VizWindow from './VizWindow.vue'
import Terminal from './Terminal.vue'
import Sidebar from './Sidebar.vue'

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
  },
  methods: {
    closeVisualization() {
      document.getElementById("visualizations").style.display = "none";
      document.getElementById("opening-icon").style.display = "block";
    },
    openVisualization() {
      document.getElementById("visualizations").style.display = "block";
      document.getElementById("opening-icon").style.display = "none";
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Material+Icons");
.columns {
    height: 100%;
}
.sidebar {
  padding-right: 0;
}
.general-wrapper {
  display:flex;
}
.top-wrapper {
  display:flex;
  padding-left: 0;
  height: 100%;
}
.headline-component {
  background-color: #F5CAC2;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  text-align: center;
  font-weight:bold;
  font-size: 20px;
  padding: 15px 0px;
}
.terminal-wrapper {
  height: 100%;
  width: 200%;
  background-color: black;
  position: relative;
}
.visualizations-wrapper {
  height: 100%;
  width: 200%;
  position: relative;
}
.closing-icon {
  background-color: #F5CAC2;
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
}
</style>
