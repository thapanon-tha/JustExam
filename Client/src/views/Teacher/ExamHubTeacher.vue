<template>
  <div class="mb-96">
    <Header main="Exam hub" button="Search">
      <input
        class="w-80 h-10 border border-solid rounded-md border-outlineColor border-opacity-40 focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100 focus:outline-none px-3"
        name="Channel Title"
        type="text"
        placeholder="Search exam"
        v-model="search"
      />
    </Header>
    <div class="grid grid-cols-4 gap-5 ml-40 mr-40 mt-10">
      <div v-for="box in exams.rows" :key="box.eid">
        <div class="w-60" @click="goHub(box.eid)">
          <CardHub :detail="box" />
        </div>
      </div>
    </div>
    <!-- <div class="d-flex justify-center align-end mb-6 text-center">
      <div class="mt-auto">
        <v-pagination
          v-model="page"
          :length="Number(totalPage)"
          :total-visible="7"
        ></v-pagination>
      </div>
    </div> -->
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import CardHub from '@/components/Card/CardHub.vue';
import api from '@/services/apis';

export default {
  name: 'ExamHubTeacher',
  components: {
    Header,
    CardHub,
  },
  data() {
    return {
      page: 1,
      totalPage: 1,
      totalRows: 1,
      search: '',
      sort: '',
      boxlist: 5,
      exams: [],
    };
  },
  mounted() {},
  methods: {
    async callApi() {
      api.examsHub(this.page, this.search).then((e) => {
        this.exams = e.data;
        this.page = e.currentPage;
        this.totalPage = e.totalPage;
        this.totalRows = e.totalRows;
      });
    },
    goHub(eid) {
      this.$router
        .push({
          name: 'Examhub',
          params: { eid },
        })
        .catch(() => true);
    },
  },
  created() {
    this.callApi();
  },
  watch: {
    search() {
      this.callApi();
    },
  },
};
</script>
