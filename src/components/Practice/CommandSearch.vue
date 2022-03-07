<template>
    <div>
        <h1 class="section-header help-header"> What are you looking for?</h1>
        <div class="panel-block search-comp">
            <p class="control has-icons-left">
                <input class="input" type="command" v-model="searchInput" @input="searchCommands(searchInput)" placeholder="Try 'git commit' or 'add files to branch'">
                <span class="icon is-small is-left">
                    <font-awesome-icon icon="search"/> 
                </span>
            </p>
        </div>
        <div class="panel-block results-parent">
            <div class="panel-block results" v-if="commandOpts.length > 1">
                {{ commandOpts.length }} results found...
            </div>
            <div class="panel-block results" v-if="commandOpts.length == 1">
                {{ commandOpts.length }} result found...
            </div>
            <div v-for="match in commandOpts" :key="match.id" class="panel-block command-blocks">
                {{ match.command }}: {{ match.desc }}
            </div>
        </div> 
    </div>
</template>
<script>      
import { gitCommands } from '../../constants/commands.js'

export default {
  name: 'CommandSearch',
  data () {
    return {
      commandOpts: [],
      searchInput: "",
    }
  },
  methods: {
      searchCommands (input) {
          let matches = [];
          if(input.length > 2 && input !=="git") {
            for (var key in gitCommands) {
                if (key.includes(input) || gitCommands[key].includes(input)) {           
                    console.log(key, gitCommands[key]);
                    matches.push({command: key, desc: gitCommands[key]})
                }
            }
            console.log("Matches", matches);
            this.commandOpts = matches;
          }
      }
  }
}
</script>
<style scoped>
.panel {
    color: white;
    box-shadow: none;
    width: 90%
}
.panel-block {
    color: white;
    border: none;
    border-radius: 0 !important;
}
.command-blocks {
    background-color:rgba(225,225,225,0.3);
    width: 100%;
}
.help-header {
    padding-top: 45px;
    padding-left: 10px;
}
.section-header {
    padding-bottom:0px;
}
.search-comp {
    border-bottom: none !important;
}
.results {
    font-weight:500;
    font-size:20px;
}
.results-parent {
    padding-bottom: 45px;
    max-height: 75vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
</style>