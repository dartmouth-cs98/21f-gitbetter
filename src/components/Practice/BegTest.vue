
<template>
    <div class="quiz">
      <div class="quiz-wrapper" v-if="!started">
        <div class="title">Welcome to the quiz!</div>
          <div class="paragraph">
            This quiz will test your knowledge of some of the 
            commands that we covered during our walkthroughs. Good luck!
          </div>
          <div class="commandopts">
            <div>
              <div class="select-label">Pick a difficulty:</div>
            <div class="select">
                <select name="difficulty" id="difficulty" placeholder="Difficulty" v-model="qdifficulty" v-on:change="difficultyChange(qdifficulty)" class="form-control">
                  <option v-for="qdifficulty in quizOptions.difficulty" :key="qdifficulty.id" v-bind:value="qdifficulty">{{qdifficulty.label}}</option>
                </select>
              </div>
            </div>
            <div>
              <div class="select-label">Pick a type:</div>
              <div class="select">
                <select name="type" id="type" v-model="type" v-on:change="typeChange(type)">
                  <option v-for="type in quizOptions.quizType" :key="type.id" v-bind:value="type">{{type.label}}</option>
                </select>
              </div>
            </div>
              <div>
              <div class="select-label">Pick a length:</div>
                <div class="select">
                <select name="length" id="length" v-model="qLen" v-on:change="lengthChange(qLen)">
                  <option v-for="qLen in quizOptions.quizLength" :key="qLen.id" v-bind:value="qLen">{{qLen.label}}</option>
                </select>
              </div>
              </div>
          </div>
          <div class="button" @click="startQuiz" style="padding:12px;">Start</div> 
          <div class="button" @click="$router.push('/beginner')" style="position:absolute; bottom:12px; right:12px;">Back to GitLearning</div>
      </div>
      <div v-else class="quiz-wrapper">
        <div class="title" style="width: 90%;text-align: left;">Quiz <span v-if="quizSubmitted" style="float:right;">Your score: <span class="numerator">{{this.correct}}</span><span class="slash-entity">⁄</span><span class="denominator">{{this.total}}</span></span></div>
        <div class="quiz-background">
          <div v-for="(q, index) in questions" :key="index" class="questions">
            <Quiz 
              :number="index+1"
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
import quizOptions from './quizOptions.js'

export default {
  data() {
    return {
      started: false,
      title:'',
      correct:0,
      total: 0,
      questions: {},
      quizSubmitted: false,
      quizOptions,
      qLen: 10,
      type: 'general',
      qdifficulty: 'random',
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
      const _this = this
      const difs = []
      if(this.qdifficulty.value == 'hard') {
        difs.push('easy', 'medium', 'hard');
      }
      else if(this.qdifficulty.value == 'medium') {
        difs.push('easy', 'medium');
      }
      else {
        difs.push('easy')
      }
      let qs = questions.filter(function(item){
        if(_this.type.value == 'general' && _this.qdifficulty.value !== 'random') {
          return difs.includes(item.difficulty)
        }
        else if (_this.type.value !== 'general' && _this.qdifficulty.value !== 'random') {
          return difs.includes(item.difficulty) && item.label == _this.type.value; 
        }  
        else if(_this.type.value !== 'general' && _this.qdifficulty.value == 'random') {
          return item.label == _this.type.value
        }    
        else {
          return item
        }  
      })

      const shuffled = qs.sort(() => 0.5 - Math.random());
      this.questions = shuffled.slice(0, this.qLen.value);

      this.started = true;
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
    },
    difficultyChange(dif) {
      this.qdifficulty = dif;
    },
    typeChange(type) {
      this.type = type;
    },
    lengthChange(len) {
      this.qLen = len;
    },
  }

};

</script>

<style scoped>
.quiz {
    height: 100%;
    background-color: #565656;
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

.select {
  margin: 12px;
  color: #272727;
}

.select select {
  border-color: green;
  background-color: #272727;
  color: white;
}

.select:not(.is-multiple):not(.is-loading)::after {
  border-color: #ab47bc;
}

.quiz-background::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}
.select-label {
  color: white;
}
.commandopts {
  width: 70%;
  margin: 5%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
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
 