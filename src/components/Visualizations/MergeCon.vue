<template>
    <div class="top-layer">
        <div class="title-area">{{this.mergeSteps.title}}</div>
        <div class="content"> {{this.mergeSteps.steps[this.index].step}}</div>
        <div>{{mergeData.toString()}} </div>
        <div class="command">
            <div class="mark-down">
                {{ this.mergeSteps.steps[index].mark }}</div>
            </div>
        <div id="button-area">
            <button v-if="this.index > 0" @click="backStep"  class="button">Back</button>
            <button v-if="this.index + 1< this.content.length" @click="nextStep"  class="button">Next</button>
        </div>  
    </div>

</template>
<script>
import { mergeInterface } from '../../constants/mergeConflict.js'
import { marked } from 'marked';

export default {
    name: 'MergeCon',
    props: {
        mergeData: Array,
    },
    data () {
        return {
            mergeSteps: mergeInterface,
            content: mergeInterface.steps,
            index: 0,
            markdown:  " `Hello World`",
            }
    },
    computed: {
        
    },
    methods: {
        nextStep() {
            this.index = this.index + 1
        },
        backStep() {
            this.index = this.index - 1
        },
        markdownToHtml(text){
            console.log(text);
            return marked(text);
        },
    }
}

</script>
<style scoped>
.top-layer{
    height:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
}
.title-area{
    font-size: 2rem;
    color: white;
    padding: 2%;
}
.content{
    height:80%;
    color: white;
}
.mark-down {
    background-color: #636363;
    color: #FFFFFF;
    font-size: 18px;
    padding-right: 12px;
}

.command {
    display: flex;
    justify-content: center;
    padding-top: 10%;
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


