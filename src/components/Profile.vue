<template>
  <div class="main">
    <div class="columns">
        <div class="column is-fullheight is-one-fifth">
            <Sidebar />
        </div>
        <div class="column py-0">
           
        
            <h1 class="title">Profile</h1>
            <h2 class="subtitle is-4">Here is your user profile...</h2>
                     
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
</style>
