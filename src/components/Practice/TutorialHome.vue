
<template>
    <div class="beginner-tutorial">
        <div class="subtitle">{{this.prompts[this.i]}}</div>
        <div class="error" v-if="wrongStatus">{{ this.wrong }}</div>
        <div class="error" v-else></div>
        <div class="command">{{this.responses[this.i]}}</div>
        <form v-show="i<responses.length">
          <textarea class="textarea is-large my-5 has-fixed-size" rows="3" type="text" placeholder="Your command here!" v-model="source" />
          <div class="button-wrap">
            <div class="button" @click="newSource(source)"> Run the command </div>
          </div>
          <!-- <div style = "position: relative; left: 80px"> -->
        </form>
        <div v-show="i==responses.length" class="button-wrap">
            <div class="button" @click="resetTutorial()"> Start over! </div>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      responses: ['Run: git clone https://github.com/dartmouth-cs98/GitBetterTestRepository.git', 
      'Run: git checkout -b my_branch', 
      'Run: git branch',
      'Run: git add merging.py',
      "Run: git commit -m 'Update to merging.py'", 
      'Run: git log',
      'Run: git push',
      'Run: git checkout main', 
      'Run: git pull'],
      prompts: ["\nReady to start learning GitHub? \nGet started by cloning the repository that you see on the left.", 
      "Now, create a new branch called my_branch.", 
      "You have just created a new branch. Run the git branch command to see all of the branches that you have as well as which branch you are on.",
      "Now, assume that you have made some changes to the file merging.py. You will eventually want to add the updates you made to this file to the main branch. To do this, you need to add the file to the staging area. When you do this, GitHub essentially saves a copy of the file that you add with all of the changes you made.", 
      "Once GitHub has created a snapshot of your updated merging.py file, you can wrap this snapshot into a commit which you can eventually push to the main branch. The commit is given a descriptive title that describes the new or updated files which it contains. Create a commit with the message: Update to merging.py", 
      "You have just made a commit containing your staged files which are the files you want to push to the main branch. To see a list of all of the commits that you have made, run git log, which gives an overview of your activity.",
      "Now that you have made a commit, push this commit to the main branch so that your updates to the code can be integrated into the GitHub repository so everyone else can see them.", 
      "Now, assume your changes were just approved. This means that you can merge your changes into the repository on GitHub. Once you do this, other users will run git pull to merge your updated code with theirs. Since your main branch is your copy of the GitHub repository, you need to move to your main branch so that you can pull the new changes. You can switch from one branch to another by running git checkout <name of branch you want to switch to>.",
      "Now, run git pull so that the changes you made on 'my_branch' are merged into main.", 
      "Success! You have just pulled the new changes from GitHub into your main branch. You will also run git pull whenever anyone else pushes code to the GitHub repository so that you can keep your branches up to date. These are the basic steps for using GitHub. You are now ready to begin trying on your own!"],
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
          this.source = "";
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

<style scoped>

.beginner-tutorial {
    color: white;
    margin: 12px;
}

.subtitle {
    color: white !important;
    font-size: 1.5rem !important;
    text-align: center;
    margin-top: 1.5rem;
    min-height: 8rem;
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
 