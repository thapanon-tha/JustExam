<template>
  <div>
    <div class="flex flex-col">
      <div class="box-border h-40 w-72 rounded-xl text-white bg-navyColor"
      >
        <div class="flex flex-col">
          <div class="text-right">
            <v-menu
              top
              offset-y
            >
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
                  class="px-1 text-sm bg-white border border-subColor rounded-md text-mainColor"
                >
                  Leave
                </div>
              </v-list>
            </v-menu>
          </div>
          <div class="h-32 w-42 p-2 hover:text-orange-500" @click="onClick">
            <h1 class="text-sm font-semilight ml-2">title</h1>
            <h1 class="text-xs font-semilight ml-2">teacher</h1>
            <h2 class="text-xs font-semilight ml-2">schedule</h2>
            <div class="flex flex-row">
              <h2 class="text-xs font-semilight ml-2">startAt</h2>
              <h2 class="text-xs font-semilight ml-2">endAt</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CardStudentChannel',
  // props: ['detail'],
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
