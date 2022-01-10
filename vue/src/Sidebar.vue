<template>
    <div class="sidebar">
        <div> 
          <b>{{this.dirRoot()}}</b>
        </div>
      <File v-for="file in files" :filename="file" :key="file.id" />
      <Directory v-for="direc in directories" :key="direc.id" :dirname="direc" :pathname="pathToString()"/>
    </div>
</template>

<script>
import Directory from './Directory.vue';
const fs = require('fs-extra');
const path = require('path');
import File from './File.vue'

export default {
  components: { Directory, File },
  name: 'Sidebar',
  data () {
    return {
      dir: process.cwd(),
      files: [],
      directories: [],
      file: "",
    }
  },
  created(){
    this.filesOnly(this.dir);
    this.dirsOnly(this.dir);
  },
  methods: {
    dirRoot () {
      return path.basename(process.cwd()).toUpperCase().replace('.GB', '');
    },
    pathToString () {
      return process.cwd().toString();
    },
    filesOnly(root) {
      let fileNames = fs.readdirSync(root, {withFileTypes: true})
      .filter(item => !item.isDirectory())
      .map(item => item.name)
      this.files = fileNames;
    },
    dirsOnly(root) {
      let dirNames = fs.readdirSync(root, {withFileTypes: true})
      .filter(item => item.isDirectory())
      .map(item => item.name)
      this.directories = dirNames;
    }
  }
}
</script>
<style lang="scss" scoped>
  .sidebar {
      background-color: #272727;
      color: white;
      border-color: green;
      padding: 5%;
      height: 100%;
      border-width: 1px;
      border-style: solid;
      overflow: auto;
      max-height: 95%;
  }
  b, div {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
    overflow: hidden;
  }
</style>