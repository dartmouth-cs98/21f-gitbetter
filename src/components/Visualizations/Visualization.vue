<template>
  <div class="viz">
      <!-- <StatusViz /> -->
      <BranchViz />
      <!-- <BranchViz v-if="this.command.startsWith('git branch') || this.command.startsWith('git switch') || this.command.startsWith('git checkout')" />
      <DirectoryTree v-else /> -->
  </div>
</template>

<script>
// import DirectoryTree from './DefaultViz.vue'
import BranchViz from './BranchViz.vue'
// import StatusViz from './StatusViz.vue'
export default {
  name: 'Viz',
  props: {
    command: String  
  },
  components: {
      // DirectoryTree,
      BranchViz,
      // StatusViz,
  }
}
</script>

<style>
.viz {
    justify-content: center;
    display: flex;
    overflow: auto;
}
.vis::-webkit-scrollbar {
  display: none;
} 
</style>
