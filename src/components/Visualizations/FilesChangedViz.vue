<template>
  <div class='default-layout' :key="this.command.startsWith('git') ? this.command : '' ">
    {{this.updateStatus()}}
      <p>
        <b>Local:</b> your current copy
      </p>  
      <div class='file-box'>
          <p v-for="file in this.files.filesLocal.filesModified" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesLocal.filesAdded" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesLocal.filesUntracked" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesLocal.filesRenamed" :key="file[1]">{{file[0]}} -> {{file[1]}}</p>
          <p v-for="file in this.files.filesLocal.filesCopied" :key="file[1]">{{file[0]}} -> {{file[1]}}</p>
          <p class="file-deleted" v-for="file in this.files.filesLocal.filesDeleted" :key="file">{{file}}</p>
      </div>
      <p>
        <b>Staging:</b> what you want pushed to GitHub
      </p>  
      <div class='file-box'>
          <p v-for="file in this.files.filesStaging.filesModified" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesStaging.filesAdded" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesStaging.filesUntracked" :key="file">{{file}}</p>
          <p v-for="file in this.files.filesStaging.filesRenamed" :key="file[1]">{{file[0]}} -> {{file[1]}}</p>
          <p v-for="file in this.files.filesStaging.filesCopied" :key="file[1]">{{file[0]}} -> {{file[1]}}</p>
          <p class="file-deleted" v-for="file in this.files.filesStaging.filesDeleted" :key="file">{{file}}</p>
      </div>
      <p>
        <b>Commits:</b> ready to push to GitHub
      </p>  
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        You have <b>{{this.commits}}</b> commits
      </p>
      <hr>
      <div class='commit-flow'>
          <div v-bind:class="this.prevCommand.startsWith('git add') ? 'highlight-text' : 'commit-flow-text'">
              git add
          </div>   
          <font-awesome-icon icon='chevron-right'/> 
          <div v-bind:class="this.prevCommand.startsWith('git commit') ? 'highlight-text' : 'commit-flow-text'">
              git commit
          </div>  
          <font-awesome-icon icon='chevron-right'/> 
          <div v-bind:class="this.prevCommand.startsWith('git push') ? 'highlight-text' : 'commit-flow-text'">
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
  props: {
    command: String,
    commandCount: Number
  },
  data() {
    return {
      prevCommand: '',
      commits: 0,
      files: {},
      runStatus: false,
      count: 0
    }  
  },
  mounted() {
    ipc.on('giveFilePath', (event, pwd) => {
      localStorage.workingDir = pwd 
      // this.setPath()
      this.getStatus(localStorage.workingDir)
    })

    ipc.on('getStatus', (event, result) => {
      this.commits = result[1];
      this.files = result[4]
    })
  },
  methods: {
    getStatus: function(pwd) {
        this.runStatus = true
        this.$emit('runStatus', this.runStatus)

        // parse status takes the pwd the user selected and returns the status of
        // their git repo to be displayed in the visulization if it is a git repo
        parse.getStatus(pwd).then((result) => ipc.send("statusUpdate", result))
    },
    // setPath() {
    //   ipc.send("terminal.toTerm", `cd "${localStorage.workingDir}" `)
    //   ipc.send("terminal.toTerm", '\n')
    //   ipc.send("terminal.toTerm", "clear")
    //   ipc.send("terminal.toTerm", '\n')
    // },
    updateStatus() {
      if (this.commandCount > this.count && (
          this.command.startsWith('git add') 
          || this.command.startsWith('git restore') 
          || this.command.startsWith('git rm') 
          || this.command.startsWith('git commit') 
          || this.command.startsWith('git push'))) {
            this.prevCommand = this.command
            this.count = this.commandCount
            if (localStorage.workingDir) {
              this.getStatus(localStorage.workingDir)
            }
      }
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
  height: 25%;
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