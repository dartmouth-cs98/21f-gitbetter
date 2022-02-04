// Adapted from: https://vuejsexamples.com/component-vuejs-to-simulate-a-terminal/
<template>
  <div id="terminal"></div>
</template>

<script>
// import Vue from "vue";
// import shell from 'vue-shell';
// import replicate from '../../replicate_repo.js';
// let xterm = require('../../node_modules/xterm/lib/xterm.js')
// var run_command = require('../../run_command');
import { FitAddon } from 'xterm-addon-fit';
import { Terminal } from 'xterm';
// var os = require('os');
// var pty = require('node-pty');
const ipc = require("electron").ipcRenderer
var parse = require('../utils/parse_status')
//Vue.use(shell);

export default {
  data() {
    return {
      send_to_terminal: '',
      process: Object,
      fitObj: Object,
      // banner: {
      //   header: "GitBetter 🔥",
      //   helpHeader: 'Enter "gitbetter -help" for more information. Type "gitbetter visualize" to see git commands that currently support visualizations',
      //   emoji: {
      //       first: "",
      //       second: "",
      //       time: 1000000,
      //   },
      //   sign: "$",
      // },
      // commands: [
      //   { name: "credits",
      //     get() {
      //       return `With ❤️ By Salah Bentayeb @halasproject.`;
      //   }
      //   },

      //   {
      //     name: "gitstarted",
      //     get() {
      //       return replicate();
      //     }
      //   },
      // ]
    };
  },
  mounted () {
    // const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
    // this.process = pty.spawn(shell, [], {
    //   name: 'xterm-color',
    //   cols: 80,
    //   rows: 30,
    //   cwd: process.cwd(),
    //   env: process.env
    // });
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
        parse.parse_staus(data);
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
  height: 85%;
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
