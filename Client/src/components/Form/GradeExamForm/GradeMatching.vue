<template>
  <div class="ml-10 mt-10 mr-10 mb-20">
    <div class="break-words p-3 mb-3">
      {{ questionData.question }}
    </div>
    <div class="ml-5" v-for="(item, index) in questionData.matchs" :key="item.index">
      <p
        class="px-5 py-3 mt-2 mr-10 w-7/8 break-words"
      >
        {{ `${index + 1})` }} {{ item.subquestion }}
      </p>
      <select
        class=" ml-10 border-2 border-solid border-mainColor border-opacity-70
          rounded-md bg-white px-5 py-2 focus:outline-none"
                v-model="item.matchanswer"
      >
        <option disabled value="">Select matching answer</option>
        <option
          v-for="item in questionData.listOfMatchsAnswer"
          :key="item"
          :value="item"
        >
          {{ item }}
        </option>
      </select>
    </div>
    <div class="flex justify-end">
      <input
        class="w-20 p-2 mt-5 font-semilight text-center text-sm
        text-gray-700 bg-white bg-clip-padding border
        border-solid border-mainColor border-opacity-40
        rounded-md transition ease-in-out m-0 focus:text-black
        focus:mainColor focus:border-opacity-100 focus:outline-none"
        type="number" min="0" v-model="questionData.receivedPoint"
        placeholder="Point"
      >
      <h1 class="text-md">/</h1>
      <div class="text-md">10</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GradeMatching',
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },
};

</script>

<style scoped>
select {
  width: 600px;
  max-width: 100%;

}

option {
  -moz-white-space: pre-wrap;
  -o-white-space: pre-wrap;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #DDD;
}
</style>
