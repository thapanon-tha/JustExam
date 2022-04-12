<template>
  <div class="ml-10 mt-10 mr-10 mb-20">
    <div class="break-words p-3 mb-3" v-html="questionData.question"></div>
    <div class="" v-for="(item, index) in questionData.matchs" :key="item.index">
      <v-row>
        <v-col :cols="2">
          <p class="break-words">{{ `${index + 1})` }}</p>
        </v-col>
        <v-col>
          <p class="break-words" v-html="item.subquestion"></p>
        </v-col>
      </v-row>

      <v-col>
        <select
          class="ml-10 border-2 border-solid border-gray-300 rounded-md bg-gray-200 px-5 py-2 whitespace-pre-wrap break-words overflow-hidden"
          v-model="select"
          id="select"
          name="select"
        >
          <option disabled value="">
            <p v-html="item.matchanswer"></p>
          </option>
        </select>
      </v-col>
    </div>
    <div class="flex justify-end">
      <input
        class="w-20 p-2 mt-5 font-semilight text-center text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:mainColor focus:border-opacity-100 focus:outline-none"
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
  name: 'ScoreMatching',
  props: ['value'],
  data() {
    return {
      questionData: this.value,
      select: '',
    };
  },
};
</script>

<style scoped>
select {
  width: 600px;
  max-width: 100%;
}
</style>
