<template>
  <div id="app" class="wrapper">
      <Loading :start="load.value" />
        <div class="divider"></div>
          <!-- <Navigation /> -->
      <router-view />
    </div>
</template>

<script>
// import Navigation from './components/Navigation.vue'
import Loading from './components/Loading.vue'

export default {
  name: 'App',
  components: {
    // Navigation,
    Loading
  },

  data: () => ({
    load: {
      value: false
    }
  }),
  provide() {
    return {
      isLoading: this.load
    };
  }
};
</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass'
</style>
