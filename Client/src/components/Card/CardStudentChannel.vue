<template>
  <button>
    <div class="flex flex-col">
      <label
        class="text-orange-500 text-left text-xl font-medium text-truncate"
        style="max-width: 285px;"
      >
        {{ detail.title }}
      </label>
      <div class="box-border h-40 w-72 rounded-xl text-white bg-navyColor">
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
                <div
                  @click="clickLeave"
                  class="px-1 text-sm bg-white border border-subColor rounded-md text-mainColor"
                >
                  Leave
                </div>
              </v-list>
            </v-menu>
          </div>
          <div
            class="h-32 w-42 p-2 hover:text-orange-500 text-left text-clip overflow-hidden pb-2"
            @click="onClick"
          >
            <div class="align-end">
              <h2 class="text-xs font-semilight ml-2">
                Exam date: {{ detail.schedule | moment('D / MM / YYYY') }}
              </h2>
              <div>
                <h2 class="text-xs font-semilight ml-2">
                  Start at: {{ detail.startAt | moment('H:mm:ss') }}
                </h2>
                <h2 class="text-xs font-semilight ml-2">
                  End at: {{ detail.endAt | moment('H:mm:ss') }}
                </h2>
              </div>
            </div>
            <h1 class="text-xs font-semilight ml-2">
              Teacher: {{ `${detail.user.firstname} ${detail.user.surname}` }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'CardStudentChannel',
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
    clickSetting() {
      this.showSetting = !this.showSetting;
    },
    clickLeave() {
      this.$emit('clickLeave');
    },
  },
};
</script>
