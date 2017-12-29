<template>
  <section>
      <div class="container">
              <button class="close" @click.prevent="done">Done</button>
          <ul>
              <li v-for="(a, i) in updateAnserList" :key="i">
                    <div class="question">
                        <div v-if="!isEditable">
                            <p style="color:red">Q: {{a.question}}</p>
                            <p style="color:green">A: {{a.answer}} 
                                <span><button @click="edit(i)">Edit</button></span>
                            </p>
                        </div>
                        <div v-if="isEditable && i === editableIndex">
                            <p style="color:red">Q: {{a.question}}</p>
                            <input type="text"  v-model="editedAnswer"/>
                            <span><button @click="save(i)">Save</button></span>
                        </div>
                    </div>
              </li>
          </ul>
      </div>
  </section>
</template>

<script>
/* eslint-disable */

export default {
  name: 'preview',
  props: {
      answersList: {
          type: Array,
          required: true
      }
  },
  data() {
      return {
          editedAnswer: undefined,
          isEditable: false,
          editableIndex: undefined,
          answer: undefined,
          updateAnserList: []
      }
  },
  created() {
      this.updateAnserList = this.answersList;
  },
  methods: {
      done: function() {
        this.$emit('closePreview', this.updateAnserList);
        return;
      },
      edit: function(i) {
        this.editedAnswer = this.updateAnserList[i].answer;
        this.editableIndex = i;
        this.isEditable = true;
        return;
      },
      save: function(i) {
        this.updateAnserList[i].answer = this.editedAnswer;
        this.isEditable = false;
        return;
      }
  }
}
</script>
<style scoped>

ul {
    list-style-type: none;
}

div.container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    width: 70%;
    margin-left:auto;
    margin-right:auto;
}

</style>

