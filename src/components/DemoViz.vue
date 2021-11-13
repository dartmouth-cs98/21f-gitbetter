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
        switch (this.command) {
            case "git branch":
                return require("../assets/demo/branch.png");
            case "git diff":
                return require("../assets/demo/diff.png");
            case "git status":  
                return require("../assets/demo/status.png");  
            case "git log":  
                return require("../assets/demo/log.png");  
            default:
                return;    
        }
    }
  }
}
</script>
