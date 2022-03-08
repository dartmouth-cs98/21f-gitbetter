<template>
    <nav class="nav level has-shadow" >
      <div style="width: 25%;" class="level-item has-text-centered nav level">
        <router-link 
            class="level-item has-text-centered"
            :to="'/help'"
            style="color:black; font-weight:500;text-decoration: none;"
        >
          Help
        </router-link>
        <router-link 
            class="level-item has-text-centered"
            :to="'/tutorials'"
            style="color:black; font-weight:500;text-decoration: none;"
        >
          Tutorials
        </router-link>
      </div>
       <div class="level-item has-text-centered">
        <router-link 
          :to="'/home'"
          style="color:black; font-weight:500;"
        >
          <img src="../assets/logo.png" />
        </router-link>
       </div>
        <div  style="width: 20%;" class="level-item has-text-centered">
          <div class="level r-menu">
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
        
      </div>
      <loading />
    </nav>
</template>

<script>
var start_over = require('../utils/start_over')
import Loading from '../components/Loading.vue'
import { saveChanges } from '../utils/saveChanges'
const ipc = require("electron").ipcRenderer
import VueSimpleAlert from "vue-simple-alert";

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
      pwd: ""
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

  mounted() {

    ipc.on("giveFilePath", (event, pwd) => {
      this.pwd = pwd
    })
  },

  methods: {
    async saveChanges() {
      await saveChanges(this.pwd)
    },
    async startOver() {
       VueSimpleAlert.confirm("All unsaved changes will be lost").then(async (res)=>{
        if (res) {
          this.isLoading.value = true;
          ipc.eventNames().forEach(channel => ipc.removeAllListeners(channel));
          await start_over.start_over(this.pwd)
          this.isLoading.value = false;
          this.$router.push('/')
        }
      }).catch(console.log);
    },
    helpIconPressed() {
      if(this.$router.currentRoute.path !== '/home') {
        this.$router.push('/home');
      }
      this.$emit('help');
      if (this.$router.currentRoute.path != '/home') {
        this.$router.push('/home');
      }
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