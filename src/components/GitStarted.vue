<template>
  <div>
    <button 
      class="button is-outlined is-small" 
      style="width:90px;margin:6px;" 
      v-on:click="gitStarted"
    >
    Git Started
    </button>
    <loading />
  </div>
</template>

<style scoped>
</style>

<script>

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
      this.isLoading.value = true;
      await replicate_repo.replicate()
      process.chdir('../21f-gitbetter.gb');
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
 
 