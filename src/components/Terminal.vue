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
        helpHeader: 'Enter "help" for more information.',
        emoji: {
            first: "🔅",
            second: "🔆",
            time: 750
        },
        sign: "GitBetterShell $",
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
      try {
          const send_value = async () => {
            const returnVal = await run_command.run_script(value);
            this.send_to_terminal = returnVal;

          }  
          send_value();
      }
      catch(error) {
        this.send_to_terminal = "Command not found"
      }
    },
  }
};
</script>
