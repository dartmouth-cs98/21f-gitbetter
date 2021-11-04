<template>
  <div class="main">
    <div class="columns">
        <div class="column is-fullheight is-one-fifth">
            <Sidebar />
        </div>
        <div class="column mr-4">
            <div class="header">
                <h1 class="title">History</h1>
                <h2 class="subtitle is-4 mb-1">Your history of commands...</h2>
            </div>      
        </div>
                
    </div>
  </div>
</template>

<script>

import Sidebar from './Sidebar.vue'

export default {
  name: 'Home',
  components: {
    
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
.header {
    height: 15%;
}
</style>
