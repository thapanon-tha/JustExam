<template>
  <div>
    <Header main="Your exam" current="> New exam">
      <button
        @click="onClick('YourExam')"
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

      <v-dialog v-model="sheet" persistent width="290">
        <v-card max-width="290">
          <v-card-title v-if="loaderOption.loading === true">Createing</v-card-title>
          <v-card-title v-if="loaderOption.loading === false">Result</v-card-title>
          <div class="d-flex align-center">
            <v-card-text class="d-flex align-center justify-center">
              <div v-if="loaderOption.loading === true">
                <pulse-loader
                  :loading="loaderOption.loading"
                  :color="loaderOption.color"
                  :size="loaderOption.size"
                >
                </pulse-loader>
              </div>
              <div v-if="createSuccess.status === true" class="d-flex align-center">
                <v-icon color="green" large> mdi-check-circle </v-icon>
                <strong>{{ createSuccess.message }}</strong>
              </div>
              <div v-if="createFail.status === true" class="d-flex align-center">
                <v-icon color="red" large> mdi-alert-circle </v-icon>
                <strong>{{ createFail.message }}</strong>
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import QuestionList from "@/components/Form/QuestionForm/QuestionList.vue";
import ExamInfoForm from "@/components/Form/YourExamForm/ExamInfoForm";
import InputForm from "@/components/Form/InputForm";
import ActionButton from "@/components/Button/ActionButton.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import api from "@/services/apis";

export default {
  name: "NewExam",
  components: {
    QuestionList,
    ExamInfoForm,
    Header,
    InputForm,
    ActionButton,
    PulseLoader,
  },
  data() {
    return {
      sheet: false,
      examInfo: { title: "", description: "" },
      createStatus: false,
      questions: [],
      createSuccess: {
        status: false,
        message: "",
      },
      createFail: {
        status: false,
        message: "",
      },
      loaderOption: {
        size: "5vh",
        color: "#ef7f4c",
        loading: false,
      },
    };
  },
  methods: {
    updateQuestion(data) {
      this.questions = data;
    },
    onClick(pageName) {
      this.$router.push({ name: pageName }).catch(() => {});
    },
    onClickCancel() {
      this.$router.push({ name: "YourExam" }).catch(() => true);
    },
    onClickCreate() {
      this.sheet = !this.sheet;
      this.create();
    },
    async create() {
      this.loaderOption.loading = true;
      try {
        const res = await api.createExams(this.examInfo).then((res) => {
          return {
            ...res.data,
            status: res.status,
          };
        });
        if (res.status === 201) {
          const resultMap = api.examMapper(this.questions);
          const questionsResp = await api.createQuestions(res.eid, resultMap).then((res) => {
            return {
              ...res.data,
              status: res.status,
            };
          });
          if (questionsResp.status >= 200 && questionsResp.status < 300) {
            this.loaderOption.loading = false;
            this.createSuccess.status = true;
            this.createSuccess.message = "created success";
            setTimeout(() => {
              this.createSuccess.status = false;
              this.createSuccess.message = "";
              this.sheet = false;
            }, 2000);
            setTimeout(() => {
              this.this.$router.push({ name: "YourExam" }).catch(() => true);
            }, 2500);
          } else {
            throw new Error("Create Fail");
          }
        } else {
          throw new Error("Create Fail");
        }
      } catch (e) {
        console.log(e);
        this.loaderOption.loading = false;
        this.createFail.status = true;
        this.createFail.message = e;
        setTimeout(() => {
          this.createFail.status = false;
          this.createFail.message = e;
          this.sheet = false;
        }, 2000);
      }
    },
  },
};
</script>
