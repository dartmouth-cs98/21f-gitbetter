<template>
  <div class="viz">
    {{this.toggleStatus()}}
      <MergeCon v-if="mergeConflict" :mergeData="this.mergeConflictData"/>
      <StatusViz v-else-if="this.command.startsWith('git status') 
                          && !this.runStatusInFilesChanged"
                  ref="statusChild"/> 
      <BranchViz v-else-if="this.command.startsWith('git branch')
                          || this.command.startsWith('git switch') 
                          || this.command.startsWith('git checkout')"
                  :command="this.command" 
                  :commandCount="this.commandCount" />
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
      runStatusInFilesChanged: false,
      dir: process.cwd(),
      mergeConExists: this.mergeConflict,
      commandCount: 0,
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
  mounted() {
    this.$root.$on('commandEntered', data => {
      this.commandCount = data
      console.log('COMMAND ENTERED:', this.commandCount)
    });
  },
  methods: {
    newCommand(val) {
      console.log('dir is', this.dir)
      if(val === 'git status') {
        this.$refs.statusChild.getStatus(this.dir);
      }
    },
    toggleStatus() {
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
    },
    finished(){
      this.mergeConExists = false;
    },
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
