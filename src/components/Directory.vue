
<template>
<div v-on:click="toggleShow">
    <p class="">
        {{this.getPadding}} {{this.dirIcon}} {{this.dirname}}
    </p>
    <div v-show="show">
        <File v-for="file in files" :filename="file" :key="file.id" :padding="getPadding"/>
        <Directory v-for="direc in directories" :key="direc.id" :dirname="direc" :pathname="name" :padding="getPadding" />
    </div>
</div>
</template>

<script>
import File from './File.vue'
const fs = require('fs-extra');

export default {
  name: 'Directory',
  components: {
    File,
  },
  props: {
      dirname: String,
      pathname: String,
      padding: {
        default: "",
        type: String
      },
  },
  data () {
    return {
      name: this.pathname + '/' + this.dirname,
      files: [],
      directories: [],
      show: false,
      dirIcon: '>',
      firstClick: true,
    }
  },
  computed: {
      getPadding() {
          return this.padding + '\t';
      }
  },
  methods: {
    filesOnly(root) {
      let fileNames = fs.readdirSync(root, {withFileTypes: true})
      .filter(item => !item.isDirectory())
      .map(item => item.name)
      
      console.log("File names", fileNames)
      this.files = fileNames;

    },
    dirsOnly(root) {
      let dirNames = fs.readdirSync(root, {withFileTypes: true})
      .filter(item => item.isDirectory())
      .map(item => item.name)
      
      console.log("Dir names", dirNames)
      this.directories = dirNames;
    },
    toggleShow() {
        console.log("Toggled! < 3", this.show);
        if(this.firstClick) {
            this.filesOnly(this.name);
            this.dirsOnly(this.name);
            this.firstClick = false;
        }
        this.show = !this.show;
        if(this.show) {
            this.dirIcon = 'V';
        } else {
            this.dirIcon = '>';
        }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Material+Icons");

</style>