<template>
  <div class="vis-box">
    <Visualization :mergeConflict="this.mergeConflictExists" :mergeConflictData="this.mergeConflictData" /> 
    <!-- <Viz :key="this.currCommand" :command="this.command"/>  -->
    <!-- <div class="print-container">
      <button @click="this.printStack" class="print-stack"> PRINT STACK </button>
      <button @click="this.printInverseStack" class="print-stack"> PRINT inverse STACK </button>
    </div> -->
    <div class="back-forth-container">
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
      gitPulled: false,
      mergeConflictExists: true,
      mergeConflictData: [],
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
      console.log(data);
      // checks for user input by checking if the input is not all whitespace
      if (data.match(/^\s+/) && data !== ' ') {
        console.log(this.currCommand);
        if (this.currCommand.trim().startsWith('git')) {
          this.gitStatus.output = '';
          this.command = this.currCommand;
          this.checkForPull();
          this.updateStack();          
        }
        this.updateStatus();
        this.currCommand = '';
        return;
      }
      if (data.includes('[K')){
        console.log(data + " does this check for backspaces?");
        this.currCommand = this.currCommand.slice(0, -1);
      }
      else this.currCommand += data;
    });

    ipc.on("terminal.incData", (_, data) => {  
      if (data.length !== 1 && !data.trim().startsWith('bash')) this.gitStatus.output = data;
      // if the user did a git pull, we should check if the output contains any merge conflicts
      if (this.gitPulled){
        this.retrieveOutput(data);
      }
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
    async checkForPull(){
      if (['pull'].includes(this.command.split(' ', 3)[1])){
        await new Promise(r => setTimeout(r, 100));
        this.gitPulled = true;
      }else{
        this.gitPulled = false;
      }

    },
    retrieveOutput(data){
      if (data.length !== 1 && !data.trim().startsWith('bash')){
          // separate the output by new lines
          let arrayOfLines = data.trim().split('\n');
          // check if one of the lines contains "CONFLICT" and thus, there is a merge conflict
          for(let i = 0; i < arrayOfLines.length; i++){
            if(arrayOfLines[i].includes("CONFLICT")){
              // retrive the file that contains the merge conflict
              while(i < arrayOfLines.length) {
                let arrayOfWords = arrayOfLines[i].split(" ");

                // signal that there is a merge conflict and save that file for MergeCon.vue
                if (arrayOfWords[0] === 'CONFLICT'){
                  this.mergeConflictExists = true;
                  this.mergeConflictData.push(arrayOfWords[arrayOfWords.length - 1]);
                  }
                  i++;
                  }
                }
              }
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

</style>
