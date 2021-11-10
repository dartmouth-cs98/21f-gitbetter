// Adapted from: https://vuejsexamples.com/component-vuejs-to-simulate-a-terminal/
<template>
  <div>
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
        helpHeader: 'Enter "gitbetter -help" for more information.',
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
      if (value == "cwd") {
        this.send_to_terminal = process.cwd();
      }
      else {
        var returnVal;
        setTimeout(() => {
          returnVal = run_command.run_script(value);
          console.log('return value is ', returnVal);
          this.send_to_terminal = returnVal;
        }, 1500);
      }
    },
  }
};
</script>
