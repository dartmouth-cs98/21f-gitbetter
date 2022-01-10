<template>
  <div class="main">
    <Navigation />
    <div class="columns">
        <div class="column is-fullheight is-one-third sidebar">
            <Workflows @changeFlow="selected = $event; steps = selected.steps; startTutorial()"/>
        </div>
        <div class="top-wrapper column">
          <div class="general-wrapper">
            <h1 class="title">Walkthorughs</h1>
            <h2 class="subtitle">Need help figuring out what to do? Pick a workflow from the side for step by step instructions.</h2>
            <div class="tutorial" v-show="!finished">
                <div class="step">
                    {{ this.ind + 1}}. {{ this.selected.title }}
                </div>
                <div class="instructions">
                    {{ this.curr.inst }}
                </div>
                <div class="command">
                    <code class="code-block">
                        {{ this.curr.comm }}
                    </code>
                </div>
            </div>
            <div v-show="finished" class="placeholder-step">
                Start a workflow tutorial by selecting an option from the workflows menu.
            </div>
            <div v-if="!finished" class="advance">
                <button v-if="this.ind < this.steps.length - 1" @click="advanceTutorial" class="button">
                    Next step
                </button>
                <button v-else @click="advanceTutorial" class="button">
                    Finish
                </button>
            </div>
          </div>
        </div>
                
    </div>
  </div>
</template>

<script>

import Navigation from './Navigation.vue'
import Workflows from './Workflows.vue'


export default {
  name: 'Home',
  components: {
    Navigation,
    Workflows,
  },
  data () {
    return {
      selected: {},
      steps: [],
      curr: {},
      ind: 0,
      finished: true,
    }
  },
  methods: {
      startTutorial() {
          this.finished = false
          this.curr = this.steps[this.ind];
      },
      advanceTutorial() {
          if( this.ind < this.steps.length - 1 ) {
                this.ind = this.ind + 1;
                this.curr = this.steps[this.ind];
          }
          else {
            this.finished = true;
            this.ind = 0;
          }
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

.code-block {
    background-color: #636363;
    color: #FFFFFF;
    font-size: 18px;
}

.instructions {
    color: #bdbdbd;
    padding: 24px;
}

.step {
    font-size: 18px;
}


.placeholder-step {
    text-align: center;
    font-size: 18px;
}

.title {
  color: white;
}

.command {
    text-align: center;
    padding: 12px;
}

.advance { 
    display: flex;
    justify-content: flex-end;
    padding: 18px;
}

.tutorial {
    height: 58.5%;
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
