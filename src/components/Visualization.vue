<template>
  <div style="justify-content:center;">
      <!-- 
          This will become the default so: <DirectoryTree v-else/>
          and other components will be: <SomeViz v-if="this.command==='git command'">
      -->
      <DirectoryTree/>
  </div>
</template>

<script>
import DirectoryTree from './DefaultViz.vue'

export default {
  name: 'Viz',
  props: {
    command: String  
  },
  components:{
      DirectoryTree
  }
}
</script>
