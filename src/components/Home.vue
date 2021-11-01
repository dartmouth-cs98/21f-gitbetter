<template>
  <!-- <div class="main"> -->
    <div class="columns">
        <div class="column is-fullheight is-one-fifth sidebar">
            <Sidebar />
        </div>
        <div class="top-wrapper column">
            <div class="terminal-wrapper">  
              <div class="headline-component">Terminal</div>
                <TerminalWrapper />
            </div>
            <div class="visualizations-wrapper">
              <div class="headline-component">Visualizations</div>
                <GitStarted /> 
                <div>
                  <StartOver />
                </div>
              <VizWindow /> 
            </div>
        </div>   
    </div>
  <!-- </div> -->
</template>

<script>
import VizWindow from './VizWindow.vue'
import TerminalWrapper from './TerminalWrapper.vue'
import Sidebar from './Sidebar.vue'
import GitStarted from './GitStarted.vue'
import StartOver from './StartOver.vue'

export default {
  name: 'Home',
  components: {
    VizWindow,
    TerminalWrapper,
    Sidebar,
    GitStarted,
    StartOver,
  }

//   props: {
//     msg: String
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}
.headline-component {
  background-color: #d7a3df;
  border-color: black;
  border-width: 1px;
  border-style: solid;
}
.terminal-wrapper {
  height: 100%;
  width: 200%;
}
.visualizations-wrapper {
  height: 100%;
  width: 200%;
  
}
</style>
