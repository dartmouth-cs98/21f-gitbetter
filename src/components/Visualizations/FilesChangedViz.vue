<template>
  <div class='default-layout'>
      Commits: ready to push to GitHub
      <div class='file-box'>
          <!-- Files -->
      </div>
      Staging: what you want pushed to GitHub
      <div class='file-box'>
          <p v-for="file in this.files.filesStaging.filesModified" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesStaging.filesAdded" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesStaging.filesUntracked" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesStaging.filesRenamed" :key="file[1]">{{file[0]}} -> {{file[1]}}</p>
          <p v-for="file in this.files.filesStaging.filesCopied" :key="file[1]">{{file[0]}} -> {{file[1]}}</p>
          <p class="file-deleted" v-for="file in this.files.filesStaging.filesDeleted" :key="file">{{file}}</p>
      </div>
      Local: your current copy
      <div class='file-box'>
          <p v-for="file in this.files.filesLocal.filesModified" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesLocal.filesAdded" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesLocal.filesUntracked" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesLocal.filesRenamed" :key="file[1]">{{file[0]}} -> {{file[1]}}</p>
          <p v-for="file in this.files.filesLocal.filesCopied" :key="file[1]">{{file[0]}} -> {{file[1]}}</p>
          <p class="file-deleted" v-for="file in this.files.filesLocal.filesDeleted" :key="file">{{file}}</p>
      </div>
      <div class='commit-flow'>
          <div v-bind:class="this.command.startsWith('git add') ? 'highlight-text' : 'commit-flow-text'">
              git add
          </div>   
          <font-awesome-icon icon='chevron-right'/> 
          <div v-bind:class="this.command.startsWith('git commit') ? 'highlight-text' : 'commit-flow-text'">
              git commit
          </div>  
          <font-awesome-icon icon='chevron-right'/> 
          <div v-bind:class="this.command.startsWith('git push') ? 'highlight-text' : 'commit-flow-text'">
              git push
          </div>  
      </div>    
  </div>
</template>
 
<script>
const ipc = require("electron").ipcRenderer
var parse = require('../../utils/getStatus')

export default {
  name: 'FilesChanged',
  data() {
    return {
      command: '',
      files: []
    }  
  },
  mounted() {
    ipc.on('giveFilePath', (event, pwd) => {
      this.getStatus(pwd)
    })

    ipc.on('getStatus', (event, result) => {
      this.files = result[5];
      console.log(this.files)
    })
  },
  updated() {
    console.log("UPDATED:", this.files)
  },
  methods: {
    getStatus: function(pwd) {
        // changes working directory in terminal to file users selected
        ipc.send("terminal.toTerm", `cd "${pwd}"`)
        ipc.send("terminal.toTerm", '\n')
        ipc.send("terminal.toTerm", "clear")
        ipc.send("terminal.toTerm", '\n')
        // calls git status initally for the user
        ipc.send("terminal.toTerm", "git status")
        ipc.send("terminal.toTerm", '\n')

        // parse status takes the pwd the user selected and returns the status of
        // their git repo to be displayed in the visulization if it is a git repo
        parse.getStatus(pwd).then((result) => {
          ipc.send("statusUpdate", result)
      })
    },
  },
};
</script>

<style scoped>
.default-layout {
  display: flex;
  align-content: space-between;
  flex-direction: column;
  color: white;
  width: 100%;
  padding: 5%;
}
.file-box {
  border-color: white;
  border-width: 1px;
  border-style: solid;
  height: 20%;
  padding-top: 2%;
  padding-bottom: 2%;
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 2%;
  overflow: auto;
}
.commit-flow {
  display: flex;
  flex-direction: row;
  margin-top: 10%;
  justify-content: center;
}
.commit-flow-text {
  margin-right: 5%;
  margin-left: 5%;
}
.highlight-text {
  margin-right: 5%;
  margin-left: 5%;
  color:yellow;
  font-weight: bold;
}
.file-deleted {
  text-decoration: line-through
}
</style>