<template>
  <div class="viz">
      <StatusViz />
  </div>
</template>

<script>
// import BranchViz from './BranchViz.vue'
import StatusViz from './StatusViz.vue'
// import FilesChanged from './FilesChangedViz.vue'

export default {
  name: 'Viz',
  props: {
    command: String
  },
  computed: {
    getCurrCommand(){
        return this.$store.getters.getCurrCommand.name
    },
  },
  components: {
      // BranchViz,
      StatusViz,
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
