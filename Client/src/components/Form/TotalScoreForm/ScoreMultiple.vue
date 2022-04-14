<template>
  <div class="ml-10 mt-10 mr-10 mb-10">
    <div class="break-words p-3 mb-3">
      <p v-html="questionData.question"></p>
    </div>
    <div class="break-normal mt-3" v-for="item in questionData.answers" :key="item.id">
      <v-row>
        <v-col :cols="1">
          <input
            class="w-12 p-1 font-semilight text-xs mr-5 text-center text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:mainColor focus:border-opacity-100 focus:outline-none"
            type="number"
            v-model="item.pointQ"
            placeholder="Point"
          />
        </v-col>
        <v-col :cols="1">
          <input class="h-4 w-4 mr-2" type="checkbox" v-model="item.correct" disabled />
        </v-col>
        <v-col >
          <p v-html="item.optionData"></p>
        </v-col>
      </v-row>
    </div>
    <div class="flex justify-end">
      <input
        class="w-20 p-2 font-semilight text-center text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:mainColor focus:border-opacity-100 focus:outline-none"
        type="number"
        min="0"
        v-model="questionData.point"
        placeholder="Total"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreMultiple',
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },
};
</script>
