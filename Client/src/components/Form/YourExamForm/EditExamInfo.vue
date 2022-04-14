<template>
  <div class="ml-52">
    <div class="flex flex-wrap mt-10 bg-subColor border rounded-md w-auto">
      <div class="font-semibold text-md text-black mt-5 ml-5 mb-5">
        <div>
          <input
            type="text"
            ref="exam_title"
            :value="examInfo.examTitle"
            :disabled="!isEditing"
            class="w-40 px-3 py-3 text-base font-semilight text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100 focus:outline-none"
            :class="{ view: !isEditing }"
          />
        </div>
        <div>
          <input
            type="text"
            ref="exam_description"
            :value="examInfo.description"
            :disabled="!isEditing"
            class="w-40 px-3 py-3 text-base font-semilight text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100 focus:outline-none"
            :class="{ view: !isEditing }"
          />
        </div>
      </div>
      <v-icon
        @click="isEditing = !isEditing"
        v-if="!isEditing"
        class="ml-5"
        large
        color="orange darken-2"
      >
        settings
      </v-icon>
      <v-icon
        @click="save"
        v-else-if="isEditing"
        class="ml-5 text-right"
        large
        color="green accent-3"
      >
        check_circle
      </v-icon>
      <v-icon
        v-if="isEditing"
        @click="isEditing = false"
        class="ml-5 text-right"
        large
        color="deep-orange lighten-1"
      >
        cancel
      </v-icon>
    </div>
  </div>
</template>
<script>
import api from '@/services/apis';

export default {
  name: 'CardEditExamInfo',
  data() {
    return {
      showInfo: true,
      showEditForm: false,
      isEditing: false,
      examInfo: {
        examTitle: '',
        description: '',
      },
    };
  },
  methods: {
    clickSetting() {
      this.showInfo = false;
      this.showEditForm = true;
    },
    async save() {
      const data = await api.updateExamDetail(this.$route.params.eid, {
        description: this.$refs.exam_description.value,
        title: this.$refs.exam_title.value,
      });
      if (data.status === 200) {
        this.examInfo.examTitle = this.$refs.exam_title.value;
        this.examInfo.description = this.$refs.exam_description.value;
        this.isEditing = !this.isEditing;
      }
    },
    async init() {
      const data = await api.examDetail(this.$route.params.eid);
      if (data.status === 200) {
        this.examInfo.examTitle = data.data[0].title;
        this.examInfo.description = data.data[0].description;
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style>
.view {
  border-color: transparent;
  background-color: initial;
  color: initial;
}
</style>
