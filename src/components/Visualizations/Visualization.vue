<template>
  <div class="viz">
    {{this.printCommand()}}
      <MergeCon v-if="mergeConflict" :mergeData="this.mergeConflictData"/>
      <StatusViz v-else-if="this.command.startsWith('git status') && !this.runStatusInFilesChanged"/> 
      <BranchViz v-else-if="this.command.startsWith('git branch')
                          || this.command.startsWith('git switch') 
                          || this.command.startsWith('git checkout')"/>
      <FilesChanged v-else-if="this.command.startsWith('git add') 
                        || this.command.startsWith('git restore')
                        || this.command.startsWith('git rm')
                        || this.command.startsWith('git commit')
                        || this.command.startsWith('git push')
                        || this.runStatusInFilesChanged"
                    @runStatus="onRunStatus"    
                    :command="this.command"/>       
      <StatusViz v-else ref="statusChild"/>
  </div>
</template>

<script>
import BranchViz from './BranchViz.vue'
import MergeCon from './MergeCon.vue'
import StatusViz from './StatusViz.vue'
import FilesChanged from './FilesChangedViz.vue'
// import InitViz from './StatusViz.vue'
const ipc = require("electron").ipcRenderer

export default {
  name: 'Visualization',
  props: {
    command: String,
    mergeConflict: Boolean,
    mergeConflictData: Array,
  },
  data() {
    return {
      test: true,
      runStatusInFilesChanged: false
    }
  },
  computed: {
    getCurrCommand(){
      
        return this.$store.getters.getCurrCommand.name
    },
    isGit() {
      return this.$store.getters.gitRepo
    }
  },
  components: {
      BranchViz,
      StatusViz,
      // InitViz,
      MergeCon,
      FilesChanged
  },
  created() {
    ipc.on('notGit', () => {
      this.$store.commit('setGitRepo', false);
    });
  },
  methods: {
    newCommand(val) {
      if(val === 'git status') {
        this.$refs.statusChild.getStatus(process.cwd());
      }
    },
    printCommand() {
      if (this.command.startsWith('git')
        && !this.command.startsWith('git add') 
        && !this.command.startsWith('git restore')
        && !this.command.startsWith('git rm')
        && !this.command.startsWith('git commit')
        && !this.command.startsWith('git push')) {
          this.runStatusInFilesChanged = false
      }
    },
    onRunStatus (value) {
      this.runStatusInFilesChanged = value
    }
  }
}
</script>

<style>
.viz {
    justify-content: center;
    display: flex;
    overflow-y: scroll;
    height: 100%;
}
.viz::-webkit-scrollbar {
  display: none;
} 
</style>
