<template>
    <div id="options-column" >
        <font-awesome-icon  v-on:click="$router.push('/home')" class="faIcon" icon="home"/>

        <font-awesome-icon v-on:click="openDirectories" class="faIcon" icon="folder"/>
        
      </div>
</template>

<script>

export default {
    name: "ActivityBar",
    methods: {
    openDirectories() {
        if (document.getElementById("sidebar") == null){
            return
        }
       
      if (this.visible == true){
        
        document.getElementById("sidebar").style.display = "none";
        
      }else{
        document.getElementById("sidebar").style.display = "block";
      }
      this.visible = !this.visible;
    },
    },
    data () {
    return {
      visible: true,
    }
  }
}

</script>

<style scoped>
#options-column{
  background-color: #53336B;
  border-color: green;
  border-width: 1px;
  border-style: solid;
  padding: 15px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.75rem;
}
.faIcon {
    width: 3em;
    cursor: pointer;
    color:white;
}
</style>
