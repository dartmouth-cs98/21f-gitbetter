<template>
  <div>
    <vo-basic :data="chartData" v-on:click="handleClick"></vo-basic>
  </div>
</template>
 
<script>
import { VoBasic } from "vue-orgchart";
import "vue-orgchart/dist/style.min.css";

export default {
  name: 'DirectoryTree',
  components: { VoBasic },
  created() {
    this.chartData = {
      name: "GitBetterTestRepository",
      children: [
        { name: "Merging.py" },
        { name: "README.md" },
        { name: "Searching.py" },
        { name: "Sorting.py" },
      ]
    };
  },
  methods: {
    handleClick: e => {
      alert(e);
    }
  }
};
</script>