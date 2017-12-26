<template>
    <div>
        <h1>{{test}}</h1>
        <li v-if="!isTestOver" class="list-container" v-for="(q, i) in questionsList" :key="i">
            <div class="main-q" v-if="currentQuestionIndex === i">
                <div class="question">
                    <div class="q-q">
                        <p>Q: {{q.question}}</p>
                    </div>
                </div>

                <div class="answer">
                    <div class="text-area">
                        <textarea 
                          placeholder="Enter Answer Here"
                          ref='focus'
                          v-model="answer">
                        </textarea>
                        <div v-if="showErrorMsg && !answer" class="error"> This filed is required </div>
                    </div>
                    <div>
                        <a v-if="i>0" 
                          @click.prevent="previous()" 
                          class="previous">&laquo; Previous
                        </a>
                        <!-- <a v-if="i !== questionsList.length-1"  -->
                        <a
                          @click.prevent="next(q.id)" 
                          class="next">Next &raquo;
                        </a>
                        <!-- <a v-if="i == questionsList.length-1" 
                          @click.prevent="done()" 
                          class="next">Save and Submit
                        </a> -->
                    </div>
                </div>
            </div>
        </li>
        <div v-if="isLast && !isTestOver" class="list-over">
            <a @click.prevent="showPreview()" class="previous"> Show Preview</a>
            <a @click.prevent="done()" class="next">Save and Submit</a>
        </div>
        <div class="test-over" v-if="isTestOver">
          <h3>Test was submitted, Thanks for your time..</h3>
          <a href="/"> Goto Home </a>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'test-page',
  data () {
    return {
      test: undefined,
      currentQuestionIndex: 0,
      answer: '',
      isTestOver: false,
      showErrorMsg: false,
      questionsList: [
        {
          id: 1,
          question: 'What is are advantages of Javascript?'
        },
        {
          id: 2,
          question: 'What is are promises in Javascript?'
        },
        {
          id: 3,
          question: 'What is are closures in Javascript?'
        }
      ],
      answersList: []
    }
  },
  created () {
    this.test = this.$route.params.testId;
  },
  mounted() {
    this.setFocus()
  },
  computed: {
    isLast: function() {
      return this.questionsList.length === this.answersList.length;
    }
  },
  methods: {
    previous: function () {
      --this.currentQuestionIndex;
      this.answer = this.answersList[this.currentQuestionIndex] && this.answersList[this.currentQuestionIndex].answer ? this.answersList[this.currentQuestionIndex].answer : this.answer;
    },
    next: function (id) {
      if(!this.answer && this.answer === '') {
          this.showErrorMsg = true
          return;
      };
      if (this.answersList[this.currentQuestionIndex] && this.answersList[this.currentQuestionIndex].answer) {
          this.answersList[this.currentQuestionIndex].answer = this.answer;
      } else {
          this.answersList.push({id, answer: this.answer});
      }
      ++this.currentQuestionIndex;
      this.showErrorMsg = false;
    },
    done: function () {
      this.isTestOver = true;
      console.log(this.answersList);
      this.answersList = [];
    },
    updateAnswer: function() {
      this.answer = this.answersList[this.currentQuestionIndex] && this.answersList[this.currentQuestionIndex].answer || '';
    },
    showPreview() {
        alert('In Progress');
    },
    setFocus() {
       this.$refs.focus[0].focus();
    }
  },
  watch: {
    currentQuestionIndex: function() {
      this.updateAnswer();
      this.setFocus();
    }
  }
}
</script>

<style scoped>
.list-container {
    list-style: none;
}

.question {
    display: inline;
}

.error {
    font-family: inherit;
    color: #ff0000
}

a {
    text-decoration: none;
    display: inline-block;
    padding: 8px 16px;
    cursor: pointer;
}

a:hover {
    background-color: #ddd;
    color: black;
}

.previous {
    background-color: #f1f1f1;
    color: black;
}

.next {
    background-color: #4CAF50;
    color: white;
}

textarea {
  margin-top: 10px;
  margin-left: 50px;
  width: 500px;
  height: 100px;
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0.07);
  border-color: -moz-use-text-color #FFFFFF #FFFFFF -moz-use-text-color;
  border-image: none;
  border-radius: 6px 6px 6px 6px;
  border-style: none solid solid none;
  border-width: medium 1px 1px medium;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
  color: #555555;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 1em;
  line-height: 1.4em;
  padding: 5px 8px;
  transition: background-color 0.2s ease 0s;
}


textarea:focus {
    background: none repeat scroll 0 0 #FFFFFF;
    outline-width: 0;
}

</style>

