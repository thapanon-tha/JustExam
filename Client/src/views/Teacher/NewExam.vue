<template>
  <div>
    <!-- <Header main="Your exam" current="> New exam" button="Back" to="YourExam" /> -->
      <ExamInfoForm/>
    <div class="flex flex-col items-center justify-center">
      <QuestionList/>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header/Header.vue';
import QuestionList from '@/components/Form/QuestionForm/QuestionList.vue';
import ExamInfoForm from '@/components/Form/YourExamForm/ExamInfoForm';

export default {
  name: 'NewExam',
  components: {
    QuestionList,
    ExamInfoForm,
    Header,
  },
};

</script>
