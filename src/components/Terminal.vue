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
import shell from 'vue-shell'
import replicate from '../../replicate_repo.js'
import run_script from '../../replicate_repo_electron.js'

Vue.use(shell);

export default {
  data() {
    return {
      send_to_terminal: "",
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
        // {
        //   name: 'pwd',
        //   get() {
        //     return run_script("pwd");
        //   }
        // }

      ]
    };
  },
  
  methods: {
    prompt(value) {
      if (value == "node -v") {
        this.send_to_terminal = process.versions.node;
      }
      else {
        var returnVal;
        setTimeout(() => {
          returnVal = run_script(value);
          console.log('return value is ', returnVal);
          this.send_to_terminal = returnVal;
        }, 1500);
      }
    },

    readInput(input) {
      run_script(input);
    }

  }
};
</script>

<style>
</style>