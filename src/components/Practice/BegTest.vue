
<template>
    <div class="quiz">
      <div v-if="!started">
        <div class="subtitle">Welcome to the Quiz!</div>
          <div class="paragraph">This quiz will test your knowledge of some of the commands that we covered during our walkthroughs. Good luck!</div>
          <div class="button" @click="startQuiz">Start</div> 
      </div>
      <div v-else>
        <div v-for="q in questions" :key="q.id">
          <Quiz v-bind:question="q" v-bind:submitted="quizSubmitted"/>
        </div>
        <button class="button" @click="submit">
          Submit
        </button>
      </div>
        <!-- <div v-if="questions"> 
          <question
              :question="questions[currentQuestion]"
              v-on:answer="handleAnswer"
              :question-number="currentQuestion+1"
          ></question> 
        </div> -->

        <!-- <div v-if="results">
          You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%.
        </div>
    </div> -->
    </div>
    
    
</template>

<script>
import { questions } from '../../constants/quiz'
import Quiz from './Quiz.vue'
export default {
  data() {
    return {
      started: false,
      introStage:false,
      questionStage:false,
      resultsStage:false,
      title:'',
      
      currentQuestion:0,
      correct:0,

      questions: {},
      quizSubmitted: false,
    }
  },
  components: {
    Quiz,
  },
  methods: {
    startQuiz() {
      // this.introStage = false;
      this.started = true;
      this.questions = questions;
      // this.questionStage = true;
    },
    submit() {
      this.quizSubmitted = true;
    }
    // handleAnswer(e) {
    //   console.log('answer event ftw', e);
    //   this.answers[this.currentQuestion]=e.answer;
    //   if((this.currentQuestion+1) == this.questions.length) {
    //     this.handleResults();
    //     this.questionStage = false;
    //   } else {
    //     this.currentQuestion++;
    //   }
    // },
    // handleResults() {
    //   console.log('handle results');
    //   this.questions.forEach((a, index) => {
    //     if(this.answers[index] == a.answer) this.correct++;
    //   });
    //   this.perc = ((this.correct / this.questions.length)*100).toFixed(2);
    //   console.log(this.correct+' '+this.perc);
    // }
  }

};

</script>

<style>
/* @import '../../node_modules/xterm/css/xterm.css';
@import "../../node_modules/vue-notion/src/styles.css"; */

.quiz {
    color: rgb(45, 22, 170);
    margin: 200px;
    margin-left: 200px;
}

.subtitle {
    color: rgb(16, 29, 206);
    margin: 20px;
}

.paragraph {
    color: rgb(201, 31, 172);
}

.button {
    color: rgb(16, 29, 206);
    font-weight:800;
    text-decoration: none;
}

/* .button {
    margin: 12px; 
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
} */

</style>
 