<template>
  <div>
    <Header main="Exam hub" :current="textmenu">
      <button
        @click="onClickBack"
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
      >
        Back
      </button>
    </Header>
    <PreviewList v-model="questions"></PreviewList>
    <v-snackbar
      v-model="snackbar"
      color="red accent-2"
      absolute
      centered
      top
      text
      outlined
    >
      {{ text }}
    </v-snackbar>
    <Loading v-model="isLoading"></Loading>
  </div>
</template>

<script>
import api from '@/services/apis';
import Loading from '@/components/Loading.vue';
import Header from '@/components/Header/Header.vue';
import PreviewList from '@/components/Form/PreviewForm/PreviewList.vue';

export default {
  name: 'Examhub',
  components: {
    Loading,
    Header,
    PreviewList,
  },
  data() {
    return {
      textmenu: '',
      qlist: [],
      questions: [],
      isLoading: false,
      text: '',
      timeout: 2000,
      snackbar: false,
      examInfo: {
        examTitle: '',
        description: '',
      },
    };
  },
  methods: {
    async callApi() {
      this.isLoading = true;
      const questionsApi = await api
        .examList(this.$route.params.eid)
        .then((res) => res.data);
      const data = await api.examDetail(this.$route.params.eid);
      if (data.status === 200) {
        this.examInfo.examTitle = data.data[0].title;
        this.examInfo.description = data.data[0].description;
      }

      this.questions = api.reverse(questionsApi);
      this.isLoading = false;
      this.textmenu = `> ${this.examInfo.examTitle}`

    },
    onClickBack() {
      this.$router
        .push({
          name: 'ExamHubTeacher',
        })
        .catch(() => true);
    },
  },
  created() {
    this.callApi()
  },
};
</script>
