<template>
  <div>
        <button 
          @click="$router.push('/Welcome.vue')" 
          class="button end-button" 
          v-on:click="startOver"
        >
        End
        </button>
  <loading />
  </div>
</template>

<style scoped>
.end-button {
  width:90px;
  margin:6px;
  background-color: #AB47BC;
  color: black;
  border-color: #AB47BC;
  font-weight: 500;
}
</style>

<script>

import Loading from './Loading.vue'

var clear = require('../../start_over')

export default {
  name: 'StartOver',
  inject: ['isLoading'],
  components: {Loading},
    
  data: () => ({
    load: {
      value: false
    }
  }),
  // does not need to provide at the moment but could be helpful later
    provide() {
    return {
      isLoading: this.load
    };
  },

  methods: {
   async startOver() {
        console.log("end button has been pushed, running start over")
        this.isLoading.value = true;
        await clear.start_over()
        this.isLoading.value = false;
   }
  }
}

 </script>