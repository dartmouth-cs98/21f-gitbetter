<template>
    <div class="top-layer">
        <div class="title-area">{{this.mergeSteps.title}}</div>
        <div class="content"> {{this.mergeSteps.steps[this.index].step}}</div>
        <div class="sentence">
            <div class="mark-down">
                <p v-for="(sentence, i) in this.mergeSteps.steps[index].mark" v-bind:key="i">{{sentence}}</p>
                <div v-if="this.index == 3"> 
                    <p v-for="(file, i) in this.conflictingFiles" v-bind:key="i">git add {{file}}</p>
                </div> 
            </div>
        </div>
        <div id="button-area">
                <button v-if="this.index > 0" @click="backStep"  class="button">Back</button>
                <div class="separator"></div>
                <button v-if="this.index + 1< this.content.length" @click="nextStep"  class="button">Next</button>
                <button v-if="this.index + 1 == this.content.length" @click="finishStep" class="button">DONE</button>
            
        </div>  
    </div>

</template>
<script>
import { mergeInterface } from '../../constants/mergeConflict.js'

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
            conflictingFiles: [],
            }
    },
    mounted(){
       this.modifiedData(); 
       this.getConflictingFiles();
    },
    methods: {
        modifiedData(){
            this.mergeSteps.steps[0].mark = this.mergeData;
        },
        finishStep(){
            this.$emit('done');
        },
        getConflictingFiles(){
            for(let i = 0; i < this.mergeData.length; i++){
            
            let arrayOfWords = this.mergeData[i].split(" ");

                // signal that there is a merge conflict and save that file for MergeCon.vue
                if (arrayOfWords[0] === 'CONFLICT'){
                  
                  this.conflictingFiles.push(arrayOfWords[arrayOfWords.length - 1]);
                  }
              console.log("Testing what gets saved" + this.conflictingFiles);
                
              }
        },
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
    height:35%;
    font-size: 1.1rem;
    color: white;
    padding: 10px 20px;
}
.mark-down {
    background-color: #636363;
    color: #FFFFFF;
    font-size: 18px;
    padding: 0px 12px;
}

.sentence {
    text-align: left;
    padding: 2% 2%;
}

#button-area{    
    position: absolute;
    display: flex;
    flex-direction: row;
    bottom: 10%;
    padding: 18px;
   
}

.separator{
     width: 10px;

}

</style>


