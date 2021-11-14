<template>
  <div>
        <button class="button is-outlined is-small" style="width:90px;margin:6px;" v-on:click="startOver">Start Over</button>
  </div>
</template>

<style scoped>
</style>

<script>
var clear = require('../../start_over')

export default {
  name: 'StartOver',
  methods: {
   startOver() {
        console.log('clicked start over');
        clear.start_over()
   }
  }
}

 </script>