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

      <div class="text-center">
        <v-bottom-sheet v-model="sheet" persistent>
          <v-sheet class="text-center">
            <pulse-loader
              :loading="loaderOption.loading"
              :color="loaderOption.color"
              :size="loaderOption.size"
            ></pulse-loader>
            <div v-if="createSuccess.status === true">
              <v-alert dense text type="success">
                <strong>{{ createSuccess.message }}</strong>
              </v-alert>
            </div>
            <div v-if="createFail.status === true">
              <v-alert dense outlined type="error">
                <strong>{{ createFail.message }}</strong>
              </v-alert>
            </div>
          </v-sheet>
        </v-bottom-sheet>
      </div>
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
      this.sendreq();
    },
    async sendreq() {
      this.loaderOption.loading = true;

      try {
        const res = await api.createExams(this.examInfo);
        if (res !== undefined && res.status === 201) {
          this.loaderOption.loading = false;
          this.createSuccess.status = true;
          this.createSuccess.message = "created success";
          setTimeout(() => {
            this.createSuccess.status = false;
            this.createSuccess.message = res;
            this.sheet = false;
          }, 2000);
          setTimeout(() => {
            this.this.$router.push({ name: "YourExam" }).catch(() => true);
          }, 2500);
        } else {
          throw new Error("Create Fail");
        }
      } catch (e) {
        console.log(e);
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
