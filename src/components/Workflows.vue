<template>
    <div class="sidebar">
        <div class="workflow-heading"> 
          Workflow tutorials
        </div>
        <div class="spacer">___________________________________</div>
      <div class="workflow-option" v-for="flow in workflows" :key="flow.id" @click="$emit('changeFlow', flow)">
          {{ flow.title }}
      </div>
    </div>
</template>

<script>
import { workflows } from '../assets/workflows.js'

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
  .workflow-heading {
        font-size: 18px;
        font-weight: 500;
        cursor: default;
  }
  .spacer {
    color: #636363;
    line-height: 8px;
    font-size: 8px;
    cursor: default;


  }
  .workflow-option {
      cursor: pointer;
      padding: 1px;
  }
  b, div {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: block;
    overflow: hidden;
  }
</style>