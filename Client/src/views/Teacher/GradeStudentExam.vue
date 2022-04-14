<template>
  <div>
    <Header main="Exam channel" current="> Exam Summary > Grade Exam">
      <button
        @click="onClickBack"
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
      >
        Back
      </button>
    </Header>
    <div>
      <div class="ml-72 mt-10">
        <p class="ml-3 font-semibold text-lg text-black w-4/5 break-all">
          {{ examTitle }}
        </p>
        <p class="ml-3 font-semibold text-lg text-black w-4/5 break-all">
          {{ description }}
        </p>
        <p>Student: {{ studentName }}</p>
        <p>Total score: {{ totalScore }}</p>
      </div>
      <GradeQuestionList v-model="questions" :loading="loading" />
    </div>
    <div class="flex gap-10 mt-10 justify-center">
      <ActionButton
        class="ml-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor hover:text-white hover:bg-mainColor"
        name="Save"
        @on-click="onClickSave()"
      />
      <ActionButton
        class="bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-grayColor hover:text-white hover:bg-mainColor"
        name="Cancle"
        @on-click="onClickCancel()"
      />
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header/Header.vue';
import GradeQuestionList from '@/components/Form/GradeExamForm/GradeQuestionList.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import api from '@/services/apis';

export default {
  name: 'GradeStudentExam',
  components: {
    Header,
    GradeQuestionList,
    ActionButton,
  },
  data() {
    return {
      examTitle: 'Exam Title Data',
      description: 'Exam Description Data',
      studentName: 'Thanaporn Cheenthada',
      totalScore: '40',
      loading: false,
      questions: [],
    };
  },
  methods: {
    onClickBack() {
      this.$router
        .push({ name: 'ExamSummary', params: { cid: this.$route.params.cid } })
        .catch(() => true);
    },
    onClickSave() {
      //
    },
    onClickCancel() {
      //
    },
    async callApi() {
      this.loading = true;
      const apiRes = await api.queryExamPaperAndMemberAnswer(
        this.$route.params.cid,
        this.$route.params.mid,
      );
      if (apiRes.status < 300) {
        this.loading = false;
        this.questions = apiRes.data;

        this.questions = this.questions.map((e)=>({ ...e ,studentAnswer: JSON.parse(e.answerQuestionScores[0].answer) }));
      }
    },
  },
  created() {
    this.callApi();
  },
};
</script>
