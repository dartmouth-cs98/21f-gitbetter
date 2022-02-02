<template>
  <div class="vis-box">
    <div :key="this.currCommand" class="subtitle">
      <Viz :key="this.currCommand" :command="this.command"/> 
    </div>
    <button v:on-click="this.printStack"> PRINT STACK </button>
    <button v-if="this.index > 0"> PREVIOUS </button>
    <button v-if="this.index < this.commandStack.length"> SUBSEQUENT </button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
const ipc = require("electron").ipcRenderer
import Viz from './Visualization.vue'

const channel = 'terminal.toTerm';
const ACTIONS = {
  NOOP: 'NOOP',
  NORMAL: 'NORMAL',
  ADVISORY: 'ADVISORY',
  DESTRUCTIVE: 'DESTRUCTIVE',
};

export default {
  name: 'VizWindow',
  data() {
    return {
      command: '',
      currCommand: '',

      stackIndex: 0,
      commandStack: [],
      gitStatus: {
        branch: 'main',
        filesAdded: [],
        filesRemoved: [],
      },
    }  
  },
  components: {
    Viz,
  },
  mounted() {
    ipcRenderer.removeAllListeners("user_input")
    ipc.on("user_input", function(_, data) {
      if (data.match(/^\s+/) && data !== ' ') {
        if (this.currCommand.includes('git')) {
          this.command = this.currCommand;
          this.updateStack();
        }    
        this.currCommand = '';
        return;
      }
      this.currCommand += data; 
    });

    ipcRenderer.send(channel, 'git branch\n');
  },
  methods: {
    inverseCommand() {
      return this.command;
    },
    updateStack() {
      this.stackIndex++;
      this.commandStack.push({
        current: {
          command: this.command,
          action: ACTIONS.NORMAL,
          note: '',
        },
        previous: {
          command: this.inverseCommand(),
          action: ACTIONS.NORMAL,
          note: '',
        },
      });
    },
    printStack() {
      window.irene = this.commandStack;
      console.log(this.commandStack);
    },

    nextCommand() {
      const operation = this.commandStack[this.stackIndex].current;
      switch (operation.action) {
        case ACTIONS.DESTRUCTIVE: 
          console.error('Cannot revert destructive command');
          return;
        case ACTIONS.ADVISORY:
          alert(operation.note)
          return;
        case ACTIONS.NORMAL:
        case ACTIONS.NOOP:
          this.stackIndex++;
          ipcRenderer.send(channel, operation.command + '\n');
          break;
        default:
          throw new Error('Unknown forward action in commandStack of viz window')
      } 
    },
    previousCommand() {
      const operation = this.commandStack[this.stackIndex].previous;
      switch (operation.action) {
        case ACTIONS.DESTRUCTIVE: 
          console.error('Cannot revert destructive command');
          return;
        case ACTIONS.ADVISORY:
          alert(operation.note)
          return;
        case ACTIONS.NORMAL:
        case ACTIONS.NOOP:
          this.stackIndex--;
          ipcRenderer.send(channel, operation.command + '\n');
          break;
        default:
          throw new Error('Unknown prior action in commandStack of viz window')
      } 
    },
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
  overflow-y: auto;
}
.vis-box::-webkit-scrollbar {
  display: none;
} 
.subtitle {
  background-color: #272323;
  color: white;
}
</style>
