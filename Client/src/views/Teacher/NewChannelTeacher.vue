<template>
  <div class="mb-60">
    <Header main="Exam channel" current=" > New channel" class="mb-10"/>
    <div class="w-4/6 ml-48">
      <ChannelForm v-model="channelInfo"/>
    </div>
    <ActionButton
      class="ml-48 mt-10 bg-white border-orange-200 border border-solid rounded-lg
      px-6 py-4 font-semilight text-mainColor"
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
    <div class="flex justify-end mr-56">
      <ActionButton
        class="bg-white border-orange-200 border border-solid rounded-lg
        px-8 py-3 font-semilight text-grayColor"
        name="Cancel"
        @on-click="onClickCancel"
      />
      <ActionButton
        class="ml-10 bg-white border-orange-200 border border-solid rounded-lg
        px-6 py-4 font-semilight text-mainColor"
        name="Create"
        @on-click="submitForm"
      />
    </div>
  </div>
</template>

<script>
import ActionButton from '@/components/Button/ActionButton.vue';
import Header from '@/components/Header/Header.vue';
import ChannelForm from '@/components/Form/ChannelForm/ChannelForm.vue';
import CardAddExam from '@/components/Card/CardAddExam.vue';
import CardSelectedExam from '@/components/Card/CardSelectedExam.vue';

export default {
  name: 'NewChannelTeacher',
  components: {
    ActionButton,
    Header,
    ChannelForm,
    CardAddExam,
    CardSelectedExam,
  },
  data() {
    return {
      showModal: false,
      showSelected: false,
      showButton: true,
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
    submitForm() {
      this.title = '';
      this.description = '';
    },
    onClickCancel() {
      this.$router.push({ name: 'ExamChannelTeacher' }).catch(() => true);
    },
    closeModalAddExam() {
      this.showModal = false;
    },
  },
};
</script>
