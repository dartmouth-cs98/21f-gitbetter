<template>
    <div class="top-layer">
        <div class="title-area">{{this.mergeSteps.title}}</div>
        <div class="content"> {{this.mergeSteps.steps[index].step}}</div>
        <div id="button-area">
            <button v-if="this.index > 0" @click="backStep"  class="button">Back</button>
            <button v-if="this.index + 1< this.content.length" @click="nextStep"  class="button">Next</button>
        </div>  
    </div>

</template>
<script>
import { mergeInterface } from '../../constants/mergeConflict.js'

export default {
    name: 'MergeCon',
    data () {
        return {
            mergeSteps: mergeInterface,
            content: mergeInterface.steps,
            index: 0,
            }
    },
    methods: {
        nextStep() {
            this.index = this.index + 1
        },
        backStep() {
            this.index = this.index - 1
        },
    }
}

</script>
<style scoped>
.top-layer{
    height:100%;
}
.title-area{
    font-size: 2rem;
    color: white;
}
.content{
    height:80%;
}

.button-area{
    width:100%;
    /* display:flex;
    flex-direction: row;
    align-content:space-between;
    justify-content: space-between; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center
}

</style>


