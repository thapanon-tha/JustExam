<template>
  <div class="ml-10 mt-10 mr-10 mb-10">
    <div class="break-words p-3 mb-3">
      {{ questionData.question }}
    </div>
    <div class="ml-5 break-normal" v-for="item in questionData.answers" :key="item.id">
      <input
        class="h-4 w-4 mr-2"
        type="checkbox"
        v-model="item.correct"
      />
      <label class="break-all">
        {{ item.optionData}}
      </label>
    </div>
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
  name: 'GradeMultiple',
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },
};
</script>
