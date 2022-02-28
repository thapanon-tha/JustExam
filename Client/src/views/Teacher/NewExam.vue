<template>
  <div>
    <Header main="Your exam" current="> New exam" button="Back" to="YourExam" />
    <ExamStepperForm/>
    <div class="flex flex-col items-center justify-center">
      <QuestionList/>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header/Header.vue';
import QuestionList from '@/components/Form/QuestionForm/QuestionList.vue';
import ExamStepperForm from '@/components/Form/YourExamForm/ExamStepperForm.vue';

export default {
  name: 'NewExam',
  components: {
    QuestionList,
    Header,
    ExamStepperForm,
  },
};

</script>
