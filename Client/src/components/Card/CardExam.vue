<template>
  <button>
    <div class="flex flex-col">
      <label class="w-4/5 text-left text-xl font-medium overflow-hidden"> {{ detail.title }} </label>
      <div
        class="mt-1 box-border h-40 w-72 rounded-xl text-white bg-navyColor"
      >
        <div class="flex flex-col m-2">
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
                  @click="clickEdit"
                  class="text-xs p-2
                  text-gray-700 hover:text-mainColor"
                >
                  Edit
                </div>
                <div
                  @click="clickDelete"
                  class="text-xs p-2
                  text-gray-700 hover:text-mainColor"
                >
                  Delete
                </div>
              </v-list>
            </v-menu>
          </div>
          <div 
            class="h-32 w-42 p-2 hover:text-orange-500 text-left text-clip overflow-hidden" 
            @click="onClick"
          >
            <h1
              class="text-sm font-semilight ml-2"
            >
              {{ detail.description }}
            </h1>
            <h2 class="text-xs font-semilight ml-2">
              Created date: {{ detail.updatedAt | moment("Do / MMMM / YYYY") }}
            </h2>
            <h2 class="text-xs font-semilight ml-2">
              {{ detail.updatedAt | moment("h:mm:ss a") }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: 'CardExam',
  props: ['detail'],
  data() {
    return {
      //
    };
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    },
    clickEdit() {
      this.$emit('clickEdit');
    },
    clickDelete() {
      this.$emit('clickDelete');
    },
  },
};
</script>
