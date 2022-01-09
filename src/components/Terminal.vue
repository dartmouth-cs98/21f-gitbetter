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

      ipc.send("terminal.toTerm", "source ~/.custom_bash_commands.sh\n")
      ipc.send("terminal.toTerm", "clear\n")

      // term.write("Enter \"gitbetter -help\" for more information. Type \"gitbetter visualize\" to see git commands that currently support visualizations!\n")
      
      
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

    // prompt(value) {
    //   this.$root.$emit('eventing', value);
    //   if(value === 'gitbetter -help') {
    //     this.send_to_terminal = "Wondering how to use GitBetter? \nGitBetter works just like Git, \nbut all changes are temporary\n(unless you decide to keep them). \nCheck out the help tab to find commands..."
    //   }
    //   else if(value == 'gitbetter visualize') {
    //     this.send_to_terminal = "Welcome to GitBetter Term 1!\nYou can run any of the following git commands\nto see visualizations of how they will\naffect the state of your repository: \n* git branch\n* git log\n* git diff\n* git status\n* git pull\n* git push\n* git checkout -b branch\n* git commit\n* git branch -u origin/master\n* git fetch\n* git revert"
    //   }
    //   else {
    //     try {
    //         run_command.run_script(value, null, (error, returnVal)=> {
    //           if (error) { 
    //             console.log("here")
    //             //eventually a look up table for errors will go here
    //           } 
    //         this.send_to_terminal = returnVal;
    //         });
    //     }
    //     catch(error) {
    //       this.send_to_terminal = "command not found"
    //     }
    //   }
    //},
  }
};
</script>

<style>
@import '../../node_modules/xterm/css/xterm.css';

#shell{
  overflow: auto;
  height: 85%;
}
pre {
  background-color: black !important;
  color: white !important;
  font-size: 1em !important;
  width: inherit !important;
}
</style>
