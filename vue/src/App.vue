<template>
  <div id="app" class="wrapper">
    <Navigation />
    <div class="divider"></div>
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation,
  }
}
</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass'
</style>
