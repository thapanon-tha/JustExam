<template>
  <div class="ml-10 mt-10 mr-10 mb-10">
    <div class="break-words p-3 mb-3">
      {{ questionData.question }}
    </div>
    <input
      class="ml-5 w-2/6 px-3 py-3 font-semilight text-gray-700
      bg-white bg-clip-padding border-2 border-solid border-mainColor
      border-opacity-70 rounded-md transition ease-in-out m-0 focus:text-black
      focus:bg-white focus:mainColor focus:border-opacity-100 focus:outline-none"
      placeholder="Type answer here"
      v-model="questionData.answer"
    />
    <div class="flex justify-end">
      <input
        class="w-20 p-2 font-semilight text-center text-sm
        text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor
        border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black
        focus:mainColor focus:border-opacity-100 focus:outline-none"
        type="number" min="0" v-model="questionData.totalPoint" placeholder="Total"
      >
    </div>
  </div>
</template>

<script>

export default {
  name: 'GradeShortAns',
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },

};
</script>
