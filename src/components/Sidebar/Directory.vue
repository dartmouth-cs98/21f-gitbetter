
<template>
<div class="directory" >
    <div v-on:click="toggleShow">
        {{this.getPadding}} <font-awesome-icon :icon="['fas', this.dirIcon]"/> {{this.dirname}}
    </div>
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
      dirIcon: 'chevron-right',
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
        if(this.firstClick) {
            this.filesOnly(this.name);
            this.dirsOnly(this.name);
            this.firstClick = false;
        }
        this.show = !this.show;
        if(this.show) {
            this.dirIcon = 'chevron-down';
        } else {
            this.dirIcon = 'chevron-right';
        }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.directory{
  padding-left: 4%;
  background-color: #272727;
}

</style>