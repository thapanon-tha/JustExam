<template>
  <div class="ml-52 mr-52">
    <div class="flex flex-wrap mt-10 bg-subColor border rounded-md w-auto">
      <v-row>
        <v-col>
          <div class="font-semibold text-md text-black mt-5 ml-5 mb-5">
            <div>
              <input
                type="text"
                ref="exam_title"
                :value="examInfo.examTitle"
                :disabled="!isEditing"
                class="px-3 py-3 text-base font-semilight text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100 focus:outline-none"
                :class="{ view: !isEditing }"
              />
            </div>
            <div>
              <input
                type="text"
                ref="exam_description"
                :value="examInfo.description"
                :disabled="!isEditing"
                class="px-3 py-3 text-base font-semilight text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100 focus:outline-none"
                :class="{ view: !isEditing }"
              />
            </div>
          </div>
        </v-col>
        <v-col>
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
        </v-col>
      </v-row>
    </div>
    <Loading v-model="isLoading"></Loading>
  </div>
</template>
<script>
import api from '@/services/apis';
import Loading from '@/components/Loading.vue';

export default {
  name: 'CardEditExamInfo',
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
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
      this.isLoading = true;
      const data = await api.updateExamDetail(this.$route.params.eid, {
        description: this.$refs.exam_description.value,
        title: this.$refs.exam_title.value,
      });
      if (data.status === 200) {
        this.examInfo.examTitle = this.$refs.exam_title.value;
        this.examInfo.description = this.$refs.exam_description.value;
        this.isEditing = !this.isEditing;
        this.isLoading = false;
      }
    },
    async init() {
      this.isLoading = true;
      const data = await api.examDetail(this.$route.params.eid);
      if (data.status === 200) {
        if(data.data[0].uid!==this.$cookies.get('uid')){
          this.$router
        .push({
          name: 'YourExam',
        })
        .catch(() => true);
        }
        this.examInfo.examTitle = data.data[0].title;
        this.examInfo.description = data.data[0].description;
        this.isLoading = false;
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
