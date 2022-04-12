<template>
  <div>
    <div>
      <label class="form-label inline-block mb-2 text-gray-700 font-semilight text-xl">
        Schedule
      </label>
      <label
        class="form-label inline-block mb-2 ml-2 text-gray-700 text-opacity-50 font-semilight text-sm"
      >
        (YYYY/MM/DD)
      </label>
    </div>
    <div class="flex w-3/6">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <input
            class="px-10 pt-3 pb-3 w-full border border-solid border-mainColor border-opacity-40 text-base font-semilight text-grayColor bg-subColor rounded-md text-center"
            readonly
            v-bind="attrs"
            v-on="on"
            v-model="date"
          />
        </template>
        <v-date-picker v-model="date" @input="menu = false" color="orange darken-4"></v-date-picker>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data: () => ({
    // eslint-disable-next-line max-len
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    menu: false,
  }),
  props: ['value'],
  watch: {
    date(newVal, oldVal) {
      this.$emit('input', this.date);
    },
  },
};
</script>
