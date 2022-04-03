<template>
  <div class="mb-60">
    <Header main="Exam channel" current="> Inside channel" class="mb-10">
      <button
        @click="onClickMember"
        class="
          mt-3
          mr-3
          bg-white
          border-orange-200 border border-solid
          rounded-lg
          px-4
          py-3
          font-semilight
          text-mainColor
        "
      >
        Member
      </button>
      <button
        @click="onClickSummary"
        class="
          mt-3
          bg-white
          border-orange-200 border border-solid
          rounded-lg
          px-4
          py-3
          font-semilight
          text-mainColor
        "
      >
        Exam Summary
      </button>
    </Header>
    <div class="w-4/6 ml-48">
      <EditChannelForm v-model="channelInfo"/>
    </div>
    <div class="ml-48 mt-10">
      <div class="text-gray-700 font-semilight text-xl">Your Invite Code</div>
      <div class="flex flex-wrap mt-5">
        <p
          class="
            w-60
            h-10
            bg-subColor
            border border-outlineColor border-opacity-50
            rounded-lg
            text-center
            pt-2
          "
        >
          {{ channelInfo.inviteCode }}
        </p>
        <div
          class="
            bg-subColor
            border border-outlineColor border-opacity-50
            rounded-lg
            w-10
            h-10
          "
        >
          <v-icon large color="grey darken-1">link</v-icon>
        </div>
      </div>
    </div>
    <ActionButton
      class="
        ml-48
        mt-10
        bg-white
        border-orange-200 border border-solid
        rounded-lg
        px-6
        py-4
        font-semilight
        text-mainColor
      "
      name="+ Add your exam"
      @on-click="onClickAddExam"
      v-if="showButton"
    />
    <CardSelectedExam
      class="ml-48 mt-10"
      @clickChange="clickChangeSelect"
      @clickScore="clickScoreExam"
      @clickDelete="clickDeleteSelect"
      v-if="showSelected"
    />
    <div class="relative">
      <CardAddExam
        @clikClose="closeModalAddExam"
        @clickSelect="clickSelectExam"
        class="fixed top-52 left-96"
        v-if="showModal"
      />
    </div>
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
      showModal: false,
      showSelected: false,
      showButton: true,
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
    onClickAddExam() {
      this.showModal = true;
    },
    clickSelectExam() {
      this.showModal = false;
      this.showSelected = true;
      this.showButton = false;
    },
    clickChangeSelect() {
      this.showModal = true;
    },
    clickScoreExam() {
      this.$router.push({ name: 'ScoreExamPage' }).catch(() => true);
    },
    clickDeleteSelect() {
      this.showButton = true;
      this.showSelected = false;
    },
    // submitForm() {
    //   this.title = "";
    //   this.description = "";
    // },
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
      this.channelsApiInfo = await api
        .channelsDetail(this.$route.params.cid)
        .then((res) => res.data);
      this.channelInfo = this.channelsApiInfo;
    },
  },
  created() {
    this.apiCall();
  },
};
</script>
