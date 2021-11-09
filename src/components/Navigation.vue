<template>
    <nav class="nav level has-shadow">
        <router-link 
            class="level-item has-text-centered is-info"
            :to="'/'"
        >
            Home
        </router-link>

        <div class="level-item has-text-centered">
          <div class="is-info" style="font-size: 40px">
            Git Better
          </div>
        </div>

        <router-link 
            class="level-item has-text-centered is-info"
            :to="'/help'"
        >
            Help
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
          text: 'Help',
          page:'/help'
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
  @media only screen and (max-width: 770px) {
    .nav {
      display: flex;
      padding: 0px 30px;
    }
  }
</style>