<template>
    <div class="notification is-info">
        <font-awesome-icon icon="times"/>
        <font-awesome-icon @click="ind --" icon="chevron-circle-left"/> <font-awesome-icon  @click="ind ++" icon="chevron-circle-right"/>
        {{ this.messages[this.ind] }}
        <span class="numerator">{{ this.ind + 1 }}</span><span class="slash-entity">⁄</span><span class="denominator">{{ this.messages.length }}</span> 
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
              'The visualization window is where you can visualize what\'s going on in your git repository.',
              'The Help tab is where you can go to find a specific command by searching the dropdown menu options.',
              'The Tutorials tab is where you can go to see step by step instructions for git workflows.',
              'Click the Gitbetter logo to return to the terminal at any time.',
              'You\'re ready to Git Started! See these instructions again by selecting the questions logo here.'

          ],
          ind: 0,
      }
  },
};
</script>
<style scoped> 

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