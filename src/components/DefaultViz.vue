<template>
  <div>
    <vo-basic :data="chartData" v-on:click="handleClick"></vo-basic>
  </div>
</template>
 
<script>
import { VoBasic } from "vue-orgchart";
import "vue-orgchart/dist/style.min.css";
const path = require('path');
const fs = require('fs-extra');

export default {
  name: 'DirectoryTree',
  components: { VoBasic },
  data () {
    return {
      dir: process.cwd(),
      files: [],
      directories: [],
      file: "",
    }
  },
  created() {
    this.chartData = {
      name: path.basename(process.cwd()).replace('.GB', ''),
      children: []
    };
    this.dirsOnly(this.dir)
    this.filesOnly(this.dir)
    this.directories.map(item => this.chartData.children.push({name: item, children: []}))
    this.files.map(item => this.chartData.children.push({name: item, children: []}))

  },
  methods: {
    handleClick: e => {
      alert(e);
    },
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
    }
  }
};
</script>