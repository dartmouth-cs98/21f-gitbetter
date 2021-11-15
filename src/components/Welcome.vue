<template>
  <div class="main top-welcome">
      <div class="page-flex">
      <div class="top-directory">
          <div class="start-box">
              <h1>Start</h1>
              <h2>+ Create new file</h2>
              <h2>+ Open file</h2>
              <h2>+ Clone git repository</h2>
              <h1/>
              <h1>Recent</h1>
              <h2>+ CS98 GitBetter</h2>
          </div>
      </div>
      <div class="vl"></div>
     
      <div class= "top-help" style="padding-left:45px;">
              <nav class="panel" style="box-shadow:none;">
                <h1 class="help-header"> Search for commands... </h1>
                <div class="panel-block" style="border-bottom:none;">
                    <p class="control has-icons-left">
                        <input class="input" type="command" v-model="searchInput" @input="searchCommands(searchInput)" placeholder="How do I do this?">
                        <span class="icon is-small is-left">
                            <font-awesome-icon icon="search"/> 
                        </span>
                    </p>
                </div>
                <div class="panel-block" style="font-weight:500;font-size:20px;" v-if="commandOpts.length > 1">
                    {{ commandOpts.length }} results found...
                </div>
                <div class="panel-block" style="font-weight:500;font-size:20px;" v-if="commandOpts.length == 1">
                    {{ commandOpts.length }} result found...
                </div>
                <div v-for="match in commandOpts" :key="match.id" class="panel-block" style="background-color:rgba(225,225,225,0.3);">
                    {{ match.command }}: {{ match.desc }}
                </div>
              </nav>
      </div>
      
      </div>
      <img src="../assets/logo.png" />
      <button 
        @click="$router.push('/home')"
        v-on:click="gitStarted"
        class="center-button button"
        >
           Git Started
      </button>
      <loading />
  </div>
</template>

<script>

import Loading from './Loading.vue'
import { gitCommands } from '../assets/commands.js'

var replicate_repo = require('../../replicate_repo')

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
  methods: {
      closeNavigation() {
        document.getElementById("top-navigation").style.display = "none";
      },
      async gitStarted() {
        this.isLoading.value = true;
        await replicate_repo.replicate()
        process.chdir('../GitBetterTestRepository.gb');
        this.isLoading.value = false;
      },
      searchCommands (input) {
          let matches = [];
          if(input.length > 2) {
            for (var key in gitCommands) {
                if (key.includes(input) || gitCommands[key].includes(input)) {           
                    console.log(key, gitCommands[key]);
                    matches.push({command: key, desc: gitCommands[key]})
                }
            }
            console.log("Matches", matches);
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
input[type="text"] {
    padding: 10px;
    width: 80%;
    border-radius: 20px;
    font-size: 18px;
    font-style: italic;
    border-color: #1A61EB;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
img {
    position: absolute;
    top: 40%;
    left: 30%;
    width: 40%;
}
.columns {
    height: 100%;
}
.top-welcome {
    background: linear-gradient(to right, #DA91E5, #9953F1 50%, #53336B);
}
.page-flex {
    display: flex;
    width: 100%;
    height: 100%;
}
.top-directory {
    width: 50%;
}
.top-help {
    width: 50%;
}
.center-button {
    position: absolute;
    top: 65%;
    left: 44%;
    padding: 10px 15px;
    background-color: white;
    border-color: #4200FF;
    font-weight: 650;
    cursor: pointer;
}
.center-button:hover {
    color: rgb(0, 0, 0);
    box-shadow: 0 10px 20px rgba(209, 161, 244, 0.4);
}
.start-box {
    color: white;
    padding-left: 45px;
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
}
.panel-block {
    color: white;
    border: none;
    border-radius: 0 !important;
}
.help-header {
    padding-left: 10px;
}

@media only screen and (max-width: 970px) {
    .center-button {
        width: 15%;
        left: 42.5%;
        top: 60%;
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
    .start-box {
        padding-left: 35px;
    }
    .center-button {
        width: 18%;
        left: 41%;
        font-size: 13px;
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
    .start-box {
        padding-left: 30px;
    }
    .center-button {
        width: 20%;
        left: 40%;
        font-size: 12px;
    }
}

</style>
