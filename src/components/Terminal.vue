// Adapted from: https://vuejsexamples.com/component-vuejs-to-simulate-a-terminal/
<template>
  <div id="terminal"></div>
</template>

<script>
import { FitAddon } from 'xterm-addon-fit';
import { Terminal } from 'xterm';
const ipc = require("electron").ipcRenderer

export default {
  data() {
    return {
      process: Object,
      fitObj: Object,
      branchN: "",
      curr: "",
    };
  },
  mounted () {
   ipc.on('branchUpdate', (event, data) => {
      this.$store.commit('setBranchName', {name: data});
    });

    ipc.on('statUpdate', (event, data) => {
      this.$store.commit('setStatus', {status: data});
    });

    ipc.on('setCommand', (event, data) => {
      console.log("Data is", data)
      if(event.key === 'Enter') {
        this.$store.commit('setCurrCommand', {command: this.curr});
        console.log("CURR COMM NEW COMMAND", this.curr)
      }
      else if (data == 'del') {
        this.curr = this.curr.slice(0, -1);
      }
      else {
        this.curr += data;
      }
    });

    this.makeScript();
    this.makeTerm();
  },
  created() {
    window.addEventListener("resize", this.resizeTerm);
    this.$parent.$on('openVisualization', this.resizeTerm);
    this.$parent.$on('closeVisualization', this.resizeTerm);

  },
  methods: {
    makeScript() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', "https://cdnjs.cloudflare.com/ajax/libs/xterm/3.14.5/xterm.min.js")
      document.head.appendChild(recaptchaScript)

    },
    makeTerm() {
      var term = new Terminal({
        cursorBlink: "block"
      });
      const fitAddon = new FitAddon();
      this.fitObj = fitAddon;
      term.loadAddon(fitAddon);
      let termParent = document.getElementById('terminal');
      if(!termParent.firstElementChild) {

        term.open(document.getElementById('terminal'));
        // fitAddon.fit();
        ipc.send("terminal.toTerm", "touch ~/.custom_bash_commands.sh\n")
        //ipc.send("terminal.toTerm", "cp  gitbetter-commands.sh ~/.custom_bash_commands.sh\n")
        ipc.send("terminal.toTerm", "source ~/.custom_bash_commands.sh\n")
        ipc.send("terminal.toTerm", "clear\n")
        

        term.onData((data) => {
          ipc.send("terminal.toTerm", data);
        });
        ipc.on("terminal.incData", function(event, data) {
          term.write(data);
          console.log("data is", data)
          if(data.includes("[K")) {
            console.log('Deleeeeete')
            ipc.send('setCommand', 'del');
          }
          else if(data && data.length == 1) {
            ipc.send('setCommand', data);
          }
          else if(data.includes("On branch")) {
            let branch = data.split(" ");
            const b = branch[2].split("\r")
            ipc.send('bnUpdate', b[0])
          }
          else if (data.includes("Changes to be committed") || data.includes("working tree clean")){
            let status = data.split("\r");
            ipc.send('statusUpdate', status)
          }
        })
      }
    },
    resizeTerm() {
      try {
        this.fitObj.fit();
      }
      catch(error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
@import '../../node_modules/xterm/css/xterm.css';

#terminal {
  overflow: scroll;
  height: calc(100% - 72px);
}

#terminal::-webkit-scrollbar {
  display: none;
}

pre {
  background-color: black !important;
  color: white !important;
  font-size: 1em !important;
  width: inherit !important;
}

.xterm-viewport, .xterm-screen {
  width: 100%;
}
</style>
