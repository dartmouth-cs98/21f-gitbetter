<template>
    <nav class="nav level has-shadow" >
      <div class="level-item has-text-centered nav level l-menu">
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
        <router-link 
          :to="'/home'"
          style="color:black; font-weight:500;"
        >
          <img src="../assets/logo.png" />
        </router-link>
        <div
          class="level-item has-text-centered"
          style="color:black; font-weight:500;cursor:pointer;"
          :to="'/home'"
          v-on:click="saveChanges"
          >
          Save
          </div>
        <div
          class="level-item has-text-centered"
          style="color:black; font-weight:500;cursor:pointer;"
          @click="$router.push('/')"
          v-on:click="startOver"
          >
          End
        </div>
        <div
          class="level-item has-text-centered"
          style="color:black; font-weight:500;cursor:pointer;"
          v-on:click="helpIconPressed"
          >
            <font-awesome-icon icon="question-circle"/>
        </div>
        <div v-bind:class="helpClass">
          <slot></slot>
        </div>
      </div>
      <loading />
    </nav>
</template>

<script>
var start_over = require('../utils/start_over')
import Loading from '../components/Loading.vue'
import { saveChanges } from '../utils/saveChanges'
import { ipcRenderer } from 'electron'

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
        helpone: this.ind == 3,
        helptwo: this.ind == 4,
        helpthree: this.ind == 5,
        helpfour: this.ind == 6,
        helpfive: this.ind > 6,
      }
    }
  },
  methods: {
    async saveChanges() {
      await saveChanges()
    },
    async startOver() {
      this.isLoading.value = true;
      ipcRenderer.eventNames().forEach(channel => ipcRenderer.removeAllListeners(channel));
      await start_over.start_over()
      this.isLoading.value = false;
    },
    helpIconPressed() {
      if(this.$router.currentRoute.path !== '/home') {
        this.$router.push('/home');
      }
      this.$emit('help');
      
    }
    
  }
}
</script>
<style lang="scss" scoped>
  .nav {
      margin-bottom: 0 !important;
      height: 5rem;
      background-color: #ab47bc;
      font-size: 20px;
  }
  img {
    width: 45%;
    padding: 10px;
    margin:auto;
  }
  .level-item {
    margin: auto;
  }
  .l-menu {
    width: 100%;
  }
  .r-menu {
    width: 100%;
  }
  .helpone { 
    position: absolute;
    left: 24px;
    top: 4.6rem;
    z-index: 6;
    max-width: 25%;
  }
  .helptwo { 
    position: absolute;
    left: 15%;
    top: 4.6rem;
    z-index: 6;
    max-width: 25%;
  }
  .helpthree { 
    position: absolute;
    left: 45%;
    top: 4.6rem;
    z-index: 6;
    max-width: 25%;
  }
  .helpfour { 
    position: absolute;
    left: 65%;
    top: 4.6rem;
    z-index: 6;
    max-width: 25%;
  }
  .helpfive { 
    position: absolute;
    right: 12px;
    top: 4.6rem;
    z-index: 6;
    max-width: 25%;
  }

  @media only screen and (max-width: 770px) {
    .nav {
      display: flex;
      padding: 0px 30px;
      justify-content: center;
    }
    .level-item:not(:last-child) {
      margin: auto 10px;
    }
  }
</style>