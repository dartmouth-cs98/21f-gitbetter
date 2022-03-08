
<template>
    <div class="quiz">
      <div class="quiz-wrapper" v-if="!started">
        <div class="title">Welcome to the quiz!</div>
          <div class="paragraph">
            This quiz will test your knowledge of some of the 
            commands that we covered during our walkthroughs. Good luck!
          </div>
          <div class="button" @click="startQuiz" style="padding:12px;">Start</div> 
          <div class="button" @click="$router.push('/beginner')" style="position:absolute; bottom:12px; right:12px;">Back to GitLearning</div>
      </div>
      <div v-else class="quiz-wrapper">
        <div class="title" style="width: 90%;text-align: left;">Quiz <span v-if="quizSubmitted" style="float:right;">Your score: <span class="numerator">{{this.correct}}</span><span class="slash-entity">⁄</span><span class="denominator">{{this.total}}</span></span></div>
        <div class="quiz-background">
          <div v-for="q in questions" :key="q.id" class="questions">
            <Quiz 
              v-bind:question="q" 
              v-bind:submitted="quizSubmitted"
              @sendResults="getScore"
            />
          </div>
        </div>
        <button v-if="!quizSubmitted" class="button submit" @click="submit">
          Submit
        </button>
        <button v-else class="button submit" @click="reset">
          Exit Quiz
        </button>
      </div>
    </div>
</template>

<script>
import { questions } from '../../constants/quiz'
import Quiz from './Quiz.vue'
export default {
  data() {
    return {
      started: false,
      title:'',
      correct:0,
      total: 0,
      questions: {},
      quizSubmitted: false,
    }
  },
  components: {
    Quiz,
  },
  computed: {
    score() {
      return this.correct / this.total;
    }
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
      this.total = Object.keys(this.questions).length;
    },
    getScore(val) {
      this.correct += val
    },
    reset() {
      this.correct = 0
      this.started = false
      this.quizSubmitted = false
    }
  }

};

</script>

<style scoped>
.quiz {
    height: 100%;
    background-color: #272727;
}

.title {
  color: white !important;
}
.quiz-background {
    background-color: white;
    width: 90%;
    overflow-y: scroll;
    height: 100%;
}

.quiz-background::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.questions {
  padding: 5% 2%;
  width: 95%;
  padding: 5%;
    background-color: #dbdbdb;
    color: black;
    margin: 2% 2.5%;
}

.quiz-wrapper {
  padding: 3% 3% 12px 3%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.subtitle {
    margin: 20px;
}

.paragraph {
    color: #dbdbdb;
    text-align: center;
    margin-bottom: 1.5rem;
    width: 70%;
}

.button {
     background-color: #AD47BC !important;
    color: white !important;
    text-decoration: none;
    width: 18%;
}
.submit {
  margin-top: 12px;
  margin-right: 0px;
  margin-left: auto;
}
</style>
 