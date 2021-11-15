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
            return require("../assets/demo/branch-dark.png");
        } else if (this.command == "git diff") {
            return require("../assets/demo/diff-dark.png");
        } else if (this.command == "git status") {
            return require("../assets/demo/status-dark.png");
        } else if (this.command == "git log") {
            return require("../assets/demo/log-dark.png");
        } else if (this.command.startsWith("git checkout -b")) {
            return require("../assets/demo/checkout-dark.png");
        } else if (this.command.startsWith("git commit")) {
            return require("../assets/demo/commit-dark.png");
        } else if (this.command.startsWith("git pull")) {
            return require("../assets/demo/pull-dark.png");
        } else {
            return;
        }
    }
  }
}
</script>
