<template>
    <div class="sidebar">
    <aside class="menu">
    <div class="workflow-heading">Workflows</div>
        <div v-for="flow in workflows" :key="flow.id" class="menu-wrapper"> 
          <div class="menu-label"> {{ flow.title }} </div>
       <div class="menu-list">
          <div class="workflow-option" v-for="tutorial in flow.opts" :key="tutorial.id" @click="$emit('changeFlow', tutorial)">
              {{ tutorial.title }}
          </div>
        </div>
         </div>
      </aside>
    </div>
</template>

<script>
import { workflows } from '../../constants/workflows.js'

export default {
  name: 'Workflows',
  data () {
    return {
        workflows: workflows,
        current: {},
    }
  },
  
  methods: {
    changeFlow(flow) {
        this.current = flow
    }
  }
}
</script>
<style lang="scss" scoped>
  .sidebar {
      background-color: #272727;
      color: white;
      border-color: green;
      padding: 5%;
      height: 100%;
      border-width: 1px;
      border-style: solid;
      overflow: auto;
      max-height: 95%;
  }
  .sidebar::-webkit-scrollbar {
  display: none;
}
.menu::-webkit-scrollbar {
  display: none;
}
.menu {
  overflow: auto;
}
  .menu-wrapper {
    margin-bottom: 1em;
  }
  .workflow-heading {
    margin-bottom: 0.5em;
    font-size: 22px;
    font-weight: 500;
    cursor: default;
  }

  .menu-label {
    cursor: default;
    color: #c5c5c5;
    font-size: 0.85em;
  }
 
  .workflow-option {
      cursor: pointer;
      padding: 1px;
      width: 96%;
      padding-left: 6px;
      white-space: initial; 
      border-bottom: rgba(0,256,0,0.3) 0.5px solid;
      font-size: 0.9em;
  }
  b, div {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
    overflow: hidden;
  }
</style>