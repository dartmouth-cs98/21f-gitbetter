<template>
    <nav class="nav level has-shadow" >
      <div 
        class="level-item has-text-centered"
        style="color:black; font-weight:500;cursor:pointer;"
        @click="$router.push('/help')"
      >
        Help
      </div>


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
          text: 'Beginner',
          page:'/beginner'
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
          text: 'DoItYourself',
          page:'/doityourself'
        },
      ],
      load: false,
    }
  },
  props: {
    ind: Number,
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
  computed: {
    helpClass() {
      return {
        helpone: this.ind == 2,
        helptwo: this.ind == 3,
        helpthree: this.ind == 4,
        helpfour: this.ind == 5,
      }
    }
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