<template>
  <div class="image-wrapper" >
      <p style="margin-top:25%;" v-if="!this.source"> Window for the git visualizations!</p>
      <img :src="this.source" style="padding:5%;"/>
      <!-- <img :src="imgPath()" /> -->
  </div>
</template>

<script>
export default {
  name: 'DemoViz',
  props: {
    command: String  
  },
  data() {
      return {
          source: require("../../assets/demo/clonerepo.png"),
      }
  },
  watch: {
      command: function() {
          this.imgPath();
      }
  },
  methods: {
    imgPath() {
        // if (this.command == "") {
        //     return require ("../../assets/demo/openingrepo.png");
        // } 
        // if (this.command == "") {
        //     return require("../../assets/demo/clonerepo.png")
        // }
        if (this.command == "git clone https://github.com/dartmouth-cs98/GitBetterTestRepository.git") {
            this.source = require("../../assets/demo/begclone.png")
        } else if (this.command == "git checkout -b my_branch") {
            this.source = require("../../assets/demo/begcheckoutnewbranch.png")
        } else if (this.command == "git branch") {
            this.source = require("../../assets/demo/begbranch.png")
        } else if (this.command == "git add merging.py") {
            this.source = require("../../assets/demo/begadd.png")
        } else if (this.command == "git commit -m 'Update to merging.py'") {
            this.source = require("../../assets/demo/begcommitupdate.png")
        } else if (this.command == "git log") {
            this.source = require("../../assets/demo/beglog.png")
        } else if (this.command == "git checkout main") {
            this.souce = require("../../assets/demo/begcheckoutmain.png")
        } else if (this.command == "git push") {
            this.source = require("../../assets/demo/begpushupdate.png")
        }
        // } else if (this.command == "git branch") {
        //     this.source = require("../../assets/demo/branch-dark.png");
        // } else if (this.command == "git diff") {
        //     this.source = require("../../assets/demo/diff-dark.png");
        // } else if (this.command == "git status") {
        //     this.source = require("../../assets/demo/status-dark.png");
        // } else if (this.command == "git log") {
        //     this.source = require("../../assets/demo/log-dark.png");
        // } else if (this.command == "git fetch") {
        //     this.source = require("../../assets/demo/fetch-dark.png");
        // } else if (this.command == "git push") {
        //     this.source = require("../../assets/demo/push-remote-dark.png");
        // } else if (this.command == "git branch -u origin/master") {
        //     this.source = require("../../assets/demo/origin-master-dark.png");
        // } else if (this.command == "gitbetter visualize") {
        //     this.source = require("../../assets/demo/visualize-remote-dark.png");
        // } else if (this.command.startsWith("git checkout -b")) {
        //     this.source = require("../../assets/demo/checkout-remote-dark.png");
        // } else if (this.command.startsWith("git commit")) {
        //     this.source = require("../../assets/demo/commit-remote-dark.png");
        // } else if (this.command.startsWith("git pull")) {
        //     this.source = require("../../assets/demo/pull-dark.png");
        // } else if (this.command.startsWith("git revert")) {
        //     this.source = require("../../assets/demo/revert-remote-dark.png");
        // } else {
        //     this.source = "";
        // }
    }
  }
}
</script>
<style scoped>
.image-wrapper {
    justify-content:center;
    overflow-y: scroll;
    overflow-x: scroll;
    height: calc(100% - 5rem - 72px);
}

.image-wrapper::-webkit-scrollbar {
    display: none;
}
</style>