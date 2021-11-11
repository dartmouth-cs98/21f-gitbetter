<template>
  <div>
      <button v-on:click="gitStarted()">Git Started</button>
  <Loading :start="load.value" />
  </div>
</template>

<style scoped>
</style>

<script>

  //<button @click="isLoading.value = !isLoading.value">Git Started</button>

//var replicate_repo = require('../../replicate_repo')
//var switch_directories = require('../../switch_directories')
import Loading from './Loading.vue'

export default {

  name: 'GitStarted',
  inject: ['isLoading'],
  components : {
    Loading,
  },
  // So loading boolean is mutable, do not directily change use isLoading.value to update
  data: () => ({
    load: {
      value: false
    }
  }),
  // does not need to provid at the moment but could be helpful later
    provide() {
    return {
      isLoading: this.load
    };
  },

  methods: {

    async gitStarted() {
      function update_load() {
        this.isLoading.value = true;
      }
      // starts loading
      update_load();

      // repo is replicated and working directory switched to new repo in gb terminal
      //await replicate_repo.replicate();
      //await update_load;


      //.then(this.isLoading.value = false);
   },
  }
}

// to do for this component
// add time out to loading page with user feedback
// check directory does not already exist
// check directory is a git repo
// move button to home page, terminal page opens after loading is complete
// add text to loading, ex "your temporary repo is being created..."

 </script>
 