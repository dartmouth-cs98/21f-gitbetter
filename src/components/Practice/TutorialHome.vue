
<template>
    <div class="beginner-tutorial">
        <div class="subtitle">{{this.prompts[this.i]}}</div>
        <div class="error" v-if="wrongStatus">{{ this.wrong }}</div>
        <div class="error" v-else></div>
        <div class="command">{{this.responses[this.i]}}</div>
        <form v-show="i<responses.length">
          <input class="input is-large my-5" type="text" placeholder="Your command here!" v-model="source" />
          <div class="button-wrap">
            <button class="button" @click="newSource(source)"> Run the command </button>
          </div>
          <!-- <div style = "position: relative; left: 80px"> -->
        </form>
        <div v-show="i==responses.length" class="button-wrap">
            <button class="button" @click="resetTutorial()"> Start over! </button>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      responses: ['Run: git clone https://github.com/dartmouth-cs98/GitBetterTestRepository.git', 
      'Run: git checkout -b my_branch', 
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
      source: "",
      wrongStatus: false,
    };
  },
  methods: {
    newSource(src) {
      let res = this.responses[this.i].slice(5)
      if(src == res) {
          this.wrongStatus = false;
          this.$emit('updateSrc', src);
          this.i += 1;
      }
      else {
        this.wrongStatus = true;
      }
     
    },
    resetTutorial() {
      this.i = 0;
      this.source = ""
      this.$emit('updateSrc', this.source);
    }

  }
};
</script>

<style>

.beginner-tutorial {
    color: white;
    margin: 12px;
}

.subtitle {
    color: white !important;
    font-size: 1.5rem !important;
    text-align: center;
    margin-top: 1.5rem;
}

.button-wrap {
  display: flex;
  justify-content: center;
}

.command {
  font-size: 1.1rem !important;
  text-align: center;
  color: #dbdbdb !important;
}

.error {
  text-align: center;
  color: #ff2c2c;
  font-size: 1.2rem;
  min-height: 50px;
}

.button {
    background-color: #AD47BC !important;
    color: white !important;
}

</style>
 