<template>
    <div class="sidebar ml-0">
        <div> 
          <b>Project Structure: {{this.dir}}</b>
        </div>

          <md-list class="list">
            <md-list-item  class="file" v-for="file in files" :key="file.id">{{file}}</md-list-item>
          </md-list>
          
    </div>
</template>

<script>
const fs = require('fs-extra'),
path = require('path');
export default {
  name: 'Sidebar',
  data () {
    return {
      dir: process.cwd(),
      files:[],
      file:"",
      all_files:[],

    }
  },
  // created is the equivalent to componentDidMount
  created(){
    console.log("it was created!")
    this.readDirectory(this.dir)
  },
  methods: {
    readDirectory(directory) {
      var files = fs.readdirSync(directory)
      for (var i in files){
        var next = path.join(directory, files[i])
        console.log(next)
        if (fs.lstatSync(next).isDirectory() == true){
          if (files[i] == 'node_modules'){
            console.log("Skipping node_module folder")
          }
          else{
            this.readDirectory(next)
          }
        }
      }
      fs.readdir(directory, (err, dir) => {
      console.log(dir);
      for(let filePath of dir)
      console.log(filePath)
      // console.log(__dirname);
      console.log(process.cwd())
      this.files = dir
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .sidebar {
      height: 100%;
      background-color: #FAE5DF;
      padding: 5%;
      border-color: black;
      border-width: 1px;
      border-style: solid;
  }

  .file {
    background-color: #FAE5DF;
    // min-height: 0px;
  }
  
  .md-list-item-.md-list-item-content.md-ripple.md-disabled {
    min-height: 0px;
  }
  .list{
    padding: 0
  }

</style>