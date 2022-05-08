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
            <v-checkbox
              v-model="shareQ"
              :label="`Share only questions to Examhub`"
              :disabled="!isEditing"
              color="#EF7F4C"
            ></v-checkbox>
          </div>
        </v-col>
        <v-col class="d-flex align-center mb-6">
          <div>
            <v-icon
              @click="isEditing = !isEditing"
              v-if="!isEditing"
              class="ml-5"
              large
              color="orange darken-2"
            >
              settings
            </v-icon>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="isEditing" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Exam Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label="Exam Title"
                  v-model="examTitle"
                  required
                  color="#EF7F4C"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label="Exam Description"
                  v-model="description"
                  color="#EF7F4C"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-checkbox
                v-model="shareQ"
                :label="`Share only questions to Examhub`"
                :disabled="!isEditing"
                color="#EF7F4C"
              ></v-checkbox>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="reset"> Close </v-btn>
          <v-btn color="#EF7F4C" text @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      centered
      top
      text
      outlined
      :multi-line="true"
      :timeout="1000"
      :color="snackbarColor"
    >
      {{ snackbarMessage }}
    </v-snackbar>
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
      snackbar: false,
      snackbarColor: 'green',
      snackbarMessage: '',
      isLoading: false,
      showInfo: true,
      showEditForm: false,
      isEditing: false,
      examInfo: {
        examTitle: '',
        description: '',
      },
      shareQ: false,
      examTitle: '',
      description: '',
      shareQOld: false,
    };
  },
  methods: {
    snacbarF(message, color) {
      this.snackbar = true;
      this.snackbarColor = color;
      this.snackbarMessage = message;
    },
    reset() {
      this.isEditing = false;
      this.shareQ = this.shareQOld;
    },
    clickSetting() {
      this.showInfo = false;
      this.showEditForm = true;
    },
    async save() {
      this.isLoading = true;
      const data = await api.updateExamDetail(this.$route.params.eid, {
        title: this.examTitle,
        description: this.description,
        shareQ: this.shareQ,
      });
      if (data.status === 200) {
        this.snacbarF('update success', 'green');
        this.examInfo.examTitle = data.data[0].title;
        this.examTitle = data.data[0].title;
        this.examInfo.description = data.data[0].description;
        this.description = data.data[0].description;
        this.shareQ = data.data[0].shareQ;
        this.shareQOld = data.data[0].shareQ;
        this.isEditing = !this.isEditing;
        this.isLoading = false;
      } else {
        this.snacbarF('update fail', 'red');
      }
    },
    async init() {
      this.isLoading = true;
      const data = await api.examDetail(this.$route.params.eid);
      if (data.status === 200) {
        if (data.data[0].uid !== this.$cookies.get('uid')) {
          this.$router
            .push({
              name: 'YourExam',
            })
            .catch(() => true);
        }
        this.examInfo.examTitle = data.data[0].title;
        this.examInfo.description = data.data[0].description;
        this.examTitle = data.data[0].title;
        this.description = data.data[0].description;
        this.shareQ = data.data[0].shareQ;
        this.shareQOld = data.data[0].shareQ;
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
