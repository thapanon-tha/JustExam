<template>
  <div>
    <Header main="Your exam" current="> New exam">
      <button
        @click="dialogPreview = true"
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
      >
        Preview
      </button>
    </Header>
    <v-container>
      <ExamInfoForm v-model="examInfo" />
      <div class="flex flex-col items-center justify-center">
        <QuestionList @update:qlist="updateQuestion" />
      </div>
      <div class="flex gap-10 mt-10 justify-center">
        <ActionButton
          class="ml-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor hover:text-white hover:bg-mainColor"
          name="Create"
          @on-click="onClickCreate()"
        />
        <ActionButton
          class="bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-grayColor hover:text-white hover:bg-mainColor"
          name="Cancle"
          @on-click="onClickCancel()"
        />
      </div>

      <v-dialog v-model="dialogPreview" persistent fullscreen>
        <v-card>
          <v-toolbar dark color="#ef7f4c">
            <v-toolbar-title>Preview Exam</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialogPreview = false">
                <v-btn icon dark @click="dialogPreview = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-title></v-card-title>
          <PreviewList v-model="questions"></PreviewList>
          <v-card-actions>
            <v-card-actions> </v-card-actions>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      centered
      top
      text
      outlined
      :multi-line="true"
      :timeout="2000"
      :color="snackbarColor"
    >
      {{ snackbarMessage }}
    </v-snackbar>
    <Loading v-model="isLoading"></Loading>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import QuestionList from '@/components/Form/QuestionForm/QuestionList.vue';
import ExamInfoForm from '@/components/Form/YourExamForm/ExamInfoForm.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import PreviewList from '@/components/Form/PreviewForm/PreviewList.vue';
import Loading from '@/components/Loading.vue';

import api from '@/services/apis';

export default {
  name: 'NewExam',
  components: {
    QuestionList,
    ExamInfoForm,
    Header,
    ActionButton,
    PreviewList,
    Loading,
  },
  data() {
    return {
      snackbar: false,
      snackbarColor: '',
      snackbarMessage: '',
      isLoading: false,
      dialogPreview: false,
      sheet: false,
      examInfo: { title: '', description: '', shareQ: false },
      createStatus: false,
      questions: [],
    };
  },
  methods: {
    updateQuestion(data) {
      this.questions = data;
    },
    onClick(pageName) {
      this.$router.push({ name: pageName });
    },
    onClickCancel() {
      this.$router.push({ name: 'YourExam' }).catch(() => true);
    },
    onClickCreate() {
      this.isLoading = true;
      this.create();
    },

    snackbarF(message, color) {
      this.snackbar = true;
      this.snackbarMessage = message;
      this.snackbarColor = color;
    },
    async create() {
      this.isLoading = true;
      try {
        const res = await api
          .createExams({ ...this.examInfo })
          .then((res2) => ({
            ...res2.data,
            status: res2.status,
          }));
        if (res.status === 201) {
          const resultMap = api.examMapper(this.questions);
          const questionsResp = await api
            .createQuestions(res.eid, resultMap)
            .then((res2) => ({
              ...res2.data,
              status: res2.status,
            }));
          if (questionsResp.status >= 200 && questionsResp.status < 300) {
            this.isLoading = false;
            this.snackbarF('create success', 'green');
            setTimeout(() => {
              this.$router.push({ name: 'YourExam' }).catch(() => true);
            }, 2500);
          } else {
            // delete
            await api.deleteExams(res.eid);
            if (questionsResp.status === 413) {
              throw new Error('Image is too large');
            } else {
              throw new Error('Something wrong try again later');
            }
          }
        } else if (res.status === 422) {
          throw new Error('exam title or description has empty');
        } else {
          throw new Error('Something wrong try again later');
        }
      } catch (e) {
        this.isLoading = false;
        this.snackbarF(e, 'red');
      }
    },
  },
};
</script>
