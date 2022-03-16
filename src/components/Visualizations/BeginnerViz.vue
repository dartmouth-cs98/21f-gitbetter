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
        if (this.command == "git clone https://github.com/dartmouth-cs98/GitBetterTestRepository.git") {
            this.source = require("../../assets/demo/begclone.png")
        } else if (this.command == "git checkout -b my_branch") {
            this.source = require("../../assets/demo/begcheckoutnewbranch.png")
        } else if (this.command == "git branch") {
            this.source = require("../../assets/demo/begbranch.png")
        } else if (this.command == "git add finder.py") {
            this.source = require("../../assets/demo/begaddupdate.png")
        } else if (this.command == "git commit -m 'Update to merging.py and added finder.py'") {
            this.source = require("../../assets/demo/begcommitupdate.png")
        } else if (this.command == "git log") {
            this.source = require("../../assets/demo/beglogupdate.png")
        } else if (this.command == "git push") {
            this.source = require("../../assets/demo/begpushupdate.png")
        } else if (this.command == "git checkout main") {
            this.source = require("../../assets/demo/begcheckoutmainupdate.png")
        } else if (this.command == "git pull") {
            this.source = require("../../assets/demo/begpullupdate.png")
        }
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