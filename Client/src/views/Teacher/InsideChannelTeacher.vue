<template>
  <div class="mb-60">
    <Header main="Exam channel" current="> Inside channel" class="mb-10">
      <button
        @click="onClickMember"
        class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        Member
      </button>
      <button
        @click="onClickSummary"
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        Exam Summary
      </button>
    </Header>
    <v-container class="lighten-5 flex justify-center gap-40">
      <div class="w-4/6 ml-48">
        <EditChannelForm v-model="channelInfo" />
      </div>
    </v-container>
    <v-container class="flex justify-center">
      <div class="mt-10">
        <div class="text-gray-700 font-semilight text-xl">Your Invite Code</div>
        <div class="flex flex-wrap mt-5">
          <p
            class="w-60 h-10 bg-subColor border border-outlineColor border-opacity-50 rounded-lg text-center pt-2"
          >
            {{ channelInfo.inviteCode }}
          </p>
          <div
            class="bg-subColor border border-outlineColor border-opacity-50 rounded-lg w-10 h-10"
          >
            <button
              type="button"
              v-clipboard:copy="channelInfo.inviteCode"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
              <v-icon large color="grey darken-1">link</v-icon>
            </button>
          </div>
        </div>
      </div>

      <ActionButton
        class="ml-48 mt-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor"
        name="+ Add your exam"
        @on-click="onClickAddExam"
        v-if="showButton"
      />
      <CardSelectedExam
        class="ml-48 mt-10"
        @clickChange="onClickAddExam"
        @clickScore="clickScoreExam"
        @clickDelete="clickDeleteSelect"
        :detail="channelInfo.examChannel"
        v-if="showSelected"
      />
      <div class="relative">
        <CardAddExam
          @clikClose="closeModalAddExam"
          @clickSelect="clickSelectExam"
          class="fixed top-52 left-96"
          v-if="showModal"
          :examlist="examlist"
        />
      </div>
    </v-container>

    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import ActionButton from '@/components/Button/ActionButton.vue';
import Header from '@/components/Header/Header.vue';
import EditChannelForm from '@/components/Form/ChannelForm/EditChannelForm.vue';
import CardAddExam from '@/components/Card/CardAddExam.vue';
import CardSelectedExam from '@/components/Card/CardSelectedExam.vue';
import api from '@/services/apis';

export default {
  name: 'InsideChannelTeacher',
  components: {
    ActionButton,
    Header,
    EditChannelForm,
    CardAddExam,
    CardSelectedExam,
  },
  data() {
    return {
      snackbar: false,
      showModal: false,
      showSelected: false,
      showButton: true,
      examlist: [],
      text: '',
      channelsApiInfo: {},
      channelInfo: {
        title: '',
        description: '',
        datePicked: '',
        settingData: {
          randomSec: false,
          randomQuestion: false,
          shuffleChoices: false,
          showCAnswer: false,
          showTotalScore: false,
          cantSubmitEmpty: false,
        },
        inviteCode: '',
      },
    };
  },
  methods: {
    onCopy(e) {
      this.snackbar = true;
      this.text = `copied: ${e.text}`;
    },
    onError(e) {
      this.snackbar = true;
      this.text = 'Failed to copy Invite ID';
    },
    async onClickAddExam() {
      const Responses = await api.exams().then((res) => res);
      if (Responses.status >= 200 && Responses.status <= 299) {
        this.examlist = Responses.data;
        this.showModal = 1;
      }
    },
    clickSelectExam(examData) {
      this.connectChannel(examData);
      this.showModal = false;
      this.showButton = false;
    },
    clickChangeSelect() {
      this.showModal = true;
    },
    clickScoreExam() {
      this.$router
        .push({
          name: 'ScoreExamPage',
          params: { cid: this.channelInfo.cid, ecid: this.channelInfo.examChannel.ecid },
        })

        .catch(() => true);
    },
    async clickDeleteSelect() {
      const res = await api
        .disconnectExamtoChennal(this.channelInfo.cid, this.channelInfo.examChannel.ecid)
        .then((res) => res);
      console.log(res.status === 200);
      if (res.status === 200) {
        window.location.reload();
      }
    },
    onClickMember() {
      this.$router.push({ name: 'MemberChannel' }).catch(() => true);
    },
    onClickSummary() {
      this.$router.push({ name: 'ExamSummary' }).catch(() => true);
    },
    closeModalAddExam() {
      this.showModal = false;
    },
    async apiCall() {
      this.channelsApiInfo = await api.channelsDetail(this.$route.params.cid).then((res) => res);
      this.channelInfo = await this.channelsApiInfo[0].data;
      if (this.channelInfo.examChannel !== undefined && this.channelInfo.examChannel !== null) {
        this.showButton = false;
        this.showSelected = true;
      } else {
        this.showButton = true;
      }
    },
    async connectChannel(detail) {
      const data = {
        cid: this.$route.params.cid,
        title: detail.title,
        description: detail.description,
        eid: detail.eid,
        createDate: detail.createDate,
        updateDate: detail.updateDate,
      };
      const result = await api.connectExamtoChennal(data).then((res) => res);
      if (result.status > 199 && result.status < 300) {
        const examQuestioneList = await api
          .examList(this.channelInfo.examChannel.eid)
          .then(async (res) => await api.reverse(res.data))
          .then(async (data) => await api.examMapper(data))
          .then(
            async (data) => await api.createChennalQuestion(data, this.$route.params.cid, result.data.ecid),
          );
        if (examQuestioneList.status === 201) {
          this.channelInfo.examChannel = result.data;
          this.showSelected = true;
        } else {
          this.clickDeleteSelect();
        }
      }
    },
  },
  created() {
    this.apiCall();
  },
};
</script>
