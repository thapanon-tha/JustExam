<template>
  <div>
    <Header main="Edit Exam">
      <button
        @click="onClickBack"
        class="
          mt-3
          bg-white
          border-orange-200 border border-solid
          rounded-lg
          px-8
          py-3
          font-semilight
          text-mainColor
        "
      >
        Back
      </button>
    </Header>
    <div>
      <EditExamInfo />
    </div>
    <div class="flex justify-center">
      <EditQuestionList v-model="questions" />
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header/Header.vue";
import EditExamInfo from "@/components/Form/YourExamForm/EditExamInfo.vue";
import EditQuestionList from "@/components/Form/QuestionForm/EditQuestionList.vue";
import api from "@/services/apis";

export default {
  name: "EditExam",
  components: {
    Header,
    EditExamInfo,
    EditQuestionList,
  },
  data() {
    return {
      questions: [],
    };
  },
  methods: {
    onClickBack() {
      this.$router.push({ name: "YourExam" }).catch(() => true);
      //
      // ทำให้กด Back แล้วหน้า New Exam ยัง Save Data
    },
    async callApi() {
      this.questions = await api
        .examList(this.$route.params.eid)
        .then((res) => res.data);
    },
  },
  created() {
  },
};
</script>
