<template>
  <div class="viz">
      <!-- <FilesChanged :command="this.command"/> -->
      <MergeCon v-if="mergeConExists" :mergeData="this.mergeConflictData" @done="finished"/>
      <div v-else>
        <div v-if="test">
        <StatusViz ref="statusChild" />
      </div>
      <div v-else>
        <!-- <StatusViz ref="statusChild"/> />  -->
      </div>
      </div>
      
      <!-- <BranchViz v-if="this.command.startsWith('git branch') || this.command.startsWith('git switch') || this.command.startsWith('git checkout')" />
      <DirectoryTree v-else /> -->
  </div>
</template>

<script>
// import BranchViz from './BranchViz.vue'
import MergeCon from './MergeCon.vue'
import StatusViz from './StatusViz.vue'
// import InitViz from './StatusViz.vue'
const ipc = require("electron").ipcRenderer

// import FilesChanged from './FilesChangedViz.vue'

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
      mergeConExists: this.mergeConflict,
      pwd: "",

    }
  },
  watch: {
    '$store.state.workingDir': function() {
      this.pwd = this.$store.getters.getPWD; 
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
      // BranchViz,
      StatusViz,
      // InitViz,
      MergeCon,
      // FilesChanged
  },
  created() {
    ipc.on('notGit', () => {
      this.$store.commit('setGitRepo', false);
    });
  },
  methods: {

    newCommand(val) {
      // this.dir = this.$store.getters.getPWD;
      console.log('dir is', this.pwd)
      if(val === 'git status') {
        this.$refs.statusChild.getStatus(this.pwd);
      }

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
