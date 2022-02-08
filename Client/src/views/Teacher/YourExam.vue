<template>
  <div>
    <multiple-choice></multiple-choice>
  </div>
</template>

<script>
import MultipleChoice from '@/components/Form/QuestionForm/MultipleChoice.vue';
// import ShortAnswer from '@/components/Form/ShortAnswer.vue';
// import Paragraph from '@/components/Form/Paragraph.vue';

export default {
  name: 'YourExam',
  components: {
    MultipleChoice,
    // ShortAnswer,
    // Paragraph,
  },
  mounted() {
    //
  },
};

</script>
