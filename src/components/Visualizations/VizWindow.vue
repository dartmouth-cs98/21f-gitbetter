<template>
  <div class="vis-box">
    <div :key="this.currCommand" class="subtitle">
      <Viz :key="this.currCommand" :command="this.command"/> 
    </div>
    <button @click="this.printStack"> PRINT STACK </button>
    <button v-if="this.stackIndex > 0"> PREVIOUS </button>
    <button v-if="this.stackIndex < this.commandStack.length"> SUBSEQUENT </button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
const ipc = require("electron").ipcRenderer
import Viz from './Visualization.vue'

const channel = 'terminal.toTerm';
const ACTIONS = {
  NOOP: 'NOOP', // git status, log
  NORMAL: 'NORMAL', // git add, commit, push, checkout, stash
  ADVISORY: 'ADVISORY', // git rm, (read from note)
  DESTRUCTIVE: 'DESTRUCTIVE', // git branch -D, 
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
    const userInputChannel = 'user_input';
    ipcRenderer.removeAllListeners(userInputChannel);
    ipc.on(userInputChannel, (_, data) => {
      if (data.match(/^\s+/) && data !== ' ') {
        if (this.currCommand.includes('git')) {
          this.command = this.currCommand;
          this.updateStack();
          this.updateStatus();
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
    updateStatus() {
      // update git status for next command
      ipcRenderer.send(channel, 'git status\n');
    },
    updateStack() {
      if (!this.commandStack.length || this.stackIndex === this.commandStack.length - 1) {
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
      } else {
        // Operation in the middle of stack
        console.log('not yet supported');
      }
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
          console.warn(operation.note);
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
          console.warn(operation.note);
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
