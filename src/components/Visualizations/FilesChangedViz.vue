<template>
  <div class='default-layout'>
      {{this.nest.commits}} commits: ready to push to GitHub
      <br>
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

export default {
  name: 'FilesChanged',
  props: {
    command: String,
  },
  data() {
    return {
      nest: {
        commits: 0,
      },
      files: {
        filesLocal: {
          filesModified: [],
          filesAdded: [],
          filesUntracked: [],
          filesRenamed: [],
          filesCopied: [],
        },
        filesStaging: {
          filesModified: [],
          filesAdded: [],
          filesUntracked: [],
          filesRenamed: [],
          filesCopied: [],
        },
      }
    }  
  },
  mounted() {
    ipc.on('getStatus', (_, result) => {
      this.files.filesStaging = result[5].filesStaging;
      this.files.filesLocal = result[5].filesLocal;
      this.nest.commits = result[1];
    });
  },
  methods: {
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