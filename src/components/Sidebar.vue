<template>
    <div class="sidebar ml-0">
        <div> 
          <b>Project Structure: {{this.dir}}</b>
        </div>
    <v-btn  v-for="file in files" :key="file.id">
    {{file}}
 </v-btn>   
    </div>
</template>

<script>
const fs = require('fs-extra')
export default {
  name: 'Sidebar',
  data () {
    return {
      dir: process.cwd(),
      files:[],
      file:"",

    }
  },
  // created is the equivalent to componentDidMount
  created(){
    console.log("it was created!")
    this.readDirectory()
  },
  methods: {
    readDirectory() {
      fs.readdir(this.dir, (err, dir) => {
      console.log(dir);
      for(let filePath of dir)
      console.log(filePath)
      console.log(__dirname);
      console.log(process.cwd())
      this.files = dir
      })
    },
    displayDirectory(){
      fs.readdir(this.dir, (err, dir) => {
      console.log(dir);
      for(let filePath of dir)
      console.log(filePath)
      this.files = dir
      })
    }
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
</style>