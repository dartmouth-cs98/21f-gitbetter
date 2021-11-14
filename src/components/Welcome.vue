<template>
  <div class="main top-welcome">
      <div class="page-flex">
      <div class="top-directory">
          <div class="start-box">
              <h1>Start</h1>
              <h2>+ Create new file</h2>
              <h2>+ Open file</h2>
              <h2>+ Clone git repository</h2>
              <h1/>
              <h1>Recent</h1>
              <h2>+ CS98 GitBetter</h2>
          </div>
      </div>
      <div class="vl"></div>
      <div class= "top-help">
          <div class="start-box">
              <h1>Search for commands...</h1>
              <input type="text" placeholder="Help! How do I use git?">
              <h2>21 Results found... </h2>
          </div>
      </div>
      
      </div>
      <img src="../assets/logo.png" />
      <button 
        @click="$router.push('/')"
        class="center-button"
        >
            Git Started
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
h1 {
    font-weight: bold;
    font-size: 35px;
    padding-bottom: 20px;
    padding-top: 30px;
}
h2 {
    font-size: 20px;
}
input[type="text"] {
    padding: 10px;
    width: 80%;
    border-radius: 20px;
    font-size: 18px;
    font-style: italic;
    border-color: #1A61EB;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
img {
    position: absolute;
    top: 40%;
    left: 30%;
}
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
    width: 50%;
}
.top-help {
    width: 50%;
}
.center-button {
    position: absolute;
    top: 60%;
    left: 44%;
    padding: 10px 15px;
    width: 12%;
    border-radius: 20px;
    background-color: white;
    border-color: #4200FF;
    font-size: 15px;
    font-weight: bold;
    font-style: italic;
    cursor: pointer;
}
.center-button:hover {
    color: rgb(0, 0, 0);
    box-shadow: 0 10px 20px rgba(209, 161, 244, 0.4);
}
.start-box {
    color: white;
    padding-left: 45px;
}
.vl {
    border-left: 1.5px solid black;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 10%;
}
</style>
