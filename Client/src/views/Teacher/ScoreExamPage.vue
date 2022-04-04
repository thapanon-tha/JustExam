<template>
  <div>
    <Header main="Exam channel" current="> Add exam > Score exam">
      <button
        @click="onClickBack"
        class="mt-3 bg-white border-orange-200 border border-solid
              rounded-lg px-8 py-3 font-semilight text-mainColor"
      >
        Back
      </button>
    </Header>
    <div>
      <div class="ml-72 mt-10">
        <p class="ml-3 font-semibold text-lg text-black w-4/5 break-all">
          {{ examTitle }}
        </p>
        <p class="ml-3 font-semibold text-lg text-black  w-4/5 break-all">
          {{ description }}
        </p>
      </div>
      <ScoreQuestionList/>
    </div>
    <div class="flex gap-10 mt-10 justify-center">
      <ActionButton
        class="ml-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4
          font-semilight text-mainColor hover:text-white hover:bg-mainColor"
        name="Save"
        @on-click="onClickSave()"
      />
      <ActionButton
        class="bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight
           text-grayColor hover:text-white hover:bg-mainColor"
        name="Cancle"
        @on-click="onClickCancel()"
      />
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header/Header.vue';
import ScoreQuestionList from '@/components/Form/TotalScoreForm/ScoreQuestionList.vue';
import ActionButton from '@/components/Button/ActionButton.vue';

export default {
  name: 'ScoreExamPage',
  components: {
    Header,
    ScoreQuestionList,
    ActionButton,
  },
  data() {
    return {
      examTitle: 'Exam Title Data',
      description: 'Exam Description Data',
    };
  },
  methods: {
    onClickBack() {
      this.$router.push({ name: 'InsideChannelTeacher' }).catch(() => true);
    },
    onClickSave() {
      //
    },
    onClickCancel() {
      //
    },
  },
};
</script>
