<template>
  <div class="flex flex-col justify-end">
    <v-container>
      <v-row justify="end">
        <v-col cols="9">
          <div class="text-xl flex justify-end items-center">
            <span>Countdown</span>
          </div>
        </v-col>
        <v-col cols="3">
          <div
            v-if="loaded"
            class="w-56 flex text-2xl justify-center items-center"
          >
            <div class="mr-2 relative">
              {{ hours }}
              <span class="text-sm text-gray-500 hidden xl:inline-block">Hr</span>
            </div>
            <span>:</span>
            <div class="mx-2 relative">
              {{ minutes }}
              <span class="text-sm text-gray-500 hidden xl:inline-block">Min</span>
            </div>
            <span>:</span>
            <div class="ml-2 relative">
              {{ seconds }}
              <span class="text-sm text-gray-500 hidden xl:inline-block">Sec</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Countdown",
  props: {
    endTime: String,
    submit: Function,
  },
  data: () => ({
    hours: 0,
    minutes: 0,
    seconds: 0,
    loaded: false,
    finish: false,
    test: new Date().getTime() + 60000
  }),
  methods: {
    formatNumber: (num) => (num < 10 ? "0" + num : num),
    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date();
        const end = new Date(this.test);
        const distance = end.getTime() - now.getTime();

        if (distance <= 0) {
          this.submit();
          clearInterval(timer);
          return;
        }

        const days = Math.floor(distance / this._days);
        const hours = Math.floor((distance % this._days) / this._hours);
        const minutes = Math.floor((distance % this._hours) / this._minutes);
        const seconds = Math.floor((distance % this._minutes) / this._seconds);

        this.hours = this.formatNumber(hours);
        this.minutes = this.formatNumber(minutes);
        this.seconds = this.formatNumber(seconds);

        this.loaded = true;
      }, 1000);
    },
  },
  computed: {
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    },
  },
  mounted() {
    this.showRemaining();
  },
};
</script>
