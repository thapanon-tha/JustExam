<template>
  <div>
    <Header main="Your exam" current="> New exam" />
  </div>
</template>

<script>

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
