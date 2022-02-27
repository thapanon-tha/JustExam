<template>
  <div>
    <Header main="Your exam" current="> New exam" button="Back" to="YourExam" />
    <ExamInfoForm/>
    <SectionForm class="mb-20"
    />
    <!-- <QuestionList
       :no="`Question ${index + 1}`"
        @delete="deleteQuestion(index)"
    /> -->
    <div class="flex justify-end mb-60 mr-56">
      <OrangeButton
        class=" bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-grayColor"
        name="Cancel"
        to="YourExam"
      />
      <ActionButton
        class="ml-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor"
        name="Create"
        @on-cick="deleteQuestion(index)"
      />
    </div>
  </div>
</template>

<script>

import ActionButton from '@/components/Button/ActionButton.vue';
import OrangeButton from '@/components/Button/OrangeButton.vue';
import Header from '@/components/Header/Header';
import QuestionList from '@/components/Form/QuestionForm/QuestionList.vue';
import SectionForm from '@/components/Form/YourExamForm/SectionForm.vue';
import ExamInfoForm from '@/components/Form/YourExamForm/ExamInfoForm';

export default {
  name: 'InsideYourExam',
  components: {
    QuestionList,
    SectionForm,
    ActionButton,
    OrangeButton,
    Header,
    ExamInfoForm,
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
