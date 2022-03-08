
<template>
  <p v-bind:class="statusClass" class="file">
    {{this.getPadding}}{{this.filename}}
  </p>
</template>

<script>


export default {
  name: 'File',
  props: {
      filename: String,
      padding: {
        default: "",
        type: String
      },
  },
  data() {
    return {
      status: 'untouched',
      statusObj: {},
      stage: {},
      local: [],
      staging: [],
    }
  },
  watch: {
    '$store.state.local': function() {
      this.local = this.$store.getters.getLocal
    //  console.log('local;', local)
     
    },
     '$store.state.staging': function() {
        this.staging = this.$store.getters.getStaging

    }
  },
  computed: {
      getPadding() {
          return this.padding + '\t';
      },
      stat() {
        if(this.local && this.local.includes(this.filename)){
           return'untracked'
        }
        else if(this.staging && this.staging.includes(this.filename)){
          return 'tracked'
        }
        else {
          return 'untouched'
        }
      },
      statusClass() {
        return {
          untracked: this.stat == 'untracked',
          tracked: this.stat == 'tracked',
          untouched: this.stat == 'untouched',
          modified: this.stat == 'modified' || this.stat == 'tracked',
        }
      },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.file {
  padding-left: 10%;
  background-color: #272727;
}

.untracked {
  color: rgb(103, 215, 95);
}

.modified {
  color: rgb(238, 179, 86);
}


.untouched {
  color: white;
}

</style>