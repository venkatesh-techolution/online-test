<template>
    <div>
        <h1>{{test}}</h1> <span v-if="!isTimeOver">Time Left : {{ timer }} / 90:00 </span> 
        <li v-if="!isTestOver && !isTimeOver" class="list-container" v-for="(q, i) in questionsList" :key="i">
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
                          @click.prevent="next(q.id, q.question)" 
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

        <!-- after last question -->
        <div v-if="isLast && !isTestOver && !isPreview" class="list-over">
            <a @click.prevent="showPreview" class="previous"> Show Preview</a>
            <a @click.prevent="done" class="next">Save and Submit</a>
        </div>

        <!-- Preivew Section here -->
        <div class="preview" v-if="isPreview">
            <app-preview :answersList="answersList" @closePreview="showPreview($event)"></app-preview>
        </div>
        
        <!-- Test done -->
        <div class="test-over" v-if="isTestOver">
          <h3>Test was submitted, Thanks for your time..</h3>
          <a href="/"> Goto Home </a>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

import Preview from './Preview';

export default {
  name: 'test-page',
  data () {
    return {
      test: undefined,
      currentQuestionIndex: 0,
      answer: '',
      isTestOver: false,
      showErrorMsg: false,
      timer: '90:00',
      timerID: undefined,
      isTimeOver: false,
      isPreview: false,
      duration: 5.4e+6, // 5400000in milliseconds
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
  components: {
      'app-preview': Preview
  },
  created () {
    this.test = this.$route.params.testId;
  },
  mounted() {
    this.startTimer();
    this.setFocus();
  },
  computed: {
    isLast: function() {
      return this.isLastChek();
    }
  },
  methods: {
    previous: function () {
      --this.currentQuestionIndex;
      this.answer = this.answersList[this.currentQuestionIndex] && 
                    this.answersList[this.currentQuestionIndex].answer 
                    ? this.answersList[this.currentQuestionIndex].answer : this.answer;
    },
    next: function (id, question) {
      if(!this.answer && this.answer === '') {
          this.showErrorMsg = true
          return;
      };
      if (this.answersList[this.currentQuestionIndex] && this.answersList[this.currentQuestionIndex].answer) {
          this.answersList[this.currentQuestionIndex].answer = this.answer;
      } else {
          this.answersList.push({id, question, answer: this.answer});
      }
      ++this.currentQuestionIndex;
      this.showErrorMsg = false;
      return;
    },
    done: function () {
      this.isTestOver = true;
      this.isTimeOver = true;
      clearInterval(this.timerID);
      // need to save the data on server
      this.answersList = [];
      return;
    },
    updateAnswer: function() {
      this.answer = this.answersList[this.currentQuestionIndex] && this.answersList[this.currentQuestionIndex].answer || '';
      return;
    },
    showPreview(updatedAnswers) { 
        this.isPreview = !this.isPreview;
        if(!(updatedAnswers instanceof Event)) {
           this.answersList = updatedAnswers;
        }
        return;
    },
    setFocus() {
       this.$refs.focus[0].focus();
    },
    startTimer() {
        this.timerID = setInterval(() => {
            this.updateTime();
        }, 1000);
    },
    isLastChek() {
        if(this.isTimeOver){
            return true;
        };
        return this.questionsList.length === this.answersList.length;;
    },
    updateTime() {
        if (this.duration) {
          this.duration = this.duration - 1000;
          let min = (this.duration / 1000 / 60);
          let r = min % 1;
          let sec = Math.floor(r * 60);
          if (sec < 10) {
            sec = '0'+sec;
          }
          min = Math.floor(min);
          this.timer = min+':'+sec;
        } else {
            this.isTimeOver = true;
            clearInterval(this.timerID);
            alert('Your time is over :-(');
        }
        return;
    }
  },
  watch: {
    currentQuestionIndex: function() {
      this.updateAnswer();
      this.setFocus();
      return;
    }
  },
  beforeDetroy() {
      clearInterval(this.timerID)
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

© 2017 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About