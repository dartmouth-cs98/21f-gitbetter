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
        <div class="change-location">
            <font-awesome-icon class="status-icons" icon="code-branch"/>
            <div>on {{ this.branchName }}</div>
        </div>
     </div>
     <div class="file-locations">
        <div class="status unstaged">
        <div style="background:orange;" class="small numbers"> </div>
            {{ this.changedLocal }} files have unsaved changes.
        </div>
        <div class="status tracked">
        <div  style="background:blue;" class="small numbers"> </div>
            {{ this.tracked }} files have changes which are ready to be committed.
        </div>
        <div class="status ready">
        <div style="background:purple;" class="small numbers"> </div>
            {{ this.commits }} commits are ready to be pushed from your branch.
        </div>
     </div>
     <div class="suggestions">
        <div class="numbers" style="background:orange;" @click="openAddModal">1</div>
        <font-awesome-icon class="status-icons" icon="arrow-right"/>
        <div class="numbers" style="background:blue;" @click="openModal">2</div>
        <font-awesome-icon class="status-icons" icon="arrow-right"/>
        <div style="background:purple;" class="numbers" @click="pushToRemote">3</div>
     </div>
     <div class="suggestions-text">
        <div class="sug-desc">To save changes, enter 'git add filename(s)'. To select files to add, click the blue circle.</div>
        <div class="sug-desc">To commit your changes, enter 'git commit -m "your commit message"' in the terminal, or click the blue circle.</div>
        <div class="sug-desc">To show your changes in the remote branch, type "git push", or click the purple circle.</div>
     </div>

    <div ref="modal" class="modal">
      <div class="modal-background" @click="closeModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Committing your changes...</p>
          <button class="delete" @click="closeModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <p>Write a message for your commit!</p>
          <input class="input" type="text" placeholder="Your commit message here..." v-model="commitMessage">
        </section>
        <footer class="modal-card-foot">
          <button class="button commit-changes is-success" @click="makeCommit">Make your commit</button>
          <button class="button" @click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>

    <div ref="addModal" class="modal">
      <div class="modal-background" @click="closeModal2"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Select files to add...</p>
          <button class="delete" @click="closeModal2" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <p v-if="filesToAdd.length > 0">The files you select here will be tracked for your next commit.</p>
          <p v-else>Looks like you don't have any changes to add. Try editing, adding, or deleting a file, then running git status to update your files.</p>

          <div class="checkbox-wrapper" v-for="file in filesToAdd" :key="file.id">
            <label  class="checkbox">
              <input v-model="selectedFiles" :value="file" type="checkbox">
              {{file}}
            </label>
          </div>
        </section>
        <footer v-if="filesToAdd.length > 0" class="modal-card-foot">
          <button class="button commit-changes is-success" @click="addAll">Select all and add</button>
          <button class="button commit-changes is-success" @click="addSome">Add selected files</button>
          <button class="button" @click="closeModal2">Cancel</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
const ipc = require("electron").ipcRenderer
var parse = require('../../utils/getStatus')
import VueSimpleAlert from "vue-simple-alert";

export default {

  name: 'Status',
  data () {
    return {
      branchName: "",
      commits: 0,
      changedLocal: 0,
      tracked: 0,
      workingDir: "",
      commitMessage: "",
      filesStaging: [],
      filesLocal: [],
      filesToAdd: [],
      filesToCommit: [],
      selectedFiles: [],
    }
 },
  created() {
      ipc.on('giveFilePath', (event, pwd) => {
        this.workingDir = pwd;
        this.getStatus(this.workingDir)
      })

      ipc.on('notGit', () => {
        VueSimpleAlert.alert("The directory you chose was not a git repository, saving changes will make it one.")
      })
      ipc.on('getStatus', (event, result) => {
        console.log('git status listener in StatusViz', result)
        this.branchName = result[0];
        this.commits = result[1];

      // get the files in the local and staging areas 
        this.filesStaging = result[5].filesStaging;
        this.filesLocal = result[5].filesLocal;

        // get list of all of the files in the staging area
        this.filesToCommit = this.filesStaging.filesDeleted.concat(this.filesStaging.filesModified, this.filesStaging.filesRenamed, this.filesStaging.filesCopied, this.filesStaging.filesAdded);
        this.filesToCommit = this.filesToCommit.filter(word => word.length != 0);
        console.log('files to commit is', this.filesToCommit)
        // gets files in local 
        this.filesLocal = this.filesLocal.filesAdded.concat(this.filesLocal.filesDeleted, this.filesLocal.filesModified, this.filesLocal.filesRenamed, this.filesLocal.filesCopied, this.filesLocal.filesUntracked);
        this.filesToAdd = this.filesLocal.filter(word => word.length != 0);
        console.log('files to add ', this.filesToAdd)
        this.$store.commit('setFiles', {local: this.filesToAdd, staging: this.filesToCommit})
        this.changedLocal = this.filesToAdd.length;
        this.tracked = this.filesToCommit.length;
        // this.$store.commit('setFiles', this.filesToAdd, this.filesToCommit)
      })
  },
  // watch: {
  //   '$store.state.status': function() {
  //     console.log(this.$store.state.status.status[5]);
  //     // console.log('status store in file comp', this.filename, this.$store.state.status.status)

  //   }
  // },
  beforeDestroy() {
    ipc.removeAllListeners("getStatus");
    ipc.removeAllListeners("giveFilePath");

  },
// check event listner error
// where is visulization being mounted from 

  methods: {
      getStatus(pwd) {
        console.log('updating status in status viz')
          
          parse.getStatus(pwd).then((result) => {
            console.log('status result', result)
            ipc.send("statusUpdate", result)
        })
      },

      addAll() {
        ipc.send("terminal.toTerm", "git add .\n")
        this.$refs.addModal.classList.remove('is-active');
      },

      addSome() {
        let f = "git add"

        for (const element of this.selectedFiles) {
          f = f + " " + element;
        }
        if(this.selectedFiles.length > 0) {
          ipc.send("terminal.toTerm", `${f}\n`)
        }
        this.$refs.addModal.classList.remove('is-active');
      },

       pushToRemote() {
        ipc.send("terminal.toTerm", "git push\n")
      },

      // opens the commit modal
      openModal() {
        this.$refs.modal.classList.add('is-active');
      },
      // closes the git commit modal
      closeModal() {
        this.$refs.modal.classList.remove('is-active');
        console.log(this.commitMessage)
        this.commitMessage = ""
      },
      // opens the add modal
      openAddModal() {
        if(!this.filesToAdd) {
          this.filesToAdd = []
        }
        this.$refs.addModal.classList.add('is-active');
      },
      // closes the git add modal
      closeModal2() {
        console.log('selected files', this.selectedFiles)
        this.$refs.addModal.classList.remove('is-active');
        this.selectedFiles = []
      },

      makeCommit() {
        let message = 'git commit -m "' + this.commitMessage + '"';
        
        ipc.send("terminal.toTerm", `${message}\n`);
        this.$refs.modal.classList.remove('is-active');

        this.commitMessage = ""
      },
      
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
    justify-content: center;
}

.checkbox-wrapper {
  padding: 8px 24px;
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
    padding-bottom: 12px !important;
    padding: 7% 18px;
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

.modal-card-head {
  background-color: #53336B;
}

.modal-card-body {
  background-color: #363636;
}
.modal-card-title {
  color: white;
}
.modal-card-foot {
  color: white;
  background-color: #53336B;
  padding: 12px;
  display: flex;
  justify-content: space-between;
}

.commit-changes {
  background-color: #ab47bc !important;
}

.modal-card {
  width: 50%;
}

.checkbox {
  color: white !important;
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