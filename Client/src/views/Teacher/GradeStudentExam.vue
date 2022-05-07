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
        <p class="">
          Student: {{ memberDetail.user.firstname }}
          {{ memberDetail.user.surname }}
        </p>
        <p class="">Total score: {{ totalScore }} / {{ totalExamScore }}</p>
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
    <v-snackbar
      v-model="snackbar"
      :color="sColor"
      :timeout="2000"
      absolute
      centered
      top
      text
      outlined
    >
      {{ sTest }}
    </v-snackbar>
    <Loading v-model="loading"></Loading>
  </div>
</template>
<script>
import Header from '@/components/Header/Header.vue';
import GradeQuestionList from '@/components/Form/GradeExamForm/GradeQuestionList.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import api from '@/services/apis';
import Loading from '@/components/Loading.vue';

export default {
  name: 'GradeStudentExam',
  components: {
    Header,
    GradeQuestionList,
    ActionButton,
    Loading,
  },
  data() {
    return {
      examTitle: 'Exam Title Data',
      description: 'Exam Description Data',
      studentName: 'Thanaporn Cheenthada',
      totalScore: 0,
      totalExamScore: 0,
      loading: false,
      memberDetail: {},
      questions: [],
      sColor: 'red',
      sTest: '',
      snackbar: false,
    };
  },
  methods: {
    onClickBack() {
      this.$router
        .push({ name: 'ExamSummary', params: { cid: this.$route.params.cid } })
        .catch(() => true);
    },
    async onClickSave() {
      this.loading = true;
      const data = this.questions.map((e) => {
        if (e.answerQuestionScores.length === 0) {
          return null;
        }
        return {
          pointReviceve: parseInt(e.answerQuestionScores[0].pointReviceve, 10),
          aqsid: e.answerQuestionScores[0].aqsid,
        };
      });
      const res = await api.updateStudentScore(this.$route.params.cid, data);
      if (res.status === 200) {
        this.snackbar = true;
        this.sColor = 'green';
        this.sTest = 'Success'
        this.loading = false;
        this.callApi();
      }else{
        this.snackbar = true;
        this.sColor = 'red';
        this.sTest = 'Fail'
      }
      // console.log(res);
    },
    onClickCancel() {
      this.$router
        .push({ name: 'ExamSummary', params: { cid: this.$route.params.cid } })
        .catch(() => true);
    },
    async callApi() {
      this.loading = true;
      await api
        .queryExamPaperAndMemberAnswer(
          this.$route.params.cid,
          this.$route.params.mid,
        )
        .then((e) => {
          if (e.status < 300) {
            this.loading = false;
            this.questions = e.data[0];
            this.memberDetail = e.data[1];
            this.questions = this.questions.map((e) => {
              if (e.answerQuestionScores.length === 0) {
                return null;
              }
              return {
                ...e,
                studentAnswer: JSON.parse(e.answerQuestionScores[0].answer),
              };
            });
            this.questions;
            const arrayDump = [];
            this.totalScore = 0;
            this.totalExamScore = 0;
            this.questions.forEach((element) => {
              if (element !== null) {
                this.totalScore += parseInt(
                  element.answerQuestionScores[0].pointReviceve,
                );
                this.totalExamScore += parseInt(element.point);
                arrayDump.push(element);
              }
            });
            this.questions = arrayDump;
          }
        });
    },
  },
  created() {
    this.callApi();
  },
};
</script>
