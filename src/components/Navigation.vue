<template>
    <nav class="nav level has-shadow">
        <router-link 
            class="level-item has-text-centered is-info"
            :to="'/'"
        >
            Home
        </router-link>

        <div class="level-item has-text-centered">
            <div class="is-info" style="font-size: 40px;">
                Git Better
            </div>
        </div>
        
        <div class="level-item has-text-centered">
          <div class="is-info" style="font-size: 40px">
            Start Over
          </div>
        </div>

        <router-link 
            class="level-item has-text-centered is-info"
            :to="'/history'"
        >
            History
        </router-link>
    </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page:'/'
        },
        {
          id: 1,
          text: 'Profile',
          page:'/profile'
        },
     
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav {
      margin-bottom: 0 !important;
      min-height: 3.25rem;
      background-color: #edaca2;
  }
</style>