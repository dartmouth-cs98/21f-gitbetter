<template>
  <div className="options">
    <h3 class="subtitle">What do you want to do?</h3>
    <div class="commandopts">
      <div class="select">
        <select name="first" id="first" placeholder="..." v-model="opt" v-on:change="firstSelectChange(opt)" class="form-control">
          <option v-for="opt in commandOptions" :key="opt.id" v-bind:value="opt">{{opt.label}}</option>
        </select>
      </div>
      <div class="select" v-show="showSecond">
        <select name="second" id="second" v-model="opt2" v-on:change="secondSelectChange(opt2)">
          <option v-for="opt2 in secondaryOptions[this.firstCom]" :key="opt2.id" v-bind:value="opt2">{{opt2.label}}</option>
        </select>
      </div>
        <div class="select" v-show="showThird">
        <select v-show="showThird" name="third" id="third" v-model="opt3" v-on:change="thirdSelectChange(opt3)">
          <option v-for="opt3 in tertiaryOptions[this.secondCommand.value]" :key="opt3.id" v-bind:value="opt3">{{opt3.label}}</option>
        </select>
      </div>
    </div>

  <div class="results">
    <article class="card" v-show="(secondPicked && !this.showThird) || thirdPicked">
      <div class="card-header">
        <p class="card-header-title">Usage: {{ this.resultCommand.usage }}</p>
        <span v-on:click="copyCommand" title="Copy command to clipboard" class="card-header-icon">
          <font-awesome-icon icon="copy"/>
        </span>
        <span v-on:click="resetOpts" title="Close window" class="card-header-icon">
          <font-awesome-icon icon="times"/>
        </span>
      </div>
      <div class="card-content" v-if="this.resultCommand.nb">
        <div class="content">
        {{ this.resultCommand.nb }}
        </div>
      </div>
    </article>
  </div>
</div>
</template>

<script>
import searchOptions from './searchOptions.js'
// Credit for options and command descriptions goes to GitExplorer open source code 
// Source: https://github.com/summitech/gitexplorer
export default {
  name: "SearchBar",
  data () {
    return searchOptions;
  },
  methods: {
      firstSelectChange(option) {
          this.firstCom = option.value;
          this.firstCommand = option;
          this.resetOpts();
          this.showSecond = true;
      },
      secondSelectChange(option) {
        this.secondCommand = option;
        this.secondPicked = true;
        if (!this.secondCommand.usage) {
          this.showThird = true;
        } 
        else {
          this.resultCommand = this.secondCommand;
        }
      },
      thirdSelectChange(option) {
        this.thirdCommand = option;
        this.thirdPicked = true;
        this.resultCommand = this.thirdCommand;
    },
   resetOpts() {
      /* 
        * resets the command dropdowns when the 
        * close button in the command description is used 
      */
      this.newRecentSearch();
      this.secondCommand = "";
      this.showSecond = false;
      this.showThird = false;
      this.thirdCommand = "";
      this.secondPicked = false;
      this.resultCommand = "";
      this.thirdPicked = false;
     
    },
    
    copyCommand() {
      if(this.resultCommand !== ""){
        let command  = this.resultCommand.usage;
        navigator.clipboard.writeText(command);
        }
      },
    newRecentSearch() {
    /* 
      * adds a command to the recent searches store after user 
      * searches it
    */
      if(this.resultCommand !== "") {
          let command = this.firstCommand.label + " " + this.secondCommand.label;
          if(this.thirdCommand !== "") {
            command = command + " " + this.thirdCommand.label;
          }
          // command should be this.resultcommand.usage
          console.log(command, this.resultCommand.usage);
          this.$emit('newCommand')
          this.$store.commit('add', {command: command, usage: this.resultCommand.usage});
      }
    }
  },
};
</script>
<style scoped> /* Styles are scoped to this component only.*/
/* Style for Desktop/Tablet  */
.commandopts {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}

.results {
  display: flex;
  /* we need to edit this */
  justify-content: center;
  align-items: center;
  margin: 24px;
}

.select {
  margin: 12px;
  color: #272727;
}

.select select {
  border-color: green;
  background-color: #272727;
  color: white;
}

.select:not(.is-multiple):not(.is-loading)::after {
  border-color: #ab47bc;
}

.delete::after, .delete::before{
  background-color: #ab47bc;
}

.icons{
  display: flex;
  justify-content: flex-end;
}

.card-header-icon {
  color: #ab47bc;
  padding-left: 0px;
}

.message {
  width: 40vw;
}

.card-header {
  background-color:#363636;
}

h3, p {
  color: white;
}
</style>