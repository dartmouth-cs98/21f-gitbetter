
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
    }
  },
  watch: {
    '$store.state.local': function() {
     let local = this.$store.getters.getLocal
    //  console.log('local;', local)
      if(local && local.includes(this.filename)){
        this.status = 'untracked'
      }
    },
     '$store.state.staging': function() {
        let staging = this.$store.getters.getStaging
        console.log('staging;', staging)

        if(staging && staging.includes(this.filename)){
          this.status = 'tracked'
        }
    }
  },
  computed: {
      getPadding() {
          return this.padding + '\t';
      },
      statusClass() {
        return {
          untracked: this.status == 'untracked',
          tracked: this.status == 'tracked',
          untouched: this.status == 'untouched',
          modified: this.status == 'modified' || this.status == 'tracked',
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