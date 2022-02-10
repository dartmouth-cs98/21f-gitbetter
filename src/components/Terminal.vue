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
      send_to_terminal: '',
      process: Object,
      fitObj: Object,
    };
  },
  mounted () {
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
      })
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
</style>
