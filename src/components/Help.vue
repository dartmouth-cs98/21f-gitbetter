<template>
  <div class="main">
    <Navigation />
    <div class="columns">
        <div class="column is-fullheight is-one-fifth sidebar">
            <Sidebar />
        </div>
        <div class="top-wrapper column">
          <div class="general-wrapper">
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
    height: 100vh;
}
.general-wrapper {
  min-width: 90%;
}
.sidebar {
  padding-right: 0;
}
.top-wrapper {
  display:flex;
  background-color: #b8b8b8;
  flex-grow: 1;
  margin-top: 0.75rem;
  border-color: green;
  border-width: 1px;
  border-style: solid;
  overflow-y: scroll;
}
</style>
