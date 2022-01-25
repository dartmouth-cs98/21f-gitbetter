<template>
  <div class="vis-box">
    <div :key="this.currCommand" class="subtitle">
      <!-- {{this.getCommand()}} -->
      <Viz :key="this.currCommand" :command="this.command"/> 
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
const ipc = require("electron").ipcRenderer
import Viz from './Visualization.vue'

export default {
  name: 'VizWindow',
  data() {
    return {
      command: '',
      currCommand: '',
    }  
  },
  components: {
    Viz,
  },
  // computed: {
  //   command() {
  //     return this.currCommand;
  //   }
  // },
  mounted() {
    const channel = 'terminal.toTerm';
    
    ipcRenderer.removeAllListeners("user_input")
    ipc.on("user_input", function(event, data) {
      if (data.match(/^\s+/) && data !== ' ') {
        if (this.currCommand.includes('git')) {
          this.command = this.currCommand;  
          console.log("set command", this.command);
        }    
        this.currCommand = '';
        return;
      }
      this.currCommand += data; 
    });

    ipcRenderer.send(channel, 'git branch\n');
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
