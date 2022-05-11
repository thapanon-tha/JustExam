<template>
  <div class="mb-40">
    <Header
      main="Exam channel"
      current="> Inside channel > Exam Summary"
      class="mb-10"
    >
      <button
        @click="onClickBack"
        class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        Back
      </button>
      <button
        v-if="$cookies.get('type') === 'teacher'"
        @click="onClickReleaceScore"
        class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        Release score
      </button>
      <button
        class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        <downloadexcel
          v-if="!isLoading"
          :data="this.channelsDetail.members"
          :fields="json_fields"
          :before-generate="startDownload"
          :before-finish="finishDownload"
          :name="`${channelsDetail.title}-${new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000,
          )
            .toISOString()
            .substr(0, 10)}.xls`"
        >
          Export score
        </downloadexcel>
      </button>
    </Header>
    <SummaryHead v-if="!isLoading" v-model="channelsDetail" />
    <div
      v-if="!isLoading"
      class="ml-36 mt-10 w-5/6 p-2 border border-orange-300 rounded-xl text-center"
    >
      <SummaryTable
        @clickRespone="clickGradeExam"
        v-model="channelsDetail.members"
      />
    </div>
    <v-snackbar
      v-model="snackbar"
      color="green"
      centered
      top
      text
      outlined
      :timeout="timeout"
    >
      {{ text }}
    </v-snackbar>

    <v-snackbar
      v-model="snackbar2"
      color="red"
      centered
      top
      text
      outlined
      :timeout="timeout"
    >
      {{ text }}
    </v-snackbar>

    <Loading v-model="isLoading"></Loading>
  </div>
</template>

<script>
import downloadexcel from 'vue-json-excel';
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
    downloadexcel,
  },
  data() {
    return {
      snackbar2: false,
      snackbar: false,
      text: '',
      timeout: 1500,
      isLoading: true,
      channelsDetail: {},
      json_fields: {
        'Student Id': 'sid',
        Name: 'name',
        'Total Score': 'score',
      },
    };
  },
  methods: {
    startDownload() {
      this.snackbar = true;
      this.text = 'loading';
    },
    finishDownload() {
      this.snackbar = true;
      this.text = 'Download Success';
    },
    onClickBack() {
      // eslint-disable-next-line
      if ($cookies.get('type') === 'teacher') {
        this.$router
          .push({
            name: 'InsideChannelTeacher',
            params: { cid: this.$route.params.cid },
          })
          .catch(() => true);
      } else {
        this.$router
          .push({
            name: 'ExamChannelStudent',
          })
          .catch(() => true);
      }
    },
    clickGradeExam(mid) {
      this.$router
        .push({
          name: 'GradeStudentExam',
          params: { cid: this.$route.params.cid, mid },
        })
        .catch(() => true);
    },
    async callApi() {
      const respones = await api
        .getMember(this.$route.params.cid)
        .then((res) => res);
      this.channelsDetail = await api
        .channelsDetail(this.$route.params.cid)
        .then((res) => res[0].data);
      if (respones.status < 300) {
        this.channelsDetail.members = respones.data.map((e) => ({
          rid: e.rid,
          mid: e.mid,
          sid: e.sid,
          state: e.state,
          name: `${e.user.firstname} ${e.user.surname}`,
          score: e.answerQuestionScores.reduce(
            (accumulator, object) => accumulator + object.pointReviceve,
            0,
          ),
        }));
        this.channelsDetail.members = this.channelsDetail.members.filter(
          (e) => e.rid !== '3a7c4d99-c414-44b8-bdd8-d7d625a99437',
        );
        this.isLoading = false;
        if(this.channelsDetail.members.length===0){
          this.noMember();
        }
      }
      if (respones.status === 404) {
        this.noMember();
      }
    },
    noMember() {
      this.isLoading = false;
      this.snackbar = true;
      this.text = 'No member in channel';
      setTimeout(() => {
        this.$router
          .push({
            name: 'InsideChannelTeacher',
            params: { cid: this.$route.params.cid },
          })
          .catch(() => true);
      }, 2000);
    },
    async onClickReleaceScore() {
      this.isLoading = true;
      const respones = await api.sendemail(this.$route.params.cid);
      if (respones.status === 200) {
        this.isLoading = false;
      }
      else {
        this.snackbar2 = true;
      this.text = 'fail';
        this.isLoading = false;
      }
    },
  },
  created() {
    this.isLoading = true;
    this.callApi();
  },
};
</script>
