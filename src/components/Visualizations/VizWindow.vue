<template>
  <div class="vis-box">
    <Visualization ref="vizChild" :mergeConflict="this.mergeConflictExists" :mergeConflictData="this.mergeConflictData" /> 
    <div class="print-container">
      <button @click="this.printStack" class="print-stack"> PRINT STACK </button>
      <button @click="this.printInverseStack" class="print-stack"> PRINT inverse STACK </button>
    </div>
    <div v-if="this.advisoryModalOpened" class="advisory-modal">
      <div class="advisory-modal-note">{{this.advisoryModalMessage}}</div>
      <div class="advisory-modal-button-container">
        <button @click="this.actionCallback" class="advisory-modal-button advisory-modal-button-yes">Continue</button>
        <button @click="this.closeModal" class="advisory-modal-button advisory-modal-button-no">Cancel</button>
      </div>
    </div>
    <div v-if="(this.stackIndex < this.commandStack.length - 1) && !this.advisoryModalOpened " class="middle-modal">
      <div class="middle-modal-note">WARNING: You're in the middle of the stack! Any commands you type will override your next commands</div>
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
import cleanMidOperation from '../../utils/cleanMidOperation'
const channel = 'terminal.toTerm';

export default {
  name: 'VizWindow',
  data() {
    return {
      gitPulled: false,
      mergeConflictExists: false,
      mergeConflictData: [],
      command: '',
      currCommand: '',
      stackIndex: 0,
      isInMiddleOfStack: false,
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
        gbVersion: 0,
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
      // checks for user input by checking if the input is not all whitespace
      if (data.match(/^\s+/) && data !== ' ') {
        if (this.currCommand.trim().startsWith('git')) {
          this.gitStatus.output = '';
          this.command = this.currCommand;
          this.checkForPull();
          this.updateStack();
        } else ipc.send('runTerminalCommand', 'VizWindow');
        this.updateStatus();
        this.currCommand = '';
        return;
      }
      this.currCommand += data;
    });

    ipc.on("terminal.incData", (_, data) => {  
      if (data.length !== 1 && !data.trim().startsWith('bash')) this.gitStatus.output = data;
      // if the user did a git pull, we should check if the output contains any merge conflicts
      if (this.gitPulled){
        this.retrieveOutput(data);
      }

      if (data.includes('[K')) this.currCommand = this.currCommand.slice(0, -2);
      if (data.includes('\n')) this.currCommand = '';
    });

    ipc.on('giveFilePath', async(_, pwd) => {
      this.syncReplicate(pwd);
      this.gitStatus.workingDirectory = pwd;
      const [gb, gbVersion] = pwd.split('.').slice(-2);
      if (gbVersion === 'gb') {
        this.gitStatus.gbVersion = 0;
      } else if (gb === 'gb') {
        this.gitStatus.gbVersion = parseInt(gbVersion) || 0;
      } else console.warn('??? unknown directory format: ' + pwd);

      if (!this.isInMiddleOfStack) {
        // Prior command was destroyed, postpone until we have repo prepared
        await new Promise(r => setTimeout(r, 500));
        ipc.send('terminal.toTerm.force', {
          pwd: this.gitStatus.workingDirectory,
          command: this.commandStack[this.stackIndex].current.command,
        });
        await new Promise(r => setTimeout(r, 500));
        ipc.send('runTerminalCommand', 'VizWindow');
      } 
      // else this.actionCallback();
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
    async updateStack() {
      const { action } = classification(this.command, this.gitStatus);
      if (
        [ACTIONS.NOOP].includes(action)
        && this.stackIndex < this.commandStack.length - 1
      ) return;
      if (this.stackIndex < this.commandStack.length - 1) {
        await cleanMidOperation(this.gitStatus.gbVersion+1);
        this.commandStack = this.commandStack.slice(0, this.stackIndex+1);
      }
      console.log('&&&&&&&&&&&&&&&&&& reset stack index &&&&&&&&&&&&&&&&&&');
      this.isInMiddleOfStack = false;

      // Operations that depend on output
      if (['tag'].includes(this.command.split(' ', 3)[1])) await new Promise(r => setTimeout(r, 500));

      const command = inverseCommand(this.command, this.gitStatus);
      this.commandStack.push({
        current: { command: this.command, ...classification(this.command, this.gitStatus) },
        previous: { command, ...classification(command, this.gitStatus) },
      });
      this.stackIndex++;

      if ([
        this.commandStack[this.stackIndex].current.action,
        this.commandStack[this.stackIndex].previous.action,
      ].includes(ACTIONS.DESTRUCTIVE)) {
        // Clone Repo Request
        const { workingDirectory: directory, gbVersion } = this.gitStatus;
        ipc.send('destructiveCommandClone', { directory, version: gbVersion + 1 });
      // Non destructive Command - so we can accept as is
      } else ipc.send('runTerminalCommand', 'VizWindow');
    },
    syncReplicate(pwd) {
      process.chdir(pwd);
      this.updateStatus();
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
            if(arrayOfLines[i].includes("CONFLICT") || arrayOfLines[i].includes("Automatic")){
              // retrive the file that contains the merge conflict
              this.mergeConflictExists = true;
              this.mergeConflictData.push(arrayOfLines[i]);

                }
              }
        }
    },
    printStack() {
      console.log(this.isInMiddleOfStack, 'mid stack');
      console.log(this.commandStack.map(
        ({ current }, pos) => (pos === this.stackIndex ? '>' : ' ') + current.command + '..' + current.action));
    },
    printInverseStack() {
      console.log(this.commandStack.map(
        ({ previous }, pos) => (pos === this.stackIndex ? '<' : ' ') + previous.command));
    },

    actionCallback() {
      let command;
      if (this.advisoryModalForward) {
        command = this.commandStack[this.stackIndex].current;
      } else {
        command = this.commandStack[this.stackIndex].previous;
        this.stackIndex--;
      }
      console.log(`callback: Currently at pos ${this.stackIndex} -- ${command.command}`);
      ipcRenderer.send(channel, command.command + '\n');
      this.closeModal();
    },

    closeModal() {
      this.advisoryModalOpened = false;
      this.advisoryModalMessage = '';
    },

    nextCommand() {
      this.advisoryModalForward = true;
      this.isInMiddleOfStack = true;
      this.stackIndex++;
      const operation = this.commandStack[this.stackIndex].current;
      console.log('^^^^^^^^^^^^ reset stack index ^^^^^^^', operation.action, operation.command);
      switch (operation.action) {
        case ACTIONS.DESTRUCTIVE: {
          const { workingDirectory: directory, gbVersion } = this.gitStatus;
          console.log(`nextCommand version: ${gbVersion}`)
          ipc.send('destructiveCommandClone', { directory, version: gbVersion + 1 });
          return;
        }
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
      this.isInMiddleOfStack = true;
      const operation = this.commandStack[this.stackIndex].previous;
      console.log(`Prev: Currently at pos ${this.stackIndex} -- running ${operation.command}`);
      switch (operation.action) {
        case ACTIONS.DESTRUCTIVE: {
          this.stackIndex--;  // Does not run command, just changes directory
          const { workingDirectory: directory, gbVersion } = this.gitStatus;
          if (gbVersion <= 0) throw Error('This case should never occur');
          console.log(`destructiveCommand version: ${gbVersion}`)
          ipc.send('destructiveCommandClone', { directory, version: gbVersion - 1 });
          return;
        }
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
    sendCommand(val) {
      this.$refs.vizChild.newCommand(val)
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
.advisory-modal, .middle-modal {
  padding: 5px;
}
.advisory-modal-note, .middle-modal-note {
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
