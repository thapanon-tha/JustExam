<template>
  <div class="box-border h-40 w-72 rounded-xl text-white bg-gradient-to-tl
          from-gray-800 via-gray-800 to-orange-700"
  >
      <div class="flex flex-col">
        <v-icon 
          @click="clickSet" class="flex justify-end mr-3 mt-3"
          small
          color="white"
        >
          settings
        </v-icon>
        <div class="border h-32 w-42 p-2">
          <h1 class="text-md font-semilight">Title</h1>
          <h2 class="text-md font-semilight">Date</h2>
          <h2 class="text-md font-semilight">Time</h2>
        </div>
      </div> 
  </div>
</template>

<script>

export default {
  name: 'CardChannel',
  methods: {
    clickSet() {
      this.$emit('clickSet');
    },
  },
};
</script>
