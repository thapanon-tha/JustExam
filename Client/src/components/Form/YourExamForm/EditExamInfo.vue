<template>
    <div class="ml-52">
        <div
            class="flex flex-wrap mt-10 bg-subColor border rounded-md w-auto"
        >
            <div class="font-semibold text-md text-black mt-5 ml-5 mb-5">
              <div>
                <input
                  type="text" ref="exam_title"
                  :value="examInfo.examTitle"
                  :disabled="!isEditing"
                  class="w-40 px-3 py-3 text-base font-semilight
                text-gray-700 bg-white bg-clip-padding border border-solid
                  border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0
                  focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100
                  focus:outline-none"
                  :class="{view: !isEditing}"
                >
              </div>
              <div>
                <input
                  type="text" ref="exam_description"
                  :value="examInfo.description"
                  :disabled="!isEditing"
                  class="w-40 px-3 py-3 text-base font-semilight
                text-gray-700 bg-white bg-clip-padding border border-solid
                  border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0
                  focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100
                  focus:outline-none"
                  :class="{view: !isEditing}"
                >
              </div>
            </div>
            <v-icon
                @click="isEditing = !isEditing" v-if="!isEditing"
                class="ml-5 text-right"
                large
                color="orange darken-2"
            >
                settings
            </v-icon>
            <v-icon
                @click="save" v-else-if="isEditing"
                class="ml-5 text-right"
                large
                color="green accent-3"
            >
                check_circle
            </v-icon>
            <v-icon
                v-if="isEditing" @click="isEditing = false"
                class="ml-5 text-right"
                large
                color="deep-orange lighten-1"
            >
                cancel
            </v-icon>
            <!-- <button
              @click="save" v-else-if="isEditing"
              class="mt-3 bg-white border-orange-200 border border-solid
                        rounded-lg px-2 py-2 font-semilight text-mainColor"
            >
                Save
            </button>
            <button
              v-if="isEditing" @click="isEditing = false"
              class="mt-3 bg-white border-orange-200 border border-solid
                        rounded-lg px-2 py-2 font-semilight text-mainColor"
            >
                Cancel
            </button> -->
        </div>
        <!-- <div v-if="showEditForm">
            hi
        </div> -->
    </div>
</template>
<script>

export default {
  name: 'CardEditExamInfo',
  data() {
    return {
      showInfo: true,
      showEditForm: false,
      isEditing: false,
      examInfo: {
        examTitle: 'Exam Title Dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        description: 'Exam Description Dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      },
    };
  },
  methods: {
    clickSetting() {
      this.showInfo = false;
      this.showEditForm = true;
    },
    save() {
      this.examInfo.examTitle = this.$refs.exam_title.value;
      this.examInfo.description = this.$refs.exam_description.value;
      this.isEditing = !this.isEditing;
    },
  },
};
</script>

<style>
.view {
  border-color: transparent;
  background-color: initial;
  color: initial
}
</style>
