<template>
  <div>
    <Header main="Edit Exam">
      <button
        @click="dialogPreview = true"
        class="mt-3 mr-1 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
      >
        Preview
      </button>
      <!-- eslint-disable max-len -->
      <button
        @click="onClickBack"
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
      >
        <!-- eslint-enable max-len -->
        Back
      </button>
    </Header>
    <v-container>
      <div>
        <EditExamInfo />
      </div>
    </v-container>
    <v-container class="flex justify-center">
      <div>
        <EditQuestionList @update:qlist="updateQuestion" />
      </div>
    </v-container>
    <div class="flex gap-10 mt-10 justify-center">
      <!-- eslint-disable max-len -->
      <ActionButton
        class="ml-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-3 font-semilight text-mainColor hover:text-white hover:bg-mainColor"
        name="Update"
        @on-click="onClickUpdate()"
        :isLoading="loading"
      />
      <ActionButton
        class="bg-white border-orange-200 border border-solid rounded-lg px-6 py-3 font-semilight text-grayColor hover:text-white hover:bg-mainColor"
        name="Cancle"
        @on-click="onClickCancel()"
        :isLoading="loading"
      />
      <!-- eslint-enable max-len -->
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
  </div>
</template>
<script>
import Header from '@/components/Header/Header.vue';
import EditExamInfo from '@/components/Form/YourExamForm/EditExamInfo.vue';
import EditQuestionList from '@/components/Form/QuestionForm/EditQuestionList.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import PreviewList from '@/components/Form/PreviewForm/PreviewList.vue';

import api from '@/services/apis';

export default {
  name: 'EditExam',
  components: {
    Header,
    EditExamInfo,
    EditQuestionList,
    ActionButton,
    PreviewList,
  },
  data() {
    return {
      dialogPreview: false,
      loading: false,
      questions: [],
    };
  },
  methods: {
    onClickBack() {
      this.$router.push({ name: 'YourExam' }).catch(() => true);
    },
    onClickCancel() {
      this.$router.push({ name: 'YourExam' }).catch(() => true);
    },
    updateQuestion(data) {
      this.questions = data;
    },
    async onClickUpdate() {
      this.loading = true;
      const resultMap = api.examMapper(this.questions);
      const questionsResp = await api
        .updateQuestions(this.$route.params.eid, resultMap)
        .then((res2) => ({
          ...res2.data,
          status: res2.status,
        }));
      if (questionsResp.status >= 200 && questionsResp.status <= 299) {
        this.$router.push({ name: 'YourExam' }).catch(() => true);
      } else {
        this.$router.go(this.$router.currentRoute);
      }
    },
  },
  created() {},
};
</script>
