
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
    '$store.state.status': function() {
      this.statusObj = this.$store.state.status.status[4];
      this.stage = this.$store.state.status.status[5];
      // console.log('status store in file comp', this.filename, this.$store.state.status.status)

      if(this.stage.filesStaging.filesAdded && this.stage.filesStaging.filesAdded.includes(this.filename)){
        this.status = 'tracked'
        if(this.stage.filesLocal.filesModified && this.stage.filesLocal.filesModified.includes(this.filename)){
          this.status = 'modified'
        }
      }
      else if(this.stage.filesLocal.filesModified && this.stage.filesLocal.filesModified.includes(this.filename)){
        this.status = 'modified'
      }
      else if(this.statusObj.filesUntracked.includes(this.filename)){
        this.status = 'untracked'
      }
      else {
        this.status = 'untouched'
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