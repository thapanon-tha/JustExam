<template>
  <button>
    <div class="flex flex-col">
      <label class="text-truncate text-orange-500 text-left text-xl font-medium"
      style="max-width: 285px;"
      > 
        {{ detail.title }} 
      </label>
      <div
        class="mt-1 box-border h-40 w-72 rounded-xl text-white bg-navyColor border-r-8 border-mainColor"
      >
        <div class="flex flex-col m-2">
          <div class="text-right">
            <v-menu top offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="flex justify-end mr-3 mt-3"
                  small
                  color="white"
                  v-bind="attrs"
                  v-on="on"
                >
                  settings
                </v-icon>
              </template>
              <v-list>
                <div @click="clickDelete" class="p-2 text-xs text-gray-700 hover:text-mainColor">
                  Delete
                </div>
              </v-list>
            </v-menu>
          </div>
          <div
            class="h-32 w-42 p-2 hover:text-orange-500 text-left text-clip overflow-hidden"
            @click="onClick"
          >
            <h1 class="text-sm font-semilight ml-2">{{ detail.description }}</h1>
            <h2 class="text-xs font-semilight ml-2">
              Exam date: {{ detail.schedule | moment('D / MM / YYYY') }}
            </h2>
            <h2 class="text-xs font-semilight ml-2">Start at: {{ detail.startAt | moment('H:mm:ss') }}</h2>
            <h2 class="text-xs font-semilight ml-2">End at: {{ detail.endAt | moment('H:mm:ss') }}</h2>
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'CardChannel',
  props: ['detail'],
  data() {
    return {
      // showSetting: false,
    };
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    },
    clickDelete() {
      this.$emit('clickDelete');
    },
  },
};
</script>
<style></style>
