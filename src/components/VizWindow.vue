<template>
  <div class="vis-box">
    <h1 class="title"> Window for the git visualizations! </h1>
  </div>
</template>

<script>
export default {
  name: 'VizWindow',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vis-box {
  display: flex;
    justify-content: center;
    align-items: center;
    height: 65%;
    background-color: rgb(183, 183, 183);
}
</style>
