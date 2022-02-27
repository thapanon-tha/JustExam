<template>
  <div class="mb-96">
    <Header main="Your exam" button="+ New exam" to="NewExam" />
    <div class="grid grid-cols-4 gap-5 ml-40 mr-40 mt-20">
      <div @click="onClick('InsideYourExam')" v-for="box in boxlist" :key="box">
        <CardExam
        />
      </div>
    </div>
  </div>
</template>

<script>

import ActionButton from '@/components/Button/ActionButton.vue';
import Header from '@/components/Header/Header';
import QuestionList from '@/components/Form/QuestionForm/QuestionList.vue';
import SectionForm from '@/components/Form/YourExamForm/SectionForm.vue';
import CardExam from '@/components/Card/CardExam';
export default {
  name: 'YourExam',
  components: {
    QuestionList,
    SectionForm,
    ActionButton,
    CardExam,
    Header,
  },
  data() {
    return {
      qlist: [],
      boxlist: 4,
    };
  },
  methods: {
    onClick(pageName) {
      this.$router.push({ name: pageName }).catch(() => {});
    },
  },
  mounted() {
    //
  },
};

</script>
