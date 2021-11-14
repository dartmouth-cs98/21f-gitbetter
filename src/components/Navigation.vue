<template>
    <nav class="nav level has-shadow" >
        <router-link 
            class="level-item has-text-centered"
            :to="'/welcome'"
            style="color:black; font-weight:500;"
        >
            Welcome
        </router-link>

        <div class="level-item has-text-centered">
          
          <router-link 
            class="level-item has-text-centered"
            :to="'/'"
            style="color:black; font-weight:500;"
        >
            <img src="../assets/logo.png" />
        </router-link>
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
          text: 'Welcome',
          page:'/welcome'
        },
        {
          id: 1,
          text: 'Home',
          page:'/'
        },
        {
          id: 2,
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
  img {
    width: 45%;
    padding: 10px;
  }
  @media only screen and (max-width: 770px) {
    .nav {
      display: flex;
      padding: 0px 30px;
    }
  }
</style>