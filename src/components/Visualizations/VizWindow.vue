<template>
  <div class="vis-box">
    <div :key="this.currCommand" class="subtitle">
      <Viz :key="this.currCommand" :command="this.command"/> 
    </div>
    <button @click="this.printStack"> PRINT STACK </button>
    <button v-if="this.stackIndex >= 0" @click="this.previousCommand"> PREVIOUS </button>
    <button v-if="this.stackIndex < this.commandStack.length - 1" @click="this.nextCommand"> NEXT </button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
const ipc = require("electron").ipcRenderer
import Viz from './Visualization.vue'

const channel = 'terminal.toTerm';
const ACTIONS = {
  NOOP: 'NOOP', // git status, log, branch
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

      stackIndex: -1,
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

    // Following three lines were incoming change when resolving merge conflicts (zoe 2/7), it was giving errors when I ran it
    // so I kept it as it was on my computer but left it commented out in case someone still working on it

    //const channel = 'terminal.toTerm';
    
    // ipcRenderer.removeAllListeners("user_input")
    // ipc.on("user_input", function(event, data) {

      if (data.match(/^\s+/) && data !== ' ') {
        if (this.currCommand.trim().startsWith('git')) {
          this.command = this.currCommand;
          this.updateStack();
        }    
        this.currCommand = '';
        return;
      }
      this.currCommand += data;
    });

    //ipcRenderer.send(channel, 'git branch\n');
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
      console.log(this.commandStack.map(
        ({ current }, pos) => (pos === this.stackIndex ? '>' : ' ') + current.command));
    },

    nextCommand() {
      const operation = this.commandStack[this.stackIndex].current;
      // TODO: Bug when this.stackIndex === -1 (after the pointer moves to the front of the stack)
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
          var { command } = this.commandStack[this.stackIndex].current;
          console.log(`Next: Currently at pos ${this.stackIndex} -- running ${command}`);
          ipcRenderer.send(channel, command + '\n');
          break;
        default:
          throw new Error('Unknown forward action in commandStack of viz window')
      } 
    },
    previousCommand() {
      const operation = this.commandStack[this.stackIndex].previous;
      console.log(`Prev: Currently at pos ${this.stackIndex} -- running ${operation.command}`);
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
  height: 90%;
}
</style>
