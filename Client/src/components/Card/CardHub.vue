<template>
  <div class="box-border h-40 w-72 rounded-xl text-white bg-navyColor"
  >
      <div class="flex flex-col">
        <v-icon
          @click="clickSet" class="flex justify-end mr-3 mt-3"
          small
          color="white"
        >
          settings
        </v-icon>
        <div class="h-32 w-42 p-2">
          <h1 class="text-md font-semilight ml-2">Title</h1>
          <h2 class="text-md font-semilight ml-2">Modified date</h2>
          <h2 class="text-md font-semilight ml-2">Created date</h2>
          <h2 class="text-md font-semilight ml-2">Creator</h2>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'CardHub',
  methods: {
    clickSet() {
      this.$emit('clickSet');
    },
  },
};
</script>
