<template>
  <div class="main top-welcome">
      <div class="page-flex">        
                <div class="logo">
                    <div>
                        <img src="../assets/logo.png" />
                        <p class="subtitle learning">Git, simplified.</p>
                    </div>
                </div>

                    <div class="buttons-flex">
                        <div class="blurb">
                            <div class="blurb-title">
                                Familiar with Git? 
                            </div>
                            <div class="blurb-title">
                                Try GitBetter!
                            </div>
                            <div class="tool-desc">
                            GitBetter is a tool for people who know how to use git, but who sometimes struggle with git or are worried about lasting repercussions to their project. 
                            Our terminal is a sandbox that allows you to test git commands before applying changes to your git repository. 
                            Ready to Git Started? Click the button below.
                            </div>
                        <div class="wrapper" v-on:click="gitStarted" >
                            <div class="cta">
                                <span>Git Started</span>                            
                            </div>
                        </div>
                        </div>
                      <div class="vl"></div>
                        <div class="blurb">
                            <div class="blurb-title">
                                Never used Git before? 
                            </div>
                            <div class="blurb-title">
                                Try GitLearning!
                            </div>
                            <div class="tool-desc">
                            GitLearning is a tool for people who never/rarely used Github before. GitLearning has walkthroughs for the common 
                            workflows you'll see while using Github as a developer, and can get you up to speed with the tools you need 
                            to figure them out. 
                            </div>
                            <div class="wrapper" @click="$router.push('/beginner')">
                            <div class="cta">
                                <span>Git Learning</span>                            
                            </div>
                        </div>
                        </div>
                        
                </div>
        </div>
      <loading />
  </div>
</template>

<script>

import Loading from './Loading.vue'
//import replicate from '../../replicate_repo_test.js'
// import { gitCommands } from '../constants/commands.js'
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
        if (this.$router.currentRoute.path != '/home') {
            this.$router.push('/home');
        }
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
    width: 60%;
    margin: 0 22%;
}
.logo {
    padding: 60px 30px 0 10px;
    min-height: 50%;
}

.tool-desc {
    color: white;
    padding: 3%;
    height: 60%;
}
.learning {
    padding-left: 51%;
    position: relative;
    top: -3rem;
    font-style: italic;
    color: rgb(39, 39, 39);
    font-size: 165%;
    margin-bottom: 7%;
}

.blurb { 
    width: 45%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.blurb-title {
    color: white;
    margin: 0 auto;
    font-weight: 800;
    font-size: 20px;
}

.buttons-flex {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    height: 55%;

}

.vl {
    border-left: 1.5px solid black;
    height: 40%;
    position: absolute;
    top: 50%;
}


.top-welcome {
    background: linear-gradient(to right, #DA91E5, #9953F1 50%, #53336B);
}
.page-flex {
    width: 100%;
    height: 100%;
}

.bottom-button {
    color: white;
    padding-left: 45px;
    display: flex;
    flex-direction: column;
    padding-bottom: 45px;
}
hr {
    background-color: black;
    margin: 8px 36px;
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
    .cta {
    display: flex;
    padding: 7px 21px;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    color: white;
    background: #272727;
    transition: 1s;
    box-shadow: -6px 6px 0 black;
    transform: skewX(-15deg);
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
         top: -1.5rem;
        font-size: 130%;
    }
    .tool-desc {
        font-size: 0.85rem;
    }
     .logo {
        padding: 60px 30px 0 10px;
        min-height: 42%;
    }
    .blurb {
        min-height: 95%;
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
    .tool-desc {
        color: white;
        padding: 3%;
        min-height: 100%;
        margin-bottom: 30px;
    }
    .logo {
        padding: 60px 30px 0 10px;
        min-height: 32%;
    }
    .blurb {
        height: 80%;
    }
}

</style>
