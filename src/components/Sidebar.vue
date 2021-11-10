<template>
    <div class="sidebar ml-0">
        <div> 
          <b>Project Structure:</b>
          <p v-for="file in this.files" :key="file">
            {{ file }}
        </p>
        </div>
    </div>
</template>

<script>
var helpers = require('../../helpers.js');

export default {
  name: 'Sidebar',
  data () {
    return {
      files: "",
    }
  },
  mounted() {
    this.getFiles();
  },
  methods: {
    async getFiles() {
      let promiseFiles = await helpers.getDirStructure();
      this.files = promiseFiles.split("\n");
      console.log("Files are", this.files);
    }
  },
}
</script>
<style lang="scss" scoped>
  .sidebar {
      height: 100%;
      background-color: #f3e5f5;
      padding: 5%;
      border-color: black;
      border-width: 1px;
      border-style: solid;
  }
</style>