<template>
  <div>
    <button class="button is-outlined is-small" style="width:90px;margin:6px;" v-on:click="gitStarted">Git Started</button>
  </div>
</template>

<style scoped>
</style>

<script>

var replicate_repo = require('../../replicate_repo')
var switch_directories = require('../../switch_directories')


export default {
  name: 'GitStarted',
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
 