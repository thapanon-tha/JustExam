<template>
  <div>
    <label
      class="inline-block text-gray-700 font-semilight text-xl
            mb-3"
    >
      Time Duration
    </label>
    <label
      class="form-label inline-block mb-2 ml-2 text-gray-700
      text-opacity-50 font-semilight text-sm"
    >
      (24 hours format)
    </label>
    <v-row>
      <v-col
        cols="11"
        sm="5"
      >
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="timeStart"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <label
              class="inline-block text-gray-500 font-semilight text-sm mb-1"
            >
              Time Start
            </label>
            <input
              class="w-5/6 px-3 pt-3 pb-3  border border-solid
              border-mainColor border-opacity-40 text-base
              font-semilight text-grayColor bg-subColor
              rounded-md"
              v-model="timeStart"
              readonly
              v-bind="attrs"
              v-on="on"
              placeholder="Time Start"
            >
          </template>
          <v-time-picker
            v-if="menu1"
            v-model="timeStart"
            full-width
            @click:minute="$refs.menu1.save(timeStart)"
            format="24hr"
            :max="timeEnd"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col
        cols="11"
        sm="5"
      >
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="timeEnd"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <label
              class="inline-block text-gray-500 font-semilight text-sm mb-1"
            >
              Time End
            </label>
            <input
              class="w-5/6 px-3 pt-3 pb-3  border border-solid
              border-mainColor border-opacity-40 text-base
              font-semilight text-grayColor bg-subColor
              rounded-md"
              v-model="timeEnd"
              label="Time Start At"
              readonly
              v-bind="attrs"
              v-on="on"
              placeholder="Time End"
            >
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="timeEnd"
            full-width
            @click:minute="$refs.menu2.save(timeEnd)"
            format="24hr"
            :min="timeStart"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeStart: null,
      timeEnd: null,
      menu1: false,
      menu2: false,
    };
  },
  watch: {
    timeStart(newVal, oldVal) {
      this.$emit('update:timeStart', this.timeStart);
    },
    timeEnd(newVal, oldVal) {
      this.$emit('update:timeEnd', this.timeEnd);
    },
  },
};
</script>
