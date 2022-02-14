<template>
  <div class="main">
    <Navigation />
    <div class="columns">
        <div class="column is-fullheight is-one-fifth sidebar">
            <Sidebar />
        </div>
        <div class="top-wrapper column">
          <div class="general-wrapper">
          <div class="title-wrapper">
            <div class="title">Help</div>           
            <button class="button" title="Return to terminal" v-on:click="$router.push('/home')"><font-awesome-icon icon="laptop-code"/></button>
          </div>
          <SearchBar class="search-section" @newCommand="newCommand" />
          <RecentSearches class="recent-searches" v-bind="{'recents': recents}"/> 
          </div>
        </div>
                
    </div>
  </div>
</template>

<script>

import Sidebar from '../Sidebar/Sidebar.vue'
import Navigation from '../../router/Navigation.vue'
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
    },
  }
}
</script>

<style scoped>
.columns {
    height: calc(100% - 5rem);
    margin: 0;
}
.general-wrapper {
  width: 100%;
  padding: 15px;
}
.sidebar {
  padding-right: 0;
}
.title-wrapper {
  display:flex;
  justify-content: space-between;
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
