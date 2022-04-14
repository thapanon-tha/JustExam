<template>
  <div class="mb-40">
    <Header main="Exam channel" current="> Inside channel > Exam Summary" class="mb-10">
      <button
        @click="onClickBack"
        class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        Back
      </button>
      <button
        class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        Export score
      </button>
    </Header>
    <SummaryHead v-if="!isLoading" v-model="channelsDetail"/>
    <div class="ml-36 mt-10 w-5/6 p-2 border border-orange-300 rounded-xl text-center">
      <SummaryTable @clickRespone="clickGradeExam" v-model="channelsDetail.members" />
    </div>
    <Loading v-model="isLoading"></Loading>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import SummaryTable from '@/components/Form/ChannelForm/SummaryTable.vue';
import SummaryHead from '@/components/Form/ChannelForm/SummaryHead.vue';
import Loading from '@/components/Loading.vue';
import api from '@/services/apis';

export default {
  name: 'ExamSummary',
  components: {
    Header,
    SummaryTable,
    SummaryHead,
    Loading,
  },
  data() {
    return {
      isLoading: true,
      channelsDetail: {},
    };
  },
  methods: {
    onClickBack() {
      this.$router
        .push({ name: 'InsideChannelTeacher', params: { cid: this.$route.params.cid } })
        .catch(() => true);
    },
    clickGradeExam(mid) {
      this.$router
        .push({ name: 'GradeStudentExam', params: { cid: this.$route.params.cid, mid } })
        .catch(() => true);
    },
    async callApi() {
      const respones = await api.getMember(this.$route.params.cid).then((res) => res);
      this.channelsDetail = await api
        .channelsDetail(this.$route.params.cid)
        .then((res) => res[0].data);
      if (respones.status < 300) {
        this.isLoading = false;
        this.channelsDetail.members = respones.data.map((e) => ({
          mid: e.mid,
          sid: e.sid,
          state: e.state,
          name: `${e.user.firstname} ${e.user.surname}`,
          score: e.answerQuestionScores.reduce(
            (accumulator, object) => accumulator + object.pointReviceve,
            0,
          ),
        }));
      }
    },
  },
  created() {
    this.callApi();
  },
};
</script>
