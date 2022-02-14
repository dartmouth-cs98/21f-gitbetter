<template>
  <div class="sidebar" :key="this.dir">
      <div class="header"> 
        <font-awesome-icon id="closing-icon" v-on:click="closeDirectories" class="faIcon" icon="folder"/>
        <b>{{this.dirRoot()}}</b>
      </div>
    <File v-for="file in files" :filename="file" :key="file.id" />
    <Directory v-for="direc in directories" :key="direc.id" :dirname="direc" :pathname="pathToString()"/>
  </div>
</template>

<script>

const fs = require('fs-extra');
const path = require('path');
const ipc = require("electron").ipcRenderer
import Directory from './Directory.vue';
import File from './File.vue'

export default {
  components: {
    Directory,
    File,
  },
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
  mounted() {
    ipc.on('giveFilePath', (event, pwd) => {
      this.dir = pwd;
      this.filesOnly(this.dir)
      this.dirsOnly(this.dir)  
    })
  },
  methods: {
    closeDirectories (){
      console.log("Closing directories");
      if (document.getElementById("sidebar") == null || document.getElementById("open-side-bar") == null || document.getElementById("top-wrapper") == null){
        return
      }
      document.getElementById("sidebar").style.display = "none";
      document.getElementById("open-side-bar").style.display = "block";
      document.getElementById("top-wrapper").style.maxWidth = "none";
    },
    dirRoot () {
      return path.basename(this.dir).toUpperCase().replace('.GB', '');
    },
    pathToString () {
      return this.dir.toString();
    },
    filesOnly(root) {
      this.files = fs.readdirSync(root, {withFileTypes: true})
        .filter(item => !item.isDirectory())
        .map(item => item.name)
    },
    dirsOnly(root) {
      this.directories = fs.readdirSync(root, {withFileTypes: true})
        .filter(item => item.isDirectory())
        .map(item => item.name)
    }
  }
}
</script>
<style lang="scss" scoped>
  .header{
    padding-left: 0px;
    display:flex;
    flex-direction: row;
    align-items: center;
  }
  .sidebar {
      background-color: #272727;
      color: white;
      border-color: green;
      padding: 5%;
      height: 100%;
      border-width: 1px;
      border-style: solid;
      overflow: auto;
  }
  b, div {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    padding-left: 4%;
  }
</style>