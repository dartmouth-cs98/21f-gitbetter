<template>
  <div class="vis-box">
    <div class="quickstart">
      <GitStarted/>
      <StartOver />
    </div>
    <div class="subtitle"> 
      {{this.getCommand()}}
      <DemoViz :command="this.command"/>
    </div> <!-- Window for the git visualizations! -->
  </div>
</template>

<script>
import GitStarted from './GitStarted.vue'
import StartOver from './StartOver.vue'
import DemoViz from './DemoViz.vue'

export default {
  name: 'VizWindow',
  data() {
    return {
      command: ''
    }  
  },
  components: {
    GitStarted,
    StartOver,
    DemoViz
  },
  methods: {
    getCommand() {
      this.$root.$on('eventing', data => {
          this.command = data;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vis-box {
  display: flex;
  align-content: space-between;
  flex-direction: column;
  height: 90%;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  background-color: #272323;
}
.quickstart {
  background-color: #272323;
  padding: 5%;
  display: flex;
  align-content: space-around;
  flex-direction: row;
  justify-content: center;
}
.subtitle {
  background-color: #272323;
  color: white;
}
</style>
