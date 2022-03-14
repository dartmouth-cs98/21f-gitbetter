<template>
  <div class="viz">
    <MergeCon v-if="mergeConExists" :mergeData="this.mergeConflictData" @done="finished"/>
    <BranchViz v-else-if="this.command.trim().split(' ', 3)[1] === 'branch'" />
    <FilesChanged 
      v-else-if="['add', 'restore', 'rm', 'commit', 'push'].includes(this.command.trim().split(' ', 3)[1])" 
      :command="this.command"
    />
    <StatusViz v-else ref="statusChild" />
  </div>
</template>

<script>
import BranchViz from './BranchViz.vue'
import MergeCon from './MergeCon.vue'
import StatusViz from './StatusViz.vue'
import FilesChanged from './FilesChangedViz.vue'
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
      mergeConExists: this.mergeConflict,
    }
  },
  components: {
      BranchViz,
      StatusViz,
      MergeCon,
      FilesChanged,
  },
  created() {
    ipc.on('notGit', () => {
      this.$store.commit('setGitRepo', false);
    });
  },
  methods: {
    newCommand() {
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
