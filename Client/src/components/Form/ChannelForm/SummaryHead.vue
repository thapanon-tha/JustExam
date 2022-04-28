<template>
  <div>
    <div class="flex flex-row justify-evenly">
      <div>
        <h1 class="font-semibold text-xl mb-3">{{ detail.title }}</h1>
        <!-- <div class="flex flex-row">
          <p class="mr-5 font-semibold">Exam date:</p>
          <p class="mr-5 font-semilight">{{ detail.schedule | moment('D / MMMM / YYYY') }}</p>
        </div> -->
        <div class="flex flex-row">
          <p class="mr-5 font-semibold">Exam start:</p>
          <p class="mr-5 font-semilight">{{ detail.startAt | moment('D / MMMM / YYYY H:mm:ss') }}</p>
        </div>
        <div class="flex flex-row">
          <p class="mr-5 font-semibold">Exam end:</p>
          <p class="mr-5 font-semilight">{{ detail.endAt | moment('D / MMMM / YYYY H:mm:ss') }}</p>
        </div>
        <div class="flex flex-row">
          <p class="mr-5 font-semibold">Total student:</p>
          <p class="mr-5 font-semilight">{{ detail.members.length }}</p>
        </div>
      </div>
      <div class="mt-10">
        <div class="flex flex-row">
          <p class="mr-5 font-semibold">Max score:</p>
          <p class="mr-5 font-semilight">{{ summaryData.scoreMax }}</p>
        </div>
        <div class="flex flex-row">
          <p class="mr-5 font-semibold">Min score:</p>
          <p class="mr-5 font-semilight">{{ summaryData.scoreMin }}</p>
        </div>
        <div class="flex flex-row">
          <p class="mr-5 font-semibold">SD:</p>
          <p class="mr-5 font-semilight">{{ summaryData.scoreSD }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryHead',
  props: ['value'],
  data() {
    return {
      detail: this.value,
      summaryData: {
        studentNum: 0,
        scoreTotal: 50,
        scoreMax: 0,
        scoreMin: 0,
        scoreSD: 0,
      },
    };
  },
  methods: {
    getStandardDeviation(array) {
      const n = array.length;
      const mean = array.reduce((a, b) => a + b) / n;
      return Math.sqrt(array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    },
    calcu() {
      const score = this.detail.members.map((e) => e.score);
      this.summaryData.scoreMax = Math.max(...score);
      this.summaryData.scoreMin = Math.min(...score);
      this.summaryData.scoreSD = this.getStandardDeviation(score);
    },
  },
  created() {
    this.calcu();
  },
};
</script>
