<template>
    <div class="sidebar ml-0">
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
      return path.basename(process.cwd()).toUpperCase();
    },
    pathToString () {
      console.log("Process path", process.cwd().toString());
      return process.cwd().toString();
    },
    // readDirectory() {
    //   fs.readdir(this.dir, (err, dir) => {
    //     this.files = dir
    //   })
    // },
    // displayDirectory(){
    //   fs.readdir(this.dir, (err, dir) => {
    //   this.files = dir
    //   })
    // },
    // getNestedDirs (dir, files_) {
    //   files_ = files_ || [];
    //   var files = fs.readdirSync(dir);
    //   for (var i in files){
    //       var name = dir + '/' + files[i];
    //       if (fs.statSync(name).isDirectory()){
    //           this.getNestedDirs(name, files_);
    //       } else {
    //           files_.push(name);
    //       }
    //   }
    //   console.log(files);
    //   //return files_;
    //   this.directories[dir] = files;
    // },
    filesOnly(root) {
      let fileNames = fs.readdirSync(root, {withFileTypes: true})
      .filter(item => !item.isDirectory())
      .map(item => item.name)
      this.files = fileNames;
      console.log("File names", fileNames)

    },
    dirsOnly(root) {
      let dirNames = fs.readdirSync(root, {withFileTypes: true})
      .filter(item => item.isDirectory())
      .map(item => item.name)
      this.directories = dirNames;
      console.log("Dir names", dirNames)
    }
  }
}
</script>
<style lang="scss" scoped>
  .sidebar {
      background-color: #f3e5f5;
      padding: 5%;
      border-color: black;
      border-width: 1px;
      border-style: solid;
  }
</style>