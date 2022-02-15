<template>
  <div>
    <Header/>
    <NewExamStepper/>
    <section class="flex flex-col bg-subColor border rounded-xl border-solid border-editorColor mt-20 ml-60 mr-60 mb-56">
      <div v-for="(item, index) in questions" :key="index">
        <multiple-choice
        :no="`Question ${index + 1}`"
        @delete="deleteQuestion(index)"
        ></multiple-choice>
      </div>
          <!-- <short-answer></short-answer>
          <paragraph></paragraph>
          <matching></matching>
          <true-false></true-false>
          <coding-question></coding-question> -->
      <action-button
      class="mt-3 ml-10 mr-10 bg-white border-orange-200
                  border border-solid rounded-lg px-3 py-2
                  font-semilight text-mainColor"
      name="+ Add a question"
      @on-click="addQuestion"
      ></action-button>
    </section>
  </div>
  
</template>

<script>
import MultipleChoice from '@/components/Form/QuestionForm/MultipleChoice.vue';
import ShortAnswer from '@/components/Form/QuestionForm/ShortAnswer.vue'
import Paragraph from '@/components/Form/QuestionForm/Paragraph.vue';
import Matching from '@/components/Form/QuestionForm/Matching.vue'
import TrueFalse from '@/components/Form/QuestionForm/TrueFalse';
import CodingQuestion from '@/components/Form/QuestionForm/CodingQuestion';
import ActionButton from '@/components/Button/ActionButton.vue';
import Header from '@/components/Header/Header';
import NewExamStepper from '@/components/Form/YourExamForm/NewExamStepper';

export default {
  name: 'YourExam',
  components: {
    MultipleChoice,
    ShortAnswer,
    Paragraph,
    Matching,
    TrueFalse,
    CodingQuestion,
    ActionButton,
    Header,
    NewExamStepper,
  },
  data() {
    return {
      questions: [],
    };
  },
  methods: {
    addQuestion() {
      // const newQuestion = {
      //   index: new Date().toISOString(),
      //   // no: no,
      // };
      // this.questions.push(newQuestion);
      this.questions = this.questions + 1;
    },
    deleteQuestion(index) {
      // this.questions = this.questions.filter(item => item.index !== questionId);
      this.questions.splice(index, 1);
      console.log('Delete');
    }
  },
  mounted() {
    //
  },
};

</script>
