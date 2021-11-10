<template>
    <nav class="nav level has-shadow">
        <router-link 
            class="level-item has-text-centered"
            :to="'/'"
            style="color:black; font-weight:500;"
        >
            Home
        </router-link>

        <div class="level-item has-text-centered">
          <img src="../assets/logo.png" />
        </div>

        <router-link 
            class="level-item has-text-centered"
            :to="'/help'"
            style="color:black; font-weight:500;"
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
      background-color: #ab47bc;
  }
  @media only screen and (max-width: 770px) {
    .nav {
      display: flex;
      padding: 0px 30px;
    }
  }
</style>