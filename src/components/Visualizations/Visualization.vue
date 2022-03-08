<template>
  <div class="viz">
      <MergeCon v-if="mergeConflict" :mergeData="this.mergeConflictData" @done="finished"/>
      <StatusViz v-else-if="(this.command.startsWith('git status') 
                          || this.command.startsWith('touch')
                          || this.command.startsWith('rm'))"
                  :command="this.command"
                  :commandCount="this.commandCount"        
                  ref="statusChild"/> 
      <BranchViz v-else-if="this.command.startsWith('git branc')
                          || this.command.startsWith('git switch') 
                          || this.command.startsWith('git checkout')"
                  :command="this.command" 
                  :commandCount="this.commandCount" />
      <FilesChanged v-else-if="this.command.startsWith('git add') 
                        || this.command.startsWith('git restore')
                        || this.command.startsWith('git rm')
                        || this.command.startsWith('git commit')
                        || this.command.startsWith('git push')"
                    :command="this.command"
                    :commandCount="this.commandCount" />       
      <StatusViz v-else ref="statusChild" :command="this.command" :commandCount="this.commandCount"/>
  </div>
</template>

<script>
import BranchViz from './BranchViz.vue'
import MergeCon from './MergeCon.vue'
import StatusViz from './StatusViz.vue'
// import InitViz from './StatusViz.vue'
const ipc = require("electron").ipcRenderer

import FilesChanged from './FilesChangedViz.vue'

export default {
  name: 'Visualization',
  props: {
    command: String,
    // commandCount: Number,
    mergeConflict: Boolean,
    mergeConflictData: Array,
  },
  data() {
    return {
      test: true,
      dir: "",
      priorDir: '',
      mergeConExists: this.mergeConflict,
      commandCount: 0
    }
  },
  watch: {
    '$store.state.workingDir': function() {
      this.dir = this.$store.getters.getPWD;
    },
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
    newCommand(val) { // Not entirely sure what to do with this 
      console.log(`new command ${val}`)
      // if(val === 'git status') {
      //   this.$refs.statusChild.getStatus(this.dir);
      // }
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
