<template>
  <div class="viz">
      <FilesChanged :command="this.command"/>
      <!-- <StatusViz /> -->
      <!-- <BranchViz v-if="this.command.startsWith('git branch') || this.command.startsWith('git switch') || this.command.startsWith('git checkout')" />
      <DirectoryTree v-else /> -->
  </div>
</template>

<script>
// import BranchViz from './BranchViz.vue'
// import StatusViz from './StatusViz.vue'
import FilesChanged from './FilesChangedViz.vue'

export default {
  name: 'Viz',
  props: {
    command: String
  },
  components: {
      // BranchViz,
      // StatusViz,
      FilesChanged
  }
}
</script>

<style>
.viz {
    justify-content: center;
    display: flex;
    overflow: auto;
    height: 100%;
}
.vis::-webkit-scrollbar {
  display: none;
} 
</style>
