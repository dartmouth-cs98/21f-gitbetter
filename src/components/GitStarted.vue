<template>
  <div>
        <button @click="isLoading.value = !isLoading.value">Git Started</button>
  </div>
</template>

<style scoped>
</style>

<script>

var replicate_repo = require('../../replicate_repo')
var switch_directories = require('../../switch_directories')

export default {
  //<button v-on:click="gitStarted">Git Started</button>
  name: 'GitStarted',
  inject: ['isLoading'],
  methods: {
   gitStarted() {
     console.log('clicked gitstarted');
     replicate_repo.replicate();
     switch_directories.switch_cwd();
     console.log('cwd' + process.cwd)
   }
  }
}

 </script>
 