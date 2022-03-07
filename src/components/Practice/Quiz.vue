
<template>
    <div>
        <div class="question-subtitle">
            {{ question.number }}. {{ question.title }}
            <span v-if="submitted && correct" style="color: green;" class="res">
                <font-awesome-icon icon="check"/>
            </span>
            <span v-if="submitted && !correct" style="color: red;" class="res">
                <font-awesome-icon icon="times"/>
            </span>
        </div>
        <div class="options">
            <label v-for="opt in question.options" :key="opt.id" :value="opt" class="radio-buttons">
                <input @change="changeResponse($event)" type="radio" :name="question.title" :value="opt">
                {{ opt }}
            </label>
        </div>
    <div  v-if="submitted && !correct" class="answer">
       The correct answer was: {{ this.question.res }}
    </div>
    </div>
</template>

<script>

export default {
  props: {
      question: Object,
      submitted: Boolean,
  },
  data() {
      return {
          response: "",
          correct: true,
      }
  },
  watch: {
      submitted: function() {
        console.log('submitted', this.response, this.question.res)
        if(this.question.res == this.response) {
            this.$emit('sendResults', 1);
            this.correct = true;
        }
        else {
            this.$emit('sendResults', 0);
            this.correct = false;
        }
      }
  },
  methods: {
      changeResponse(event) {
          this.response = event.target.value
      }

  }
};
</script>

<style>
.options { 
    display: flex;
    flex-direction: column;
    padding-left: 10%;
}

.question-subtitle {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
}

.questions {
    padding: 5%;
    background-color: #dbdbdb;
    color: black;
    margin: 2% 2.5%;
}

.res {
    float: right;
    font-size: 2rem;
    top: -2rem;
    position: relative;
}

.answer {
    position: relative;
    top: 1rem;
}
</style>
 