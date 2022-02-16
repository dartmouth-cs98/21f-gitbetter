<template>
  <div class="general-wrapper">
      <h1 class="title pl-4">You'll git there if you try!</h1>
    <div class="text-container">
        <div class="subtitle">
            The directory you're in isn't a github repository yet.
        </div>
        <div>Fix this by running</div>
        <div>
            <code>git init</code>
        </div>
        <div>in the terminal.</div>
        <div>Or, just click this button!</div>
        <button class="button" @click="init">git init</button>
        <div>You can also fix this by clicking End in the menu and picking a Github repository.</div>
    </div>
  </div>
</template>

<script>
const ipc = require("electron").ipcRenderer

export default {
  name: 'Init',
  data () {
    return {
      changedLocal: 0,
    }
  },
  methods: {
      init () {
        ipc.send("terminal.toTerm", "git init\n")
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
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.text-container {
    color: white;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    min-height: 100%;
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
.title {
  color: white;
  text-align: center;
  padding-top: 12px;
  margin-bottom: 0.75rem;
}
.subtitle {
  color: white;
  text-align: center;
  padding-top: 8px;
  margin-bottom: 0.75rem;
}

.button {
    border-color: #AB47BC;
    background-color: #f7c9ff;
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
