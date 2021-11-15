<template>
  <div>
        <button 
          @click="$router.push('/')" 
          class="button is-outlined is-small" 
          style="width:90px;margin:6px;" 
          v-on:click="startOver"
        >
        End
        </button>
  <loading />
  </div>
</template>

<style scoped>
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
        this.isLoading.value = true;
        await clear.start_over()
        this.isLoading.value = false;
   }
  }
}

 </script>