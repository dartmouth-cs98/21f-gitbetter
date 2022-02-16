<template>
  <div class="main top-welcome">
      <div class="page-flex">        
            <div class="top-directory">
                <div class="logo">
                    <img src="../assets/logo.png" />
                    <p class="subtitle">Git, simplified.</p>
                    
                    <div class="wrapper" v-on:click="gitStarted" >
                        <div class="cta">
                            <span>Git Started</span>                            
                        </div>
                    </div>
                </div>
                <div class="bottom-button" @click="$router.push('/beginner')"> 
                    <h1 class="section-header">Beginner</h1>
                    <!-- <div class="start-options">
                    <h2><font-awesome-icon class="faIcon" icon="plus"/>  Create new file</h2>
                    <h2><font-awesome-icon class="faIcon" icon="plus"/>  Open file</h2>
                    <h2><font-awesome-icon class="faIcon" icon="plus"/>  Clone git repository</h2>
                    </div>
                    <h1 class="section-header">Recent</h1> -->
                    <!-- <h2><font-awesome-icon class="faIcon" icon="plus"/>  CS98 GitBetter</h2> -->
                </div>
            </div>
        </div>

        <div class="vl"></div>

        <div class= "top-help">
            <nav class="panel">
                <h1 class="section-header help-header"> Search for commands...</h1>
                <div class="panel-block search-comp">
                    <p class="control has-icons-left">
                        <input class="input" type="command" v-model="searchInput" @input="searchCommands(searchInput)" placeholder="How do I do this?">
                        <span class="icon is-small is-left">
                            <font-awesome-icon icon="search"/> 
                        </span>
                    </p>
                </div>
                <div class="panel-block results-parent">
                    <div class="panel-block results" v-if="commandOpts.length > 1">
                        {{ commandOpts.length }} results found...
                    </div>
                    <div class="panel-block results" v-if="commandOpts.length == 1">
                        {{ commandOpts.length }} result found...
                    </div>
                    <div v-for="match in commandOpts" :key="match.id" class="panel-block command-blocks">
                        {{ match.command }}: {{ match.desc }}
                    </div>
                </div>
            </nav>
        </div>
      <loading />
  </div>
</template>

<script>

import Loading from './Loading.vue'
//import replicate from '../../replicate_repo_test.js'
import { gitCommands } from '../constants/commands.js'
const ipc = require("electron").ipcRenderer

export default {
  name: 'Welcome',
  inject: ['isLoading'],
  components: {
      Loading,
  },
    // So loading boolean is mutable, do not directily change use isLoading.value to update
  data () {
    return {
      load: false, 
      commandOpts: [],
      searchInput: "",
    }
  },
  // does not need to provide at the moment but could be helpful later
    provide() {
    return {
      isLoading: this.load
    };
  },
  mounted() {
      ipc.on('finderOpened', () => {
          console.log("finder has been opened")
          this.$router.push('/home')
      })
  },
  methods: {
      closeNavigation() {
        document.getElementById("top-navigation").style.display = "none";
      },
      async gitStarted() {
        //this.isLoading.value = true;
        ipc.send("openFinder");
        //this.isLoading.value = false;

      },

      searchCommands (input) {
          let matches = [];
          if(input.length > 2 && input !=="git") {
            for (var key in gitCommands) {
                if (key.includes(input) || gitCommands[key].includes(input)) {           
                    matches.push({command: key, desc: gitCommands[key]})
                }
            }
            this.commandOpts = matches;
          }
      }
  }
}

// to do for this component
// add time out to loading page with user feedback so if loading takes too long it stops
// check directory does not already exist
// check directory is a git repo
// move button to home page, terminal page opens after loading is complete
// add text to loading, ex "your temporary repo is being created..."

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    font-weight: bold;
    font-size: 35px;
    padding-bottom: 20px;
    padding-top: 30px;
}
h2 {
    font-size: 20px;
}

img {
    height: auto;
    width: 100%
}
.logo {
    padding: 30px 30px 0 10px;
}

.subtitle {
    padding-left: 50%;
    position: relative;
    top: -15%;
    font-style: italic;
    color: rgb(39, 39, 39);
    font-size: 175%;
    margin-bottom: 0 !important;
}

.columns {
    height: calc(100% - 5rem);
    margin: 0;
}
.top-welcome {
    background: linear-gradient(to right, #DA91E5, #9953F1 50%, #53336B);
}
.page-flex {
    width: 100%;
    height: 100%;
}


.top-directory {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.top-help {
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    padding-left: 45px;
}

.start-options {
    display: flex;
    flex-direction: column;
}

.bottom-button {
    color: white;
    padding-left: 45px;
    display: flex;
    flex-direction: column;
    padding-bottom: 45px;
}
.vl {
    border-left: 1.5px solid black;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 10%;
}
.panel {
    color: white;
    box-shadow: none;
    width: 90%
}
.panel-block {
    color: white;
    border: none;
    border-radius: 0 !important;
}

.command-blocks {
    background-color:rgba(225,225,225,0.3);
    width: 100%;
}

.help-header {
    padding-top: 45px;
    padding-left: 10px;
}

.section-header {
    padding-bottom:0px;
}

.search-comp {
    border-bottom: none !important;
}

.results {
    font-weight:500;
    font-size:20px;
}

.results-parent {
    padding-bottom: 45px;
    max-height: 75vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

div::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.faIcon {
    width: 0.7em;
    cursor: pointer;
}

/* BUTTPN CSS */
@import url('https://fonts.googleapis.com/css?family=Poppins:900i');

* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  display: flex;
  justify-content: center;
  position: relative;
  top: -25px;
  cursor: pointer;
}

.cta {
    display: flex;
    padding: 10px 30px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-size: 25px;
    color: white;
    background: #272727;
    transition: 1s;
    box-shadow: -6px 6px 0 black;
    transform: skewX(-15deg);
}

.cta:focus {
   outline: none; 
}

.cta:hover {
    transition: 0.5s;
    box-shadow: -10px 10px 0 #583575;
}


@keyframes color_anim {
    0% {
        fill: white;
    }
    50% {
        fill: #583575;
    }
    100% {
        fill: white;
    }
}

/* END BUTTON CSS */

@media only screen and (max-width: 970px) {
    .center-button {
        width: 15%;
        left: 42.5%;
        top: 60%;
    }
    .subtitle {
        font-size: 150%;
    }
}

@media only screen and (max-width: 770px) {
    h1 {
        font-size: 25px;
    }
    h2 {
        font-size: 15px;
    }
    input[type="text"] {
        font-size: 16px;
    }  
    .bottom-button {
        padding-left: 35px;
    }
    .center-button {
        width: 18%;
        left: 41%;
        font-size: 13px;
    }
     .subtitle {
         top: -10%;
        font-size: 130%;
    }

}
@media only screen and (max-width: 585px) {
    h1 {
        font-size: 20px;
    }
    h2 {
        font-size: 13px;
    }
    input[type="text"] {
        font-size: 12px;
    }  
    .bottom-button {
        padding-left: 30px;
    }
    .center-button {
        width: 20%;
        left: 40%;
        font-size: 12px;
    }
}

</style>
