<template>
  <div>
    <Header main="Exam channel" current="> Score exam">
      <button
        @click="onClickBack"
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
      >
        Back
      </button>
    </Header>
    <v-container>
      <div>
        <ScoreQuestionList
          v-model="questionsList"
          @update:qlist="updateQuestion"
        />
      </div>
    </v-container>
    <div class="flex gap-10 mt-10 justify-center">
      <ActionButton
        class="ml-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor hover:text-white hover:bg-mainColor"
        name="Save"
        @on-click="onClickSave()"
      />
      <ActionButton
        class="bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-grayColor hover:text-white hover:bg-mainColor"
        name="Cancle"
        @on-click="onClickCancel()"
      />
    </div>

    <v-snackbar v-model="snackbar" :multi-line="true" :top="true">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind:color="isSuccess === 1 ? 'success' : 'error'"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <Loading v-model="isLoading"></Loading>
  </div>
</template>
<script>
import Header from '@/components/Header/Header.vue';
import ScoreQuestionList from '@/components/Form/TotalScoreForm/ScoreQuestionList.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import Loading from '@/components/Loading.vue';
import api from '@/services/apis';

export default {
  name: 'ScoreExamPage',
  components: {
    Header,
    ScoreQuestionList,
    ActionButton,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      examTitle: 'Exam Title Data',
      description: 'Exam Description Data',
      questionsList: [],
      snackbarMessage: '',
      snackbar: false,
      isSuccess: true,
    };
  },
  methods: {
    onClickBack() {
      this.$router
        .push({
          name: 'InsideChannelTeacher',
          params: { cid: this.$route.params.cid },
        })
        .catch(() => true);
    },
    async onClickSave() {
      this.isLoading = true;
      const data = this.questionsList.map((data) => api.channelReverse(data));
      const response = await api
        .updateScore(data, this.$route.params.cid, this.$route.params.ecid)
        .then((res) => ({ data: res.data, status: res.status }));
      if (response.status >= 200 && response.status <= 299) {
        this.snackbarMessage = 'success';
        this.snackbar = true;
        this.isSuccess = true;
        window.location.reload();
      } else {
        this.isLoading = false;
        this.snackbarMessage = 'update score fail';
        this.isSuccess = true;
        this.snackbar = false;
      }
    },
    onClickCancel() {
      this.onClickBack();
    },
    async updateQuestion(data) {
      this.questionsList = data;
    },
  },
};
</script>
