<template>
  <div class="main">
    <Navigation />
    <div class="columns">
        <div class="column is-fullheight is-one-fifth sidebar">
            <Workflows @changeFlow="selected = $event; steps = selected.steps; startTutorial()"/>
        </div>
        <div class="top-wrapper column">
          <div class="general-wrapper">
            <div class="title-wrapper">
              <div class="title">Tutorials</div>           
              <button class="button" title="Return to terminal" v-on:click="$router.push('/home')"><font-awesome-icon icon="home"/></button>
            </div>
            <h2 class="subtitle">Need help figuring out what to do? Pick a workflow from the side for step by step instructions.</h2>
            <div class="tutorial" v-show="!finished">
                <h1 class="title">
                    {{ this.selected.title }}
                </h1>
                <div class="subtitle step" id="content">
                    {{ this.ind + 1}}. {{ this.curr.inst }}
                </div>
                <div class="command" v-if="commandExists">
                    <code class="code-block">
                        {{ this.curr.comm }}
                    </code>
                    <div class="button copy-icon" title="Copy command to clipboard" @click="copyCommand">
                     <font-awesome-icon icon="copy"/>
                    </div>
                </div>
            </div>
            <div v-show="finished" class="placeholder-step">
                Start a workflow tutorial by selecting an option from the workflows menu.
            </div>
            <div v-if="!finished" class="advance">
              <button v-show="this.ind > 0" @click="goBack" class="button">
                    Back 
                </button>
                <button @click="advanceTutorial" class="button">
                    {{ this.buttonName }} 
                </button>
            </div>
          </div>
        </div>
                
    </div>
  </div>
</template>

<script>

import Navigation from '../../router/Navigation.vue'
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
      buttonTxt: 'Next step',
    }
  },
  computed: {
        buttonName() {
            return (this.ind < this.steps.length - 1) ? 'Next' : 'Finish';
        },
        commandExists() {
            try {
                return this.curr.comm !== ""
            }
            catch(error) {
                return false;
            }
            
        }

  },
  methods: {
      startTutorial() {
          this.finished = false;
          this.ind = 0;
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
      },
      goBack() {
        this.ind = this.ind - 1;
        this.curr = this.steps[this.ind];
      },
      copyCommand() {
            const el = document.createElement('textarea');
            el.value = this.curr.comm;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
      }
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
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.title-wrapper {
  display:flex;
  justify-content: space-between;
}
.button {
  margin-right: 1em;
}

.sidebar {
  padding-right: 0;
}
.top-wrapper {
  display:flex;
  background-color: #272323;
  flex-grow: 1;
  border-color: green;
  border-width: 1px;
  border-style: solid;
  color: white;
}

.code-block {
    background-color: #636363;
    color: #FFFFFF;
    font-size: 18px;
    padding-right: 12px;
}

.instructions {
    color: #bdbdbd;
    padding: 24px;
}

/* .step {
    font-size: 18px;
} */

.copy-icon {
    margin-left: 12px;
}

.placeholder-step {
    text-align: center;
    font-size: 18px;
}

.title {
  color: white;
}

.command {
    display: flex;
    justify-content: center;
    padding-top: 10%;
}

.advance { 
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 18px;
}

.tutorial {
    flex-grow: 0.825;
}
.subtitle {
  color:white;
}
#content{
  padding-top: 2%;
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
