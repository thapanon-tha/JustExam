<template>
  <div>
    <!-- <Header main="Your exam" current="> New exam" button="Back" to="YourExam" /> -->
    <NewExam />
  </div>
</template>

<script>
import QuestionList from "@/components/Form/QuestionForm/QuestionList.vue";
import NewExam from "@/views/Teacher/NewExam";
import api from "@/services/apis";

export default {
  name: "InsideYourExam",
  components: {
    QuestionList,
    NewExam,
  },
  data() {
    return {
      qlist: [],
      eid: this.$route.params.eid,
    };
  },
  methods: {
    async getExam() {
      const qlist = await api.examList(this.eid).then((res) => res.data);
      this.qlist = qlist.map((question) => {});
    },
  },
  created() {
    this.getExam();
  },
};
</script>
