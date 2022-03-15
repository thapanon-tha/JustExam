<template>
  <div class="mb-60">
    <Header 
      main="Exam channel" current="> Inside channel" class="mb-10"
    >
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
    <ChannelForm v-model="channelInfo" />
    <div>
      <div>Your Invite Code</div>
      <div>Selected box</div>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/Button/ActionButton.vue";
import Header from "@/components/Header/Header.vue";
import ChannelForm from '@/components/Form/ChannelForm/ChannelForm';
import CardAddExam from '@/components/Card/CardAddExam';

export default {
  name: "InsideChannelTeacher",
  components: {
    ActionButton,
    Header,
    ChannelForm,
    CardAddExam,
  },
  data() {
    return {
      showModal: false,
      channelInfo: {
        title: "Channel 1",
        description: "Description 1",
        datePicked: "",
        settingData: {
          randomSec: false,
          randomQuestion: false,
          shuffleChoices: false,
          showCAnswer: false,
          showTotalScore: false,
          cantSubmitEmpty: false,
        },
      },
    };
  },
  methods: {
    onClickAddExam() {
      this.showModal = true;
    },
    // submitForm() {
    //   this.title = "";
    //   this.description = "";
    // },
    onClickMember() {
      this.$router.push({ name: "MemberChannel" }).catch(() => true);
    },
    onClickSummary() {
      this.$router.push({ name: "ExamSummary" }).catch(() => true);
    },
    closeModalAddExam() {
      this.showModal = false;
    },
  },
};
</script>
