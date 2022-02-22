<template>
  <div class="mb-96">
    <Header main="Your exam" name="+ New exam" to="NewExam" />
  </div>
</template>

<script>

import ActionButton from '@/components/Button/ActionButton.vue';
import Header from '@/components/Header/Header';
import QuestionList from '@/components/Form/QuestionForm/QuestionList.vue';
import SectionForm from '@/components/Form/YourExamForm/SectionForm.vue';

export default {
  name: 'YourExam',
  components: {
    QuestionList,
    SectionForm,
    ActionButton,
    Header,
  },
  data() {
    return {
      qlist: [],
    };
  },
  methods: {
    //
  },
  mounted() {
    //
  },
};

</script>
