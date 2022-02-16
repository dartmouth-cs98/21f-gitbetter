// Adapted from: https://vuejsexamples.com/component-vuejs-to-simulate-a-terminal/
<template>
  <div id="tutorialterminal"></div>
</template>

<script>
// import Vue from "vue";
// import shell from 'vue-shell';
// import replicate from '../../replicate_repo.js';
// let xterm = require('../../node_modules/xterm/lib/xterm.js')
// var run_command = require('../../run_command');


// var os = require('os');
// var pty = require('node-pty');
//Vue.use(shell);

export default {
  data() {
    return {
      // send_to_terminal: '',
      process: Object,
      fitObj: Object,
      responses: ['git -checkout -b', 'git commit -m "My first commit!"', 'git push', 'git pull', 'git add'],
      prompts: ["\nReady to start learning GitHub? \nGet started by creating a new branch called my_branch.", "Great! You just created a new branch. Now, let's assume that you have made some changes to a file in your repository. Now, make a commit with the message, 'My first commit!'", "Success! You have just made your first commit. Now, push your commit so that it can be merged into the main repository.", "Success! You have now pushed the changes that you made into the main repository which everyone will be able to see. Now, someone else has just pushed their own code, so you need to pull the changes so that your branch is up to date. Pull from GitHub.", "Success! You have just pulled the new changes from GitHub, and your repository is up to date. Now, add a file to a commit.", "Success! You have just added a file to your commit. You are ready to begin using GitHub!"],
      i: 0, 
      wrong: "Close! Keep trying :)", 
    };
  },
  mounted () {
    this.makeScript();
  },
  created() {
    window.addEventListener("resize", this.resizeTerm);
    this.$parent.$on('openVisualization', this.resizeTerm);
    this.$parent.$on('closeVisualization', this.resizeTerm);

  },
  
  methods: {
    makeScript() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', "https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.js")
      document.head.appendChild(recaptchaScript)

    },

    resizeTerm() {
      try {
        this.fitObj.fit();
      }
      catch(error) {
        console.log(error);
      }
    },

  }
};
</script>

<style>
/* @import '../../node_modules/xterm/css/xterm.css';
@import "../../node_modules/vue-notion/src/styles.css"; */



#terminal {
  overflow: scroll;
  height: calc(100% - 72px);
}

#tutorialterminal {
    overflow: scroll;
    margin-left: 20px;
}

#terminal::-webkit-scrollbar {
  display: none;
}

pre {
  background-color: black !important;
  color: white !important;
  font-size: 1em !important;
  width: inherit !important;
}
</style>
