<template>
  <div class="main">
    <Navigation />
    <div class="columns">
      <ActivityBar/>
        <div id="sidebar" class="column is-fullheight is-one-fifth sidebar" style="padding-left: 0px;">
            <Sidebar />
        </div>
        <div class="top-wrapper column">
          <div class="general-wrapper">
          <h1 class="title">Help</h1>
          <SearchBar class="search-section" @newCommand="newCommand" />
          <RecentSearches class="recent-searches" v-bind="{'recents': recents}"/> 
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
import ActivityBar from './ActivityBar.vue'

export default {
  name: 'Home',
  components: {
    Navigation,
    SearchBar,
    Sidebar,
    RecentSearches,
    ActivityBar
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
  background-color: #272323;
  flex-grow: 1;
  margin-top: 0.75rem;
  border-color: green;
  border-width: 1px;
  border-style: solid;
  overflow-y: scroll;
  color: white;
}
.title {
  color: white;
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
