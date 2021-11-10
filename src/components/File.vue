
<template>
  <p class="">
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
  computed: {
      getPadding() {
          return this.padding + '\t';
      }
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>