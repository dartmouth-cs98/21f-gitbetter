<template>
  <div>
      <p v-if="!this.imgPath()"> Window for the git visualizations!</p>
      <img :src="this.imgPath()"/>
  </div>
</template>

<script>
export default {
  name: 'DemoViz',
  props: {
    command: String  
  },
  methods: {
    imgPath() {
        if (this.command == "git branch") {
            return require("../assets/demo/branch.png");
        } else if (this.command == "git diff") {
            return require("../assets/demo/diff.png");
        } else if (this.command == "git status") {
            return require("../assets/demo/status.png");
        } else if (this.command == "git log") {
            return require("../assets/demo/log.png");
        } else if (this.command.startsWith("git checkout -b")) {
            return require("../assets/demo/checkout.png");
        } else if (this.command.startsWith("git commit")) {
            return require("../assets/demo/commit.png");
        } else if (this.command.startsWith("git pull")) {
            return require("../assets/demo/pull.png");
        } else {
            return;
        }
    }
  }
}
</script>
