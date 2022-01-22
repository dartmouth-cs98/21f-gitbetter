<template>
  <div>
    <vo-basic :data="chartData" v-on:click="handleClick" direction="l2r"></vo-basic>
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
  created() {
    let rootDir = process.cwd()
    this.chartData = this.createNode(path.basename(rootDir).replace('.GB', '').replace('.gb', ''), this.createLayer(rootDir))
  },
  methods: {
    handleClick: e => {
      alert(e);
    },
    filesOnly(root) {
      return fs.readdirSync(root, {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(item => item.name)
    },
    dirsOnly(root) {
      // need to filter directories that start with .
      // last line of this method: .filter(item => !item.startsWith('.'))
      return fs.readdirSync(root, {withFileTypes: true})
        .filter(item => item.isDirectory())
        .map(item => item.name)
    },
    createNode(name, children) {
      return {
        name: name, 
        children: children
      }
    },
    createLayer(directory) {
      let layer = []
      this.filesOnly(directory).map(item => layer.push(this.createNode(item, [])))
      this.dirsOnly(directory).map(item => layer.push(this.createNode(item, this.createLayer(directory + '/' + item))))
      return layer
    }
  }
};
</script>