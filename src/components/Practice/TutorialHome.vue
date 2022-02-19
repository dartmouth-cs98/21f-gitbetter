// Adapted from: https://vuejsexamples.com/component-vuejs-to-simulate-a-terminal/
<template>
    <div class="beginner-tutorial">
        <div class="subtitle">{{this.prompts[this.i]}}</div>
        <div >{{this.responses[this.i]}}</div>
        <form>
          <input class="input is-large" type="text" placeholder="Your command here!" v-model="source" />
          <button @click="$emit('updateSrc', source)"> Run the command </button>
          <!-- <div style = "position: relative; left: 80px"> -->
        </form>
    </div>
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
      responses: ['Run: git clone https://github.com/dartmouth-cs98/GitBetterTestRepository.git', 'git checkout -b', 'git commit -m "My first commit!"', 'git push', 'git pull', 'git add'],
      prompts: ["\nReady to start learning GitHub? \nGet started by cloning the repository that you see on the left. The command to clone a repository is: git clone <url for repository>", "Great! You have now copied all of these files onto your own device. Now, open a new branch so that you can edit the files.", "Get started by creating a new branch called my_branch.", 'Great! You just created a new branch. Now, assume that you have made some changes to a file in your repository. Now, make a commit with the message: My first commit!", "Success! You have just made your first commit. Now, push your commit so that it can be merged into the main repository.", "Success! You have now pushed the changes that you made into the main repository which everyone will be able to see. Now, someone else has just pushed their own code, so you need to pull the changes so that your branch is up to date. Pull from GitHub.", "Success! You have just pulled the new changes from GitHub, and your repository is up to date. Now, add a file to a commit.", "Success! You have just added a file to your commit. You are ready to begin using GitHub!'],
      i: 0, 
      wrong: "Close! Keep trying :)", 
    };
  },
  mounted () {
    this.makeScript();
  },
  methods: {


  }
};
</script>

<style>
/* @import '../../node_modules/xterm/css/xterm.css';
@import "../../node_modules/vue-notion/src/styles.css"; */

.beginner-tutorial {
    color: white;
    margin: 12px;
}

.subtitle {
    color: white;
}

/* .button {
    margin: 12px; 
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
} */

</style>
 