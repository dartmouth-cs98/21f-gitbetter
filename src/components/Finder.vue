
<template>
  <div class="main">
    <div id="example-1">
        <button v-on:click="$router.push('/home')">
            Done
        </button>


<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
    </div>     
  </div>
</template>

<script>
export default {
  name: 'Finder',
}
</script>
<style scoped>

</style>

