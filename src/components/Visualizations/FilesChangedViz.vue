<template>
  <div class='default-layout'>
      Commits: ready to push to GitHub
      <div class='file-box'>
          <!-- Files -->
      </div>
      Staging: what you want pushed to GitHub
      <div class='file-box'>
          <!-- Files -->
      </div>
      Local: your current copy
      <div class='file-box'>
          <!-- Files -->
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
const pty = require("node-pty");
// const ipc = require("electron").ipcRenderer

export default {
  name: 'FilesChanged',
  data() {
    return {
      command: '',
      prevStatus: {
        local: [],
        staging: [],
        commits: []
      },
      currStatus: {
        local: [],
        staging: [],
        commits: []
      },
      ptyProcess: pty.spawn('bash', [], {
                name: "xterm-color",
                cols: 80,
                rows: 100,
                cwd: process.CWD,
                env: process.env
            })
    }  
  },
  methods: {
    // WIP: not called yet, will be used for populating local/staging/commits
    updateStatus() {
      this.prevStatus = this.currStatus;
      this.ptyProcess.write(`git status --porcelain \n`);
      // get the output from running git status and update currStatus
    }
  },
  mounted() {
    // WIP: currently unused (and incomplete), will be used for populating local/staging/commits
    this.ptyProcess.on("data", (data) => {
      if (data.startsWith('bash') || data.startsWith('git')) {
        return;
      }  
      // TODO: use getStatus in utils
    });
  }
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
</style>