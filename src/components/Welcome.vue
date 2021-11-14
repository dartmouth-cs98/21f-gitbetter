<template>
  <div class="main top-welcome">
      <div class="page-flex">
      <div class="top-directory">
          <h1 class="title">Welcome</h1>
      </div>
      <div class= "top-help">
          <h1 class="title">Welcome</h1>
      </div>
      
      </div>
      <button 
        @click="$router.push('/')"
        class="center-button"
        >
            Git started
        </button>
  </div>
</template>

<script>

export default {
  name: 'Welcome',
  methods: {
      closeNavigation() {
      document.getElementById("top-navigation").style.display = "none";
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.columns {
    height: 100%;
}
.top-welcome {
    background: linear-gradient(to right, #DA91E5, #9953F1 50%, #53336B);
}
.page-flex {
    display: flex;
    width: 100%;
    height: 100%;
}
.top-directory {
    background-color: aqua;
    width: 50%;
}
.top-help {
    background-color: blueviolet;
    width: 50%;
}
.center-button {
    position: absolute;
    top: 55%;
    left: 45%;
}
</style>
