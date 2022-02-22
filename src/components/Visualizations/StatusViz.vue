<template>
  <div class="general-wrapper">
      <h1 class="title pl-4">Current Project</h1>
       <div class="pl-4">Changes will be made from...</div>
      <div class="status-summary">
        <div class="change-location">
            <font-awesome-icon class="status-icons" icon="desktop"/>
            <div>local machine</div>
        </div>
        <font-awesome-icon class="status-icons" icon="arrow-right"/>
        <div class="catushange-location">
            <font-awesome-icon class="status-icons" icon="code-branch"/>
            <div>on {{ this.branchName }}</div>
        </div>
     </div>
     <div class="file-locations">
        <div class="status unstaged">
        <div class="small numbers">1</div>
            {{ this.changedLocal }} files have unsaved changes.
        </div>
        <div class="status tracked">
        <div class="small numbers">2</div>
            {{ this.tracked }} files have changes which are ready to be committed.
        </div>
        <div class="status ready">
        <div class="small numbers">3</div>
            {{ this.commits }} commits are ready to be pushed from your branch.
        </div>
     </div>
     <div class="suggestions">
        <div class="numbers" @click="addAll">1</div>
        <font-awesome-icon class="status-icons" icon="arrow-right"/>
        <div class="numbers">2</div>
        <font-awesome-icon class="status-icons" icon="arrow-right"/>
        <div class="numbers" @click="pushToRemote">3</div>
     </div>
     <div class="suggestions-text">
        <div class="sug-desc">To save changes, enter 'git add filename(s)'. To add all changes, click the first circle.</div>
        <div class="sug-desc">To commit your changes, enter 'git commit -m "your commit message"'</div>
        <div class="sug-desc">To show your changes in the remote branch, type "git push", or click the third circle.</div>
     </div>
  </div>
</template>

<script>
const ipc = require("electron").ipcRenderer
var parse = require('../../utils/getStatus')

export default {

  name: 'Status',
  data () {
    return {
      branchName: "",
      commits: 0,
      changedLocal: 0,
      tracked: 0,
    }
 },
  mounted() {
      ipc.on('giveFilePath', (event, pwd) => {
        this.getStatus(pwd)
      })

      ipc.on('getStatus', (event, result) => {
        this.branchName = result[0];
        this.commits = result[1];
        this.changedLocal = result[2];
        this.tracked = result[3];
      })
  },
// check event listner error
// where is visulization being mounted from 

  updated() {
    console.log(this.branchName)
  },

  methods: {
      getStatus: function(pwd) {
          let new_dir = pwd + '.gb'

          // changes working directory in terminal to file users selected
          ipc.send("terminal.toTerm", `cd "${new_dir}"`)
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

      addAll() {
        ipc.send("terminal.toTerm", "git add .\n")
      },
       pushToRemote() {
        ipc.send("terminal.toTerm", "git push\n")
      }
      
  }

}
</script>

<style scoped>
.columns {
  height: calc(100% - 5rem);
  margin: 0;
}
.general-wrapper {
  width: 100%;
  height: 100%;
  min-height: 675px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: white;
  overflow-y: auto;
}
.file-locations {
    display: flex;
    flex-direction: row;
    padding: 4%;
}

.status-summary {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 5%;
}

.suggestions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-top: 7%;
}

.status-icons {
    font-size: 26px;
}

.suggestions-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.change-location {
    width: 40%;
    text-align: center;
}

.small {
    height: 25px !important;
    width: 25px !important;
    font-size: 12px;
    cursor: default !important;
}

.sug-desc {
    width: 30%;
    font-size: 16px;
    text-align: center;
}

.sidebar {
  padding-right: 0;
}
.top-wrapper {
  display:flex;
  background-color: #272323;
  flex-grow: 1;
  border-color: green;
  border-width: 1px;
  border-style: solid;
  color: white;
}
.numbers {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0px;
    background: green;
    border-radius: 100%;
    cursor: pointer;
}
.title {
  color: white;
  text-align: center;
  padding-top: 12px;
  margin-bottom: 0.75rem;
}
.tutorial {
    flex-grow: 0.825;
}

.status {
    width: 30%;
    text-align: center;
}

@media only screen and (max-width: 770px) {
  .sidebar {
    display: none;
  }
  .columns {
    padding-top: 0.75rem;
  }
  .general-wrapper {
    padding-left: 20px;
  }
  .top-wrapper {
    height: 100%;
  }
}
</style>