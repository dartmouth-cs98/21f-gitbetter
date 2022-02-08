<template>
  <div class="vis-box">
    <div :key="this.currCommand" class="subtitle">
      <Viz :key="this.currCommand" :command="this.command"/> 
    </div>
    <button @click="this.printStack"> PRINT STACK </button>
    <button v-if="this.stackIndex > 0" @click="this.previousCommand"> PREVIOUS </button>
    <button v-if="this.stackIndex < this.commandStack.length - 1" @click="this.nextCommand"> NEXT </button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
const ipc = require("electron").ipcRenderer
import Viz from './Visualization.vue'
import classification, { ACTIONS } from './GitCommandClassification.ts'
import inverseCommand from './GitInverseCommands.ts'

const channel = 'terminal.toTerm';

export default {
  name: 'VizWindow',
  data() {
    return {
      command: '',
      currCommand: '',

      stackIndex: 0,
      commandStack: [{
        current: {
          command: 'git status',
          action: ACTIONS.NOOP,
          note: '',
        },
        previous: {
          command: null,
          action: ACTIONS.NOOP,
          note: '',
        },
      }],
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
    updateStatus() {
      // update git status for next command
      ipcRenderer.send(channel, 'git status\n');
    },
    updateStack() {
      if (this.stackIndex === this.commandStack.length - 1) {
        this.stackIndex++;
        const command = inverseCommand(this.command, this.gitStatus);
        this.commandStack.push({
          current: { command: this.command, ...classification(this.command) },
          previous: { command, ...classification(command) },
        });
      } else {
        // Operation in the middle of the stack
        const { action } = classification(this.command);
        if ([ACTIONS.NOOP].includes(action)) console.log('run command');
        else console.log('not yet supported');
      }
    },
    printStack() {
      console.log(this.commandStack.map(
        ({ current }, pos) => (pos === this.stackIndex ? '>' : ' ') + current.command));
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
      const inverse = inverseCommand(this.command, this.gitStatus);
      console.log(`Prev: Currently at pos ${this.stackIndex} -- running ${operation.command}`);
      switch (operation.action) {
        case ACTIONS.DESTRUCTIVE: 
          console.error('Cannot revert destructive command');
          return;
        case ACTIONS.ADVISORY:
          console.warn(operation.note);
          return;
        case ACTIONS.NORMAL:
          ipcRenderer.send(channel, inverse + '\n');
          break;
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
  background-color: hsl(0, 5%, 15%);
  color: white;
}
.back-button {
  background-color: #4D3B63;
  position: absolute;
  z-index: 1;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
}
</style>
