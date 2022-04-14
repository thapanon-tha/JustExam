<template>
  <div class="mb-96">
    <Header main="Your exam">
      <button
        @click="onClick('NewExam')"
        class="
          mt-3
          bg-white
          border-orange-200 border border-solid
          rounded-lg
          px-8
          py-3
          font-semilight
          text-mainColor
        "
      >
        + New exam
      </button>
    </Header>
    <div class="flex justify-end mr-15 mt-5">
      <select
        class="
          border
          rounded-md
          border-solid border-mainColor border-opacity-40
          bg-white
          p-2
          text-mainColor
          font-semilight
          text-sm text-center
        "
      >
        <option
          v-for="(item, index) in sortlist"
          :key="index"
          :value="item.value"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="grid grid-cols-4 gap-10 ml-40 mr-40 mt-10">
      <div v-for="box in examsData" :key="box.eid">
        <CardExam
          @onClick="onClick('InsideYourExam', box.eid)"
          v-bind:detail="box"
          @clickEdit="onClickEdit('InsideYourExam', box.eid)"
          @clickDelete="onClickDeleteExam(box.eid)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import CardExam from "@/components/Card/CardExam.vue";
import api from "@/services/apis";

export default {
  name: "YourExam",
  components: {
    CardExam,
    Header,
  },
  data() {
    return {
      examsData: [],
      sortlist: [
        {
          name: "Sort by uncoming",
          value: "comin",
        },
        {
          name: "Sort by alphabet",
          value: "alphabet",
        },
      ],
    };
  },
  methods: {
    onClick(pageName, eid) {
      this.$router.push({ name: pageName, params: { eid } }).catch(() => true);
    },
    onClickEdit(pageName, eid) {
      this.$router.push({ name: pageName, params: { eid } }).catch(() => true);
    },
    async onClickDeleteExam(eid) {
      const result = await api.deleteExams(eid).then((res) => res);
      if (result.status >= 200 && result.status < 300) {
        window.location.reload();
      }
    },
    async getExam() {
      const data = await api.exams().then((res) => res);
      if (data.status === 200) {
        this.examsData = data.data;
      }
    },
  },
  mounted() {
    //
  },
  created() {
    this.getExam();
  },
};
</script>
