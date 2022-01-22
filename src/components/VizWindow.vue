<template>
  <div class="vis-box">
    <div class="subtitle">
      {{this.getCommand()}}
      <Viz :command="this.command"/> 
      ------------------------------
      <BranchViz />
    </div>
  </div>
</template>

<script>
import Viz from './Visualization.vue'
import BranchViz from '../components/BranchViz'

export default {
  name: 'VizWindow',
  data() {
    return {
      command: ''
    }  
  },
  components: {
    BranchViz,
    Viz,
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
  border-color: green;
}
.subtitle {
  background-color: #272323;
  color: white;
}
</style>
