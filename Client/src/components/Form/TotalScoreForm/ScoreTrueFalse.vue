<template>
  <div class="ml-10 mt-10 mr-10 mb-10">
    <div class="break-words p-3 mb-3">
      {{ questionData.question }}
    </div>
    <div class="ml-10">
      <div>
        <input
          type="checkbox"
          class="h-3 w-3 mr-2"
          v-model="questionData.true"
          disabled
        />
        <label>
          True
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          class="h-3 w-3 mr-2"
          v-model="questionData.true"
          disabled
        />
        <label>
          False
        </label>
      </div>
    </div>
    <div class="flex justify-end">
      <input
        class="w-20 p-2 font-semilight text-center text-sm
      text-gray-700 bg-white bg-clip-padding border
        border-solid border-mainColor border-opacity-40
        rounded-md transition ease-in-out m-0 focus:text-black
        focus:mainColor focus:border-opacity-100 focus:outline-none"
        type="number" min="0" v-model="questionData.totalPoint"
        placeholder="Total"
        >
    </div>
  </div>
</template>

<script>

export default {
  name: 'ScoreTrueFalse',
  components: {
  },
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },
};
</script>
