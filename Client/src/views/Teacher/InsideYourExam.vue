<template>
  <div class="bg-red-100">
    <Header main="Your exam" current="> New exam" button="Back" to="YourExam" />
    <QuestionList />
  </div>
</template>

<script>

import QuestionList from '@/components/Form/QuestionForm/QuestionList.vue';

export default {
  name: 'InsideYourExam',
  components: {
    QuestionList,
  },
  data() {
    return {
      qlist: [],
    };
  },
};

</script>
