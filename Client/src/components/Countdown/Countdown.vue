<template>
  <div class="flex justify-end items-center">
    <v-snackbar v-model="alert" :timeout="5000" :bottom="true" :right="true">
      <p class="p-3 text-left">เหลือเวลาอีก 5 นาที</p>
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text @click="alert = false" v-bind="attrs"> Close </v-btn>
      </template>
    </v-snackbar>

    <div class="text-xl mr-5">
      <span class="text-bold text-red-500">{{ text }}</span>
    </div>
    <div v-if="loaded" class="text-2xl">
      <div class="flex items-center">
        <div class="mr-2">
          {{ hours }}
          <span class="text-sm text-gray-500 hidden xl:inline-block">Hr</span>
        </div>
        <span>:</span>
        <div class="mx-2">
          {{ minutes }}
          <span class="text-sm text-gray-500 hidden xl:inline-block">Min</span>
        </div>
        <span>:</span>
        <div class="ml-2">
          {{ seconds }}
          <span class="text-sm text-gray-500 hidden xl:inline-block">Sec</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Countdown',
  props: {
    endTime: String,
    submit: Function,
    text: String,
    activeAlert: Boolean,
  },
  data: () => ({
    hours: 0,
    minutes: 0,
    seconds: 0,
    loaded: false,
    finish: false,
    alert: false,
    test: new Date().getTime() + 60000,
  }),
  methods: {
    formatNumber: (num) => (num < 10 ? `0${num}` : num),
    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date();
        const end = new Date(this.endTime);
        const distance = end.getTime() - now.getTime();

        if (distance <= 0) {
          this.submit();
          clearInterval(timer);
          return;
        }

        if (distance === 300000 && this.activeAlert) {
          if (this.alert === false) this.alert = true
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
