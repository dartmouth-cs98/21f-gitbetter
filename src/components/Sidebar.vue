<template>
    <div class="sidebar ml-0">
        <div> 
          <b>Project Structure:</b>
        </div>
        <button @click="readDirectory">Press Here</button>
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
      dir:'C:/Users/GWC-NYC-13/21f-gitbetter',
      files:[],
      file:"",

    }
  },
  methods: {
    readDirectory() {
      fs.readdir(this.dir, (err, dir) => {
      console.log(dir);
      for(let filePath of dir)
      console.log(filePath)
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