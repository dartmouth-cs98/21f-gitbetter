<template>
    <div class="notification p-4">
        <div class="icons">
            <div class="clickable">
                <font-awesome-icon @click="updateStep(-1)" icon="chevron-left"/> 
                <font-awesome-icon  @click="updateStep(1)" class="right-arrow" icon="chevron-right"/>
            </div>
            <div class="clickable" @click="$emit('endTutorial')">
                <font-awesome-icon icon="times"/>
            </div>
        </div>
        <div class="message-content">
            {{ this.messages[this.ind] }}
        </div>
        <div class="step-count">
            <span class="numerator">{{ this.ind + 1 }}</span><span class="slash-entity">⁄</span><span class="denominator">{{ this.messages.length }}</span> 
        </div>
    </div>
</template>

<script>
// Credit for options and command descriptions goes to GitExplorer open source code 
// Source: https://github.com/summitech/gitexplorer
export default {
  name: "FirstTime",
  data() {
      return {
          messages: [
              'This is the terminal, where you can run commands in the Gitbetter sandbox. The git commands that you run in here won\'t change the status of your real repository unless you run "gitbetter update".',
              'The visualization window is where you can visualize what\'s going on in your git repository. Use the button with the eye icon to show or hide this window as needed.',
              'The Help tab is where you can go to find a specific command by searching the dropdown menu options.',
              'The Tutorials tab is where you can go to see step by step instructions for git workflows.',
              'Click the Gitbetter logo to return to the terminal and visualization page at any time.',
              'When you click save, it ends the Gitbetter sandbox session, and transfers all changes you\'ve made to your repo.',
              "By clicking End, your Gitbetter sandbox session ends without saving any changes and exits the program.",
              'You\'re ready to Git Started! See these instructions again by selecting the questions logo here.'

          ],
      }
  },
  props: {
      ind: Number,
  },
  methods: {
      updateStep(val) {
          this.$emit('updateStep', val);
      }
  }
};
</script>
<style scoped> 
.icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.clickable {
     cursor: pointer;
}
.right-arrow {
    margin-left: 8px;
}
.step-count {
    text-align: right;
}
.notification {
    background-color: #f5baff;
}
.numerator {
   font-size:.7em;
   line-height:.7em;
   vertical-align:.3em;
}
.denominator {
   font-size:.7em;
   line-height:.7em;
   vertical-align:-.2em;
}
.slash-entity {
   font-size:.8em;
   line-height:.8em;
}
</style>