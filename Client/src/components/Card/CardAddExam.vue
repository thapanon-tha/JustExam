<template>
  <div class="w-3/6 h-auto border-2 border-orange-200 rounded-xl bg-subColor">
    <div class="mt-5 ml-5 mr-5 mb-5">
      <div class="flex flex-col">
        <div class="flex justify-end" @click="clikClose">
          <v-icon small color="orange" class="rounded-full hover:bg-orange-200">mdi-close</v-icon>
        </div>
        <h1 class="font-semilight text-2xl mb-5">Choose your exam</h1>
      </div>
      <div class="overflow-x-scroll">
        <div class="flex justify-start gap-5 mt-5 mb-5">
          <div
            class="w-48 h-60 flex-none bg-navyColor rounded-t-lg relative border-4 border-white hover:border-red-400"
            @click="clickSelect(card)"
            v-for="card in examlist"
            :key="card.eid"
          >
            <div class="ml-3 mt-3 mr-3">
              <p class="text-mainColor font-semibold text-md truncate">
                {{ card.title }}
              </p>
              <p class="text-white font-base text-xs">
                Created Date:
                <br />
                {{ card.createdAt | moment('Do / MMMM / YYYY h:mm:ss a') }}
              </p>
              <p class="text-white font-base text-xs">
                Modified Date:
                <br />
                {{ card.updatedAt | moment('Do / MMMM / YYYY h:mm:ss a') }}
              </p>
            </div>
            <div class="text-center">
              <button
                class="bg-white text-mainColor text-xs px-4 py-2 absolute bottom-0 inset-x-0 rounded-t-lg shadow-md"
              >
                <v-icon small color="orange darken-3" dark>touch_app</v-icon>
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardAddExam',
  data() {
    return {};
  },
  props: ['examlist'],
  methods: {
    clikClose() {
      this.$emit('clikClose');
    },
    clickSelect(exam) {
      this.$emit('clickSelect', exam);
    },
  },
};
</script>
