
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
// var run_command = require('../../run_command');


// var os = require('os');
// var pty = require('node-pty');
//Vue.use(shell);

export default {
  data() {
    return {
      responses: ['Run: git clone https://github.com/dartmouth-cs98/GitBetterTestRepository.git', 
      'Run: git checkout -b', 
      'Run: git commit -m "My first commit!"', 
      'Run: git push', 
      'Run: git pull', 
      'Run: git add'],
      prompts: ["\nReady to start learning GitHub? \nGet started by cloning the repository that you see on the left.", 
      "Now, create a new branch called my_branch.", "Get started by creating a new branch called my_branch.", 
      'Now, assume that you have made some changes to the file "Merging.py". Create a commit with the message: My first commit!', 
      "Now that you have made a commit, push this commit to the main branch so that your updates to the code can be integrated into everyone else's.", 
      "Now, everyone will have the changes that you made in their code. Now, someone else has just pushed their own code, so you need to pull the changes so that your branch is up to date. Pull from GitHub.", 
      "Success! You have just pulled the new changes from GitHub, and your repository is up to date. Now, you have just created a new file called 'beginner.py'. Add this file so that the next time you make a commit it will be included.", 
      "Great! You have just added a file to your commit. You are ready to begin using GitHub!"],
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
 