<template>
  <div class="main">
    <Navigation />
    <div class="columns">
        <div class="top-wrapper column">
          <div class="general-wrapper">
          <div class="title-wrapper">
            <div class="title">Search for commands...</div>   
            <div class="subtitle">Having trouble remembering a command name or what it does? Search by functionality or command name below.</div>           
          </div>
          <CommandSearch /> 
          </div>
        </div>
                
    </div>
  </div>
</template>

<script>

import Navigation from '../../router/BeginnerNav.vue'
import CommandSearch from './CommandSearch.vue'


export default {
  name: 'Search',
  components: {
    Navigation,
    CommandSearch,
  },
}
</script>

<style scoped>
.columns {
    height: calc(100% - 5rem);
    margin: 0;
}
.general-wrapper {
  width: 100%;
  padding: 5%;
}
.sidebar {
  padding-right: 0;
}
.title-wrapper {
  display:flex;
  justify-content: space-between;
  flex-direction: column;
}
.button {
  margin-right: 1em;
}
.top-wrapper {
  display:flex;
  background-color: #272323;
  flex-grow: 1;
  border-color: green;
  border-width: 1px;
  border-style: solid;
  overflow-y: scroll;
  color: white;
}
.title {
  color: white;
}

.subtitle {
  color: rgb(219, 219, 219);
}
.top-wrapper::-webkit-scrollbar {
  display: none;
}
.recent-searches {
  position: absolute;
  bottom: 5%;
  padding-right: 18px;
  height: 30%;
}

.search-section {
  max-height: 45%;
  overflow-y: scroll;
}

.search-section::-webkit-scrollbar {
  display: none;
}

.column {
  padding: 0;
}

@media only screen and (max-width: 770px) {
  .sidebar {
    display: none;
  }
  .columns {
    width: 100%;
  }
  .general-wrapper {
    padding-left: 20px;
  }
  .top-wrapper {
    height: 100%;
  }
}
</style>
