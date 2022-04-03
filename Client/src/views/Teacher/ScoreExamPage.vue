<template>
  <div>
    <Header main="Exam channel" current="> Add exam > Score exam">
      <button
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
  </div>
</template>
<script>
import Header from '@/components/Header/Header.vue';
import ScoreQuestionList from '@/components/Form/TotalScoreForm/ScoreQuestionList.vue';

export default {
  name: 'ScoreExamPage',
  components: {
    Header,
    ScoreQuestionList,
  },
  data() {
    return {
      examTitle: 'Exam Title Data',
      description: 'Exam Description Data',
    };
  },
};
</script>
