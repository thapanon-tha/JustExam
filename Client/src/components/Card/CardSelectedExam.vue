<template>
  <div>
    <div class="text-gray-700 font-semilight text-xl mb-5">Your Exam</div>
    <div class="w-80 h-40 bg-navyColor rounded-2xl flex flex-row shadow-md">
      <div class="w-80 ">
        <div class="flex flex-row mt-2 ml-2">
          <v-icon big color="light-green accent-3">check_circle</v-icon>
          <h1 class="text-white font-semilight text-sm ml-1 mt-1">Add exam successful</h1>
        </div>
        <div class="flex flex-nowrap ml-2">
          <v-icon big color="orange darken-2" class="flex flex-none">description</v-icon>
          <p class="text-white font-semilight text-sm ml-1 mt-2 break-all w-5/6 h-10">
            {{ detail.title }}
          </p>
        </div>
        <div class="flex justify-around ml-1 mr-1">
          <!-- <v-icon :disabled="disabled" big color="white" class="rounded-full p-1 hover:bg-red-500" @click="clickChange">
            change_circle
          </v-icon> -->
          <v-icon :disabled="disabled" big color="white" class="rounded-full p-1 hover:bg-red-500" @click="clickScore">
            edit
          </v-icon>
          <v-icon :disabled="disabled" big color="white" class="rounded-full p-1 hover:bg-red-500" @click="clickDelete">
            delete
          </v-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardSelectedExam',
  data() {
    return {
    };
  },
  props: {
    detail: {
      type: Object,
      default: {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  }
  ,
  methods: {
    clickChange() {
      this.$emit('clickChange');
    },
    clickScore() {
      this.$emit('clickScore');
    },
    clickDelete() {
      this.$emit('clickDelete');
    },
  },
};
</script>
