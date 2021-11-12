// Adapted from: https://vuejsexamples.com/component-vuejs-to-simulate-a-terminal/
<template>
  <div class="terminal" >
    <v-shell
      :banner="banner"
      :shell_input="send_to_terminal"
      :commands="commands"
      @shell_output="prompt"
    ></v-shell>
    <div id="anchor"></div>
  </div>
</template>

<script>
import Vue from "vue";
import shell from 'vue-shell';
import replicate from '../../replicate_repo.js';
var run_command = require('../../run_command');

Vue.use(shell);
// const anchor = document.querySelector('#input-line')

export default {
  el: '#app',
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
      console.log("when does this function run?")
      this.scrollToElement();
      // window.scrollTo(0, anchor.scrollHeight);
      // anchor.scrollTop = anchor.scrollHeight - anchor.clientHeight
       
  //      anchor.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'end'
  // });
      try {
          //const send_value = async () => {
            run_command.run_script(value, null, (error, returnVal)=> {
              if (error) { 
                //eventually a look up table for errors will go here
              } 
            this.send_to_terminal = returnVal;
            
            }); 
        
      }
      catch(error) {
        this.send_to_terminal = "Command not found"
      }
    },
    scrollToElement() {
    const el = this.$refs.scrollToMe;
    console.log(this.$refs)

    if (el) {
      // Use el.scrollIntoView() to instantly scroll to the element
      el.scrollIntoView({behavior: 'smooth'});
    }
  }
  }
};
</script>
<style lang="scss" scoped>
  .terminal{
    height: 100%;
    overflow: auto;
    
  }

</style>
