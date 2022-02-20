<template>
  <div class="viz">
      <!-- <FilesChanged :command="this.command"/> -->
      <div v-if="test">
        <StatusViz />
      </div>
      <div v-else>
        <InitViz /> 
      </div>
      <!-- <BranchViz v-if="this.command.startsWith('git branch') || this.command.startsWith('git switch') || this.command.startsWith('git checkout')" />
      <DirectoryTree v-else /> -->
  </div>
</template>

<script>
// import BranchViz from './BranchViz.vue'
import StatusViz from './StatusViz.vue'
import InitViz from './StatusViz.vue'
// import FilesChanged from './FilesChangedViz.vue'

export default {
  name: 'Visualization',
  props: {
    command: String
  },
  data() {
    return {
      test: false,
    }
  },
  computed: {
    getCurrCommand(){
        return this.$store.getters.getCurrCommand.name
    },
  },
  components: {
      // BranchViz,
      StatusViz,
      InitViz,
      // FilesChanged
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
