<template>
  <div class="flex justify-center">
    <button
      class="mx-1 p-1 w-10 h-10 border rounded-lg shadow-md bg-gray-100 hover:bg-yellow-500"
      @click="prevPageFunc"
    >
      &lt;
    </button>

    <div class="flex flex-wrap justify-center border">
      <div v-for="item in page" :key="item">
        <button
          v-if="choice + 1 === item"
          class="mx-1 p-1 w-10 h-10 border rounded-lg shadow-md bg-mainColor"
          @click="selected(item)"
        >
          {{ item }}
        </button>

        <button
          v-else-if="checkAnswerIsFinish(item - 1)"
          class="mx-1 p-1 w-10 h-10 border rounded-lg shadow-md bg-green-300 hover:bg-yellow-500"
          @click="selected(item)"
        >
          {{ item }}
        </button>
        
        <button
          v-else-if="checkAnswerNotFinish(item - 1)"
          class="mx-1 p-1 w-10 h-10 border rounded-lg shadow-md bg-red-300 hover:bg-yellow-500"
          @click="selected(item)"
        >
          {{ item }}
        </button>

        <button
          v-else-if="choice + 1 !== item"
          class="mx-1 p-1 w-10 h-10 border rounded-lg shadow-md hover:bg-yellow-500"
          @click="selected(item)"
        >
          {{ item }}
        </button>

      </div>
    </div>

    <button
      class="mx-1 p-1 w-10 h-10 border rounded-lg shadow-md bg-gray-100 hover:bg-yellow-500"
      @click="nextPageFunc"
    >
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    page: Number,
    choice: Number,
    answer: Array,
    prevPageFunc: Function,
    nextPageFunc: Function,
    changeExam: Function,
  },
  data() {
    return {
      items: [1, 2, 3],
    };
  },
  methods: {
    selected: function (number) {
      this.changeExam(number);
    },
    checkAnswerNotFinish: function (item) {
      let result = false;

      if (this.answer[item].answer === "") result = true
      else if (Array.isArray(this.answer[item].answer)) {
        if (this.answer[item].answer.length === 0) result = true
        else if (this.answer[item].answer.every((value) => value === null)) result = true
      }

      return result;
    },
    checkAnswerIsFinish: function (item) {
      let result = false

      if (Array.isArray(this.answer[item].answer)) {
        if (this.answer[item].answer.length !== 0 && this.answer[item].answer.some((value) => value !== null)) result = true
      } else if (this.answer[item].answer !== "" && this.answer[item].answer !== undefined) result = true

      return result
    }
  },
};
</script>
