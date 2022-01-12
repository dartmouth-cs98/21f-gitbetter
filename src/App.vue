<template>
  <div>
    <vo-basic :data="chartData"></vo-basic>
  </div>
</template>

<script>
import { VoBasic } from 'vue-orgchart'
export default {
  components: { VoBasic },
  created () {
    this.chartData = {
      name: 'JavaScript',
        children: [
          { name: 'Angular' },
          {
            name: 'React',
            children: [{ name: 'Preact' }]
          },
          {
            name: 'Vue',
            children: [{ name: 'Moon' }]
          }
        ]
    }
}
}
</script>