<template>
  <div class="viz">
      <!-- 
          This will become the default so: <DirectoryTree v-else/>
          and other components will be: <SomeViz v-if="this.command==='git command'">
      -->
      {{this.command}} {{this.command.length}}
      ----
      <BranchViz />
      <!-- <BranchViz v-if="this.command.startsWith('git branch') || this.command.startsWith('git switch') || this.command.startsWith('git checkout')" />
      <DirectoryTree v-else /> -->
  </div>
</template>

<script>
// import DirectoryTree from './DefaultViz.vue'
import BranchViz from './BranchViz.vue'

export default {
  name: 'Viz',
  props: {
    command: String  
  },
  components: {
      // DirectoryTree,
      BranchViz,
  }
}
</script>

<style>
.viz {
    justify-content: center;
    display: flex;
    overflow: auto;
}
</style>
