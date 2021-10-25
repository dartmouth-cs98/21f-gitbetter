<template>
  <div class="level term">
     <h1 class="title"> Term! </h1>
     <div class="container">
         <!-- <Term /> -->
     </div>
    </div>
</template>

<script>
// import Term from './Terminal'

export default {
  name: 'TerminalWrapper',
  components: {
    //   Term,
  }
//   props: {
//     msg: String
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.term {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-color: black;
    border-width: 1px;
    border-style: solid;
}
</style>
