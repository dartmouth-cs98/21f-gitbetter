<template>
  <div class="main">
    <div class="columns">
        <div class="column is-fullheight is-one-fifth">
            <Sidebar />
        </div>
        <div class="column py-0">
           
        
            <h1 class="title">Home</h1>
            <h2 class="subtitle is-4">All your git needs...</h2>

            <VizWindow />  
            <TerminalWrapper />
                     
        </div>
                
    </div>
  </div>
</template>

<script>
import VizWindow from './VizWindow.vue'
import TerminalWrapper from './TerminalWrapper.vue'
import Sidebar from './Sidebar.vue'

export default {
  name: 'Home',
  components: {
    VizWindow,
    TerminalWrapper,
    Sidebar,
  }

//   props: {
//     msg: String
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.columns {
    height: 100%;
}
</style>
