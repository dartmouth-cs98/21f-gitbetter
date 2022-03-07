
<template>
    <div strong>Question {{ question.number }} 
        <div class="subtitle">{{ question.title }}</div>
        <div class="options">
            <label v-for="opt in question.options" class="radio" :key="opt.id" :value="opt">
                <input @change="changeResponse($event)" type="radio" :name="question.title" :value="opt">
                {{ opt }}
            </label>
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
      }
  },
  watch: {
      submitted: function() {
        console.log('submitted', this.response, this.question.res)
        if(this.question.res == this.response) {
            console.log('correct')
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
/* @import '../../node_modules/xterm/css/xterm.css';
@import "../../node_modules/vue-notion/src/styles.css"; */

.beginner-tutorial {
    color: white;
    margin: 12px;
}

.subtitle {
    color: white;
}
.options { 
    display: flex;
    flex-direction: column;
}

/* .button {
    margin: 12px; 
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
} */

</style>
 