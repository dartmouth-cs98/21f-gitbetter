<template>
    <nav class="nav level">
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
        
        <router-link 
            class="level-item has-text-centered is-info"
            :to="'/profile'"
        >
            Profile
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
      min-height: 3.25rem;
      background-color: rgb(232, 208, 255) !important;
  }
</style>