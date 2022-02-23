<template>
  <div class="vis-box">
    <Visualization /> 
    <!-- <Viz :key="this.currCommand" :command="this.command"/>  -->
    <!-- <div class="print-container">
      <button @click="this.printStack" class="print-stack"> PRINT STACK </button>
      <button @click="this.printInverseStack" class="print-stack"> PRINT inverse STACK </button>
    </div> -->
    <div v-if="this.advisoryModalOpened" class="advisory-modal">
      <div class="advisory-modal-note">{{this.advisoryModalMessage}}</div>
      <div class="advisory-modal-button-container">
        <button @click="this.actionCallback" class="advisory-modal-button advisory-modal-button-yes">Continue</button>
        <button @click="this.closeModal" class="advisory-modal-button advisory-modal-button-no">Cancel</button>
      </div>
    </div>
    <div v-if="!this.advisoryModalOpened" class="back-forth-container">
      <button v-if="this.stackIndex <= 0" class="back-button back-button-previous-grayed"> <font-awesome-icon icon="arrow-left"/> </button>
      <button v-if="this.stackIndex > 0" @click="this.previousCommand" class="back-button back-button-previous"> <font-awesome-icon icon="arrow-left"/> </button>
      <button v-if="this.stackIndex >= this.commandStack.length - 1" class="back-button back-button-next-grayed"> <font-awesome-icon icon="arrow-right"/> </button>
      <button v-if="this.stackIndex < this.commandStack.length - 1" @click="this.nextCommand" class="back-button back-button-next"> <font-awesome-icon icon="arrow-right"/> </button>
    </div>

  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
const ipc = require("electron").ipcRenderer
import { getStatus } from '../../utils/getStatus'
import Visualization from './Visualization.vue'
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
      advisoryModalOpened: false,
      advisoryModalMessage: '',
      advisoryModalForward: true,
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
        output: '',
        workingDirectory: process.cwd(),
      },
    }  
  },
  components: {
    Visualization,
  },
  mounted() {
    const userInputChannel = 'user_input';
    ipcRenderer.removeAllListeners(userInputChannel);
    ipc.on(userInputChannel, (_, data) => {
      if (data.match(/^\s+/) && data !== ' ') {
        if (this.currCommand.trim().startsWith('git')) {
          this.gitStatus.output = '';
          this.command = this.currCommand;
          this.updateStack();          
        }
        this.updateStatus();
        this.currCommand = '';
        return;
      }
      if (data.includes('[K')) this.currCommand = this.currCommand.slice(0, -1);
      else this.currCommand += data;
    });

    ipc.on("terminal.incData", (_, data) => {  
      if (data.length !== 1 && !data.trim().startsWith('bash')) this.gitStatus.output = data;
    });

    ipc.on('giveFilePath', (_, pwd) => (this.gitStatus.workingDirectory = pwd));
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
    async updateStack() {
      if (this.stackIndex === this.commandStack.length - 1) {
        // Operations that depend on output
        if (['tag'].includes(this.command.split(' ', 3)[1])) await new Promise(r => setTimeout(r, 500));

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
        else console.log('no support for interstack git operations');
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

    actionCallback() {
      let command;
      if (this.advisoryModalForward) {
        this.stackIndex++;
        command = this.commandStack[this.stackIndex].current;
        console.log(`Next: Currently at pos ${this.stackIndex} -- running ${command}`);
      } else {
        command = this.commandStack[this.stackIndex].previous;
        this.stackIndex--;
      }
      ipcRenderer.send(channel, command.command + '\n');
      this.closeModal();
    },

    closeModal() {
      this.advisoryModalOpened = false;
      this.advisoryModalMessage = '';
    },

    nextCommand() {
      this.advisoryModalForward = true;
      const operation = this.commandStack[this.stackIndex].current;
      switch (operation.action) {
        case ACTIONS.DESTRUCTIVE: 
          console.error('Cannot revert destructive command');
          return;
        case ACTIONS.ADVISORY:
          this.advisoryModalOpened = true;
          this.advisoryModalMessage = operation.note;
          console.warn("ADVISORY" + operation);
          break;
        case ACTIONS.NORMAL:
        case ACTIONS.NOOP:
          this.actionCallback();
          break;
        default:
          throw new Error('Unknown forward action in commandStack of viz window')
      } 
    },
    previousCommand() {
      this.advisoryModalForward = false;
      const operation = this.commandStack[this.stackIndex].previous;
      console.log(`Prev: Currently at pos ${this.stackIndex} -- running ${operation.command}`);
      switch (operation.action) {
        case ACTIONS.DESTRUCTIVE: 
          console.error('Cannot revert destructive command');
          return;
        case ACTIONS.ADVISORY:
          console.warn("ADVISORY" + operation);
          this.advisoryModalOpened = true;
          this.advisoryModalMessage = operation.note;
          break;
        case ACTIONS.NORMAL:
        case ACTIONS.NOOP:
          this.actionCallback();
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
  height: calc(100% - 72px);
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
  margin-bottom: 0 !important;
}
.print-container {
  display: inline-grid;
  justify-content: center;
  width: 100%;
  position: absolute;
}
.print-stack {
  height: 20px;
  margin-top: 20px;
}
.back-forth-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.back-button {
  background-color: #b7aac7;
  border-radius: 50%;
  height: 5vw;
  width: 5vw;
  cursor: pointer;
  margin: 5px 10px;
}
.back-button-previous-grayed, .back-button-next-grayed {
  background-color: #4D3B63;
  cursor: not-allowed;
}
.advisory-modal {
  padding: 5px;
}
.advisory-modal-note {
  color: red;
  font-weight: 600;
  font-size: 18px;
}
.advisory-modal-button-container {
  display: flex;
  justify-content: flex-end;
}
.advisory-modal-button {
  border: none;
  border-radius: 20px;
  padding: 5px 20px;
  font-size: 15px;
  margin: 3px 10px;
}

button.advisory-modal-button-yes {
  background-color: #d1e6c8;
}
button.advisory-modal-button-yes:hover {
  background-color: #81de7c;
  border-color: #5dcf57;
  border-width: 2px;
  border-style: solid;
}
button.advisory-modal-button-no {
  background-color: #827e7e;
}
button.advisory-modal-button-no:hover {
  color: #ffffff;
  background-color: #3d3b3b;
  border-color: #101210;
  border-width: 2px;
  border-style: solid;
}
</style>
