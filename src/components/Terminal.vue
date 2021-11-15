// Adapted from: https://vuejsexamples.com/component-vuejs-to-simulate-a-terminal/
<template>
  <div id="shell">
    <v-shell 
      :banner="banner"
      :shell_input="send_to_terminal"
      :commands="commands"
      @shell_output="prompt"
    ></v-shell>
  </div>
</template>

<script>
import Vue from "vue";
import shell from 'vue-shell';
import replicate from '../../replicate_repo.js';
var run_command = require('../../run_command');

Vue.use(shell);

export default {
  data() {
    return {
      send_to_terminal: '',
      banner: {
        header: "GitBetter 🔥",
        helpHeader: 'Enter "gitbetter -help" for more information. Type "visualizations" to see git commands that currently support visualizations',
        emoji: {
            first: "",
            second: "",
            time: 1000000,
        },
        sign: "$",
      },
      commands: [
        { name: "credits",
          get() {
            return `With ❤️ By Salah Bentayeb @halasproject.`;
        }
        },
        {
          name: "uname",
          get() {
            return navigator.appVersion;
          }
        },
        {
          name: "visualizations",
          get() {
            return `Welcome to GitBetter Term 1!\nFeel free to test git commands on the visualization \nwindow or in your terminal. We currently have (hard-coded) \nvisualization support for the following git commands: \n* git branch\n* git log\n* git diff\n* git status\n* git pull\n* git checkout -b\n* git commit`;
          }
        },
        {
          name: "gitstarted",
          get() {
            return replicate();
          }
        },
      ]
    };
  },
  
  methods: {
    prompt(value) {
      if(value === 'gitbetter -help') {
        this.send_to_terminal = "Wondering how to use GitBetter? \nGitBetter works just like Git, \nbut all changes are temporary\n(unless you decide to keep them). \nCheck out the help tab to find commands..."
      }
      else {
        try {
            run_command.run_script(value, null, (error, returnVal)=> {
              if (error) { 
                //eventually a look up table for errors will go here
              } 
            this.send_to_terminal = returnVal;
            this.$root.$emit('eventing', value);
            });
        }
        catch(error) {
          this.send_to_terminal = "Command not found"
        }
      }
    },
  }
};
</script>

<style>
#shell{
  overflow: auto;
  height: 100%;
}
pre {
  background-color: black !important;
  color: white !important;
  font-size: 1em !important;
  width: inherit !important;
}
</style>
