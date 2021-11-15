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

        <button
            class="level-item has-text-centered"
            style="color:black; font-weight:500;"
            @click="$router.push('/')"
            v-on:click="startOver"
            >
                End
            </button>
            <loading />
    </nav>
</template>

<script>
var start_over = require('../../start_over')
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
    async startOver() {
      this.isLoading.value = true;
      await start_over.start_over()
      // try {
      //   process.chdir('./GitBetterTestRepository.gb');
      //   console.log("directory has successfully been changed to GitBetterTestRepository.gb folder in Navigation");
      // } catch {
      //   console.error("error while changing directory");
      // }
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