<template>
    <div>
        <div class="flex flex-row justify-evenly">
            <div>
                <h1 class="font-semibold text-xl mb-3">{{ summaryData.channelTitle }}</h1>
                <div class="flex flex-row">
                    <p class="mr-5 font-semibold">Exam date:</p>
                    <p class="mr-5 font-semilight">{{ summaryData.examDate }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-5 font-semibold">Exam start:</p>
                    <p class="mr-5 font-semilight">{{ summaryData.examStart }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-5 font-semibold">Exam end:</p>
                    <p class="mr-5 font-semilight">{{ summaryData.examEnd }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-5 font-semibold">Total student:</p>
                    <p class="mr-5 font-semilight">{{ summaryData.studentNum }}</p>
                </div>
            </div>
            <div class="mt-10">
                <div class="flex flex-row">
                    <p class="mr-5 font-semibold">Total score:</p>
                    <p class="mr-5 font-semilight">{{ summaryData.scoreTotal }}</p>
                </div>
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
  data() {
    return {
      summaryData: {
        channelTitle: 'CPE494 Blockchain',
        examDate: '2 January 2022',
        examStart: '10.00 AM',
        examEnd: '11.00 AM',
        studentNum: 8,
        scoreTotal: 50,
        scoreMax: 49,
        scoreMin: 39,
        scoreSD: 2,
      },
    };
  },
};
</script>
