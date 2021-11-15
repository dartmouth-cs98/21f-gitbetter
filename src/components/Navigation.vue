<template>
    <nav class="nav level has-shadow" >
        <router-link 
            class="level-item has-text-centered"
            :to="'/help'"
            style="color:black; font-weight:500;"
        >
            Help
        </router-link>

        <div class="level-item has-text-centered">
          <router-link 
            class="level-item has-text-centered"
            :to="'/home'"
            style="color:black; font-weight:500;"
          >
          <img src="../assets/logo.png" />
          </router-link>
        </div>

        <a 
            href="#"
            class="level-item has-text-centered"
            style="color:black; font-weight:500;"
             v-on:click="gitStarted"
        >
            End
            <loading />
        </a>
    </nav>
</template>

<script>
var replicate_repo = require('../../replicate_repo')
import Loading from './Loading.vue'


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
    async gitStarted() {
      this.isLoading.value = true;
      await replicate_repo.replicate()
      process.chdir('../21f-gitbetter.gb');
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
  @media only screen and (max-width: 770px) {
    .nav {
      display: flex;
      padding: 0px 30px;
    }
  }
</style>