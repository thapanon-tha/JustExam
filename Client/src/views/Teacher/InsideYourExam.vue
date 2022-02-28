<template>
  <div>
    <!-- <Header main="Your exam" current="> New exam" button="Back" to="YourExam" /> -->
    <NewExam/>
  </div>
</template>

<script>

import QuestionList from '@/components/Form/QuestionForm/QuestionList.vue';
import NewExam from '@/views/Teacher/NewExam';

export default {
  name: 'InsideYourExam',
  components: {
    QuestionList,
    NewExam,
  },
  data() {
    return {
      qlist: [],
    };
  },
};

</script>
