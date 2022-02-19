<template>
  <div class="viz">
      <!-- <FilesChanged :command="this.command"/> -->
      <div v-if="!isGit">
         <InitViz /> 
      </div>
      <div v-else>
        <StatusViz ref="statusChild"/> /> 
      </div>
      <!-- <BranchViz v-if="this.command.startsWith('git branch') || this.command.startsWith('git switch') || this.command.startsWith('git checkout')" />
      <DirectoryTree v-else /> -->
  </div>
</template>

<script>
// import BranchViz from './BranchViz.vue'
import StatusViz from './StatusViz.vue'
import InitViz from './StatusViz.vue'
const ipc = require("electron").ipcRenderer

// import FilesChanged from './FilesChangedViz.vue'

export default {
  name: 'Visualization',
  props: {
    command: String
  },
  data() {
    return {
      test: true,
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
      // BranchViz,
      StatusViz,
      InitViz,
      // FilesChanged
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
