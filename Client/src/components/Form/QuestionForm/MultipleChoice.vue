<template>
  <div class="flex justify-center">
    <section class="bg-white shadow-sm border rounded-xl border-editorColor mt-10">
    <div class="ml-10 mr-10 mt-10 mb-10"> 
      <h1 class="text-mainColor font-semilight text-l mb-3">{{ no }}</h1>
      <div class="flex justify-center gap-5 mb-20">
        <div class="border-l-4 border-mainColor h-10">
          <QuillTextEditor
            placeholder="Question"
            theme="snow"
            width="8/9"
            height="40"
            v-model="question"
          />
        </div>
        <div class="flex flex-col">
          <SelectQuestion
          />
          <ActionButton
            class="mt-3 bg-white border-orange-200
                  border border-solid rounded-lg px-4 py-3
                  font-semilight text-mainColor"
            name="Copy exam"
            @on-cick="copyQuestion"
          />
          <ActionButton
            class="mt-3 bg-white border-orange-200
                  border border-solid rounded-lg px-4 py-3
                  font-semilight text-mainColor"
            name="Delete"
            @on-cick="$emit('delete')"
            
          />
         
        </div>
      </div>
      <div  class="flex flex-row" v-for="(item, index) in answers" :key="index">
        <div class="shadow-sm border-mainColor border-l-4 mb-3 ">
          <QuillTextEditor
            class="bg-mainColor"
            :placeholder="`Option ${index + 1}`"
            theme="bubble"
            width="80"
            height="2/4"
            v-model="answers[index]"
            :input="answers[index]"
        /> 
        </div>
        <div class="ml-20">
          <CheckboxForm
            textCheckbox="correct"
          />
        </div>
        <div class="ml-20">
          <!-- <button @click="deleteChoice(index)" class="text-mainColor">x</button> -->
          <ActionButton
          class="text-mainColor"
          name="X"
          @on-click="deleteChoice(index)"
          />
        </div>
      </div>
      <ActionButton
        class="mt-3 bg-subColor border-orange-200
                border border-solid rounded-lg px-3 py-2
                font-semilight text-mainColor"
        name="+ Add an option"
        @on-click="addChoice"
      />
    </div>
    </section>
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';
import SelectQuestion from '@/components/Form/QuestionForm/SelectQuestion.vue';

export default {
  name: 'MultipleChoice',
  components: {
    QuillTextEditor,
    ActionButton,
    CheckboxForm,
    SelectQuestion,
  },
  props: {
    // id: {
    //       type: String,
    //       required: true
    // },
    no: {
          type: String,
          default: 'no'
        },
  },
  emits: ['delete'],
  data() {
    return {
      question: '',
      answers: [],
    };
  },
  methods: {
    // copyQuestion() {
    //   //console.log('Copy Question');
    // },
    // deleteQuestion() {
    //   //console.log('Delete');
    //   this.qsection.splice(idx, 1);
    // },
    deleteChoice(index) {
      // console.log('Choice');
      console.log('Delete this index', index);
      console.log(this.answers);   
      console.log('Deleting value', this.answers[index]);  
      this.answers.splice(index, 1);
      console.log(this.answers);  
    },
    addChoice() {
      // console.log(this.data);
      this.answers.push({});
    },
    // deleteAddedQuestion(idx) {
    //   // this.loop = this.loop.filter(item => item.id !== questionId);
    //   this.qsection.splice(idx, 1);
    // },
    
  },
  computed: {
  
  },
};

</script>

