<template>
  <div>
    <section class="flex flex-col bg-subColor border rounded-xl border-solid border-editorColor mt-20 ml-60 mr-60 mb-56">
      <div class="mb-10">
        <multiple-choice></multiple-choice>
        <short-answer></short-answer>
        <paragraph></paragraph>
        <matching></matching>
        <true-false></true-false>
        <coding-question></coding-question>
      </div>
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

export default {
  name: 'YourExam',
  components: {
    MultipleChoice,
    ShortAnswer,
    Paragraph,
    Matching,
    TrueFalse,
    CodingQuestion,
  },
  mounted() {
    //
  },
};

</script>
