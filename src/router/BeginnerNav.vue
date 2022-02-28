<template>
    <nav class="nav level has-shadow" >
      <div 
        class="level-item has-text-centered"
        style="color:black; font-weight:500;cursor:pointer;"
        @click="$router.push('/help')"
      >
        Help
      </div>
      <router-link 
            class="level-item has-text-centered"
            :to="'/test'"
            style="color:black; font-weight:500;"
        >
          Test Yourself
        </router-link>

        <div 
            class="level-item has-text-centered"
            @click="$router.push('/help')"
            style="color:black; font-weight:300;cursor:pointer;max-width:45%;"
        >
          <img src="../assets/beginnerlogo.png" />
        </div>
        <div
            class="level-item has-text-centered"
            style="color:black; font-weight:500;cursor:pointer;"
            @click="$router.push('/')"
            v-on:click="startOver"
            >
                End
        </div>
    </nav>
</template>

<script>
var start_over = require('../utils/start_over')

export default {
  name: 'Navigation',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Welcome',
          page:'/'
        },
        {
          id: 2,
          text: 'Help',
          page:'/help'
        },
        {
          id: 3,
          text: 'Tutorials',
          page:'/tutorials'
        },
        {
          id: 4,
          text: 'Test',
          page:'/test'
        },
      ],
    }
  },

  methods: {
    async startOver() {
      await start_over.start_over()
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav {
      margin-bottom: 0 !important;
      height: 5rem;
      background-color: #ab47bc;
  }
  img {
    width: 50%;
    padding: 10px;
  }

  @media only screen and (max-width: 770px) {
    .nav {
      display: flex;
      padding: 0px 30px;
    }
  }
</style>