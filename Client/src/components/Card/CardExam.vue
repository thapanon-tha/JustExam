<template>
  <div>
    <div class="flex flex-col">
      <label class="text-xl font-semilight"> {{ detail.title }} </label>
      <div
        class="mt-1 box-border h-40 w-72 rounded-xl text-white bg-navyColor"
      >
        <div class="flex flex-col">
          <v-icon
            @click="clickSetting"
            class="flex justify-end mr-3 mt-3"
            small
            color="white"
          >
            settings
          </v-icon>
          <div class="h-32 w-42 p-2 hover:text-orange-500" @click="onClick">
            <h1
              class="text-md font-semilight ml-2"
            >
              {{ detail.title }}
            </h1>
            <h2 class="text-md font-semilight ml-2">
              {{ detail.updatedAt | moment("Do / MMMM / YYYY") }}
            </h2>
            <h2 class="text-md font-semilight ml-2">
              {{ detail.updatedAt | moment("h:mm:ss a") }}
            </h2>
          </div>
        </div>
      </div>
      <div
        v-if="showSetting"
        class="w-auto bg-white border-2 border-orange-200 rounded-lg
              text-xs ml-52 mb-10 absolute"
      >
        <div
          class="p-1 border-b-2 border-orange-200 rounded-t-lg
            hover:bg-mainColor hover:text-white"
          @click="clickEdit"
        >
          Edit Exam
        </div>
        <div
          @click="clickDelete"
          class="p-1 rounded-b-lg hover:bg-mainColor hover:text-white"
        >
          Delete Exam
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardExam',
  props: ['detail'],
  data() {
    return {
      showSetting: false,
    };
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    },
    clickEdit() {
      this.$emit('clickEdit');
    },
    clickSetting() {
      this.showSetting = !this.showSetting;
    },
    clickDelete() {
      this.$emit('clickDelete');
    },
  },
};
</script>
