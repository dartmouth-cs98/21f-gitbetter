<template>
  <div class="vis-box">
    <div :key="this.currCommand" class="subtitle">
      <Viz :key="this.currCommand" :command="this.command"/> 
    </div>
    <button @click="this.printStack"> PRINT STACK </button>
    <button @click="this.printInverseStack"> PRINT inverse STACK </button>
    <br>
    <button v-if="this.stackIndex > 0" @click="this.previousCommand"> PREVIOUS </button>
    <button v-if="this.stackIndex < this.commandStack.length - 1" @click="this.nextCommand"> NEXT </button>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
const ipc = require("electron").ipcRenderer
import { getStatus } from '../../utils/getStatus'
import Viz from './Visualization.vue'
import classification, { ACTIONS } from './GitCommandClassification'
import inverseCommand from './GitInverseCommands'

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
        filesModified: [],
        filesRemoved: [],
        filesUntracked: [],
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
        if (this.currCommand.trim().startsWith('git')) {
          this.command = this.currCommand;
          this.updateStack();
          this.updateStatus();
        }    
        this.currCommand = '';
        return;
      }
      this.currCommand += data;
    });
  },
  methods: {
    async updateStatus() {
      const [branchName,,,, files] = await getStatus(process.cwd());
      this.gitStatus.branch = branchName;
      this.gitStatus.filesAdded = files.filesAdded;
      this.gitStatus.filesModified = files.filesModified;
      this.gitStatus.filesRemoved = files.filesDeleted;
      this.gitStatus.filesUntracked = files.filesUntracked;
    },
    updateStack() {
      if (this.stackIndex === this.commandStack.length - 1) {
        const command = inverseCommand(this.command, this.gitStatus);
        this.commandStack.push({
          current: { command: this.command, ...classification(this.command, this.gitStatus) },
          previous: { command, ...classification(command, this.gitStatus) },
        });
        this.stackIndex++;
      } else {
        // Operation in the middle of the stack
        const { action } = classification(this.command, this.gitStatus);
        if ([ACTIONS.NOOP].includes(action)) console.log('run command ' + this.command);
        else console.log('not yet supported');
      }
    },
    printStack() {
      console.log(this.commandStack.map(
        ({ current }, pos) => (pos === this.stackIndex ? '>' : ' ') + current.command));
    },
    printInverseStack() {
      console.log(this.commandStack.map(
        ({ previous }, pos) => (pos === this.stackIndex ? '<' : ' ') + previous.command));
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
      console.log(`Prev: Currently at pos ${this.stackIndex} -- running ${operation.command}`);
      switch (operation.action) {
        case ACTIONS.DESTRUCTIVE: 
          console.error('Cannot revert destructive command');
          return;
        case ACTIONS.ADVISORY:
          // console.warn(operation.note);
          // return;
        // eslint-disable-next-line no-fallthrough
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
  background-color: hsl(0, 5%, 15%);
  color: white;
  height: 90%;
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
