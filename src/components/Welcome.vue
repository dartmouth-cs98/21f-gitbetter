<template>
  <div class="main">
    <h1 class="title">Welcome</h1>
    <button 
    @click="$router.push('/')"
    >
        Git started
    </button>
  </div>
</template>

<script>

export default {
  name: 'Welcome',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.columns {
    height: 100%;
}
</style>
