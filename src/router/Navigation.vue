<template>
    <nav class="nav level has-shadow" >
      <div class="level-item has-text-centered">
        <div class="nav level l-menu">
          <router-link 
              class="level-item has-text-centered"
              :to="'/help'"
              style="color:black; font-weight:500;"
          >
              Help
          </router-link>

          <router-link 
              class="level-item has-text-centered"
              :to="'/tutorials'"
              style="color:black; font-weight:500;"
          >
              Tutorials
          </router-link>
        </div>
      </div>


        <div class="level-item has-text-centered">
          <router-link 
            class="level-item has-text-centered"
            :to="'/home'"
            style="color:black; font-weight:500;"
          >
          <img src="../assets/logo.png" />
          </router-link>
        </div>
                <div
            class="level-item has-text-centered"
            style="color:black; font-weight:500;cursor:pointer;"
            @click="$router.push('/DoItYourself')"
            >
                Do It Yourself
        </div>
        <div
            class="level-item has-text-centered"
            style="color:black; font-weight:500;cursor:pointer;"
            @click="$router.push('/')"
            v-on:click="startOver"
            >
                End
        </div>
      <loading />
    </nav>
</template>

<script>
var start_over = require('../utils/start_over')
import Loading from '../components/Loading.vue'

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
          id: 1,
          text: 'Home',
          page:'/home'
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
          text: 'Do It Yourself',
          page:'/DoItYourself'
        },
      ],

      load: false,
    }
  },
  inject: ['isLoading'],
  provide() {
    return {
      isLoading: this.load,
    };
  },
  components: {
    Loading,
  },
  methods: {
    async startOver() {
     this.isLoading.value = true;
      await start_over.start_over()
      this.isLoading.value = false;
    }
  }
}
</script>
<style lang="scss" scoped>
  .nav {
      margin-bottom: 0 !important;
      min-height: 4.25rem;
      background-color: #ab47bc;
  }
  img {
    width: 45%;
    padding: 10px;
  }

  .l-menu {
    width: 100%;
  }
  @media only screen and (max-width: 770px) {
    .nav {
      display: flex;
      padding: 0px 30px;
    }
  }
</style>