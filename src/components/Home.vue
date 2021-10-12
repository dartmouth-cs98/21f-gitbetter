<template>
  <div class="hello">
    <div> 
      Home page
      <div class="home"> 
        <VizWindow msg="Hello world" />
        <TerminalWrapper />
      </div>
    </div>
  </div>
</template>

<script>
import VizWindow from './VizWindow.vue'
import TerminalWrapper from './TerminalWrapper.vue'

export default {
  name: 'Home',
  components: {
    VizWindow,
    TerminalWrapper,
  }

//   props: {
//     msg: String
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.home {
    background-color: #ffd4fd;
}
</style>
