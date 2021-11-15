<template>
  <div class="main">
    <Navigation />
    <div class="columns">
        <div class="column is-fullheight is-one-fifth sidebar">
            <Sidebar />
        </div>
        <div class="column mr-4 top-container">
            <div class="container">
                <h1 class="title">Help</h1>
                <SearchBar @newCommand="newCommand" />
                <RecentSearches v-bind="{'recents': recents}"/> 
            </div>      
        </div>
                
    </div>
  </div>
</template>

<script>

import Sidebar from './Sidebar.vue'
import Navigation from './Navigation.vue'
import SearchBar from './SearchBar.vue'
import RecentSearches from './RecentSearches.vue'


export default {
  name: 'Home',
  components: {
    Navigation,
    SearchBar,
    Sidebar,
    RecentSearches,
  },
  data () {
    return {
      recents: [],
    }
  },
  mounted() {
    this.recents = this.$store.getters.getRecentSearches;
  },
  methods: {
    newCommand() {
      this.recents = this.$store.getters.getRecentSearches;
    }
  }
}
</script>

<style scoped>
.columns {
    height: 100%;
}
.column {
    padding-right: 0px;
}
.container {
    /* height: 100%; */
    border-top-color: black;
    border-top-width: 1px;
    border-top-style: solid;
    padding: 1%;
}
.sidebar {
  padding-right: 0;
}
.top-container {
    padding-left: 0;
}
</style>
