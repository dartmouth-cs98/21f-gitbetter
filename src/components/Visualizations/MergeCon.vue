<template>
    <div >
        Merge Interface
        {{this.mergeSteps.title}}
        <div> {{this.mergeSteps.steps[index].step}}</div>
        <button v-if="this.index > 0" @click="backStep">Back</button>
        <button v-if="this.index + 1< this.content.length" @click="nextStep">Next</button>

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
            currStep: mergeInterface.steps[0],
            index: 0,
            }
            },
    methods: {
        nextStep() {
            console.log("do we reach this point?");
            this.index = this.index + 1
            console.log(this.index)
            console.log(this.content.length)
        },
        backStep() {
            console.log("we are going back");
            this.index = this.index - 1
        }
    }
}
/* Okay so the way one can do it is by changing the value of the {{this.content}}, we will also have buttons
button back and button next*/
</script>


