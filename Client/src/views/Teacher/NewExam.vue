<template>
  <div>
    <Header main="Your exam" current="> New exam">
      <button
        @click="onClick('YourExam')"
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
      >
        Preview
      </button>
    </Header>
    <ExamInfoForm v-bind:title="title" v-bind:description="description" />
    <div class="flex flex-col items-center justify-center">
      <QuestionList />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import QuestionList from "@/components/Form/QuestionForm/QuestionList.vue";
import ExamInfoForm from "@/components/Form/YourExamForm/ExamInfoForm";
import InputForm from "@/components/Form/InputForm";

export default {
  name: "NewExam",
  components: {
    QuestionList,
    ExamInfoForm,
    Header,
    InputForm,
  },
  data() {
    return {
      title: "title",
      description: "description",
    };
  },
  methods: {
    onClick(pageName) {
      this.$router.push({ name: pageName }).catch(() => {});
    },
  },
};
</script>
