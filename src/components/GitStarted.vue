

<template>
  <div>
      <button v-on:click="gitStarted()">Git Started</button>
    <Loading :start="load.value"/>
  </div>
</template>

<style scoped>
</style>

<script>

//https://dmitripavlutin.com/return-await-promise-javascript/

var replicate_repo = require('../../replicate_repo')
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
  // does not need to provide at the moment but could be helpful later
    provide() {
    return {
      isLoading: this.load
    };
  },

  methods: {

    async gitStarted() {
      //let done = false;
      this.isLoading.value = true;
      await replicate_repo.replicate()
      this.isLoading.value = false;
    }
  }
}

// to do for this component
// add time out to loading page with user feedback so if loading takes too long it stops
// check directory does not already exist
// check directory is a git repo
// move button to home page, terminal page opens after loading is complete
// add text to loading, ex "your temporary repo is being created..."

 </script>
 
 