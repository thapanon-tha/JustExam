<template>
  <div class="mb-96">
    <Header main="Your exam">
      <button
        @click="onClick('NewExam')"
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
      >
        + New exam
      </button>
    </Header>
    <select
      class="border rounded-md border-solid border-mainColor border-opacity-40 bg-white p-2
            text-mainColor font-semilight text-sm"
      id="sort"
      name="sort"
      v-model="sort"
    >
      <option disabled value="">Sort by</option>
      <option
        v-for="(item, index) in sortlist"
        :key="index"
        :value="item.value"
      >{{ item.name }}</option>
    </select>
    <div class="grid grid-cols-4 gap-5 ml-40 mr-40 mt-20 static ">
      <div v-if="showSetting" class="w-auto bg-white border-2 border-orange-200 rounded-lg text-xs ml-52 absolute">
        <div class="p-1 border-b-2 border-orange-200 rounded-t-lg hover:bg-mainColor hover:text-white">Edit Exam</div>
        <div class="p-1 rounded-b-lg hover:bg-mainColor hover:text-white">Delete Exam</div>
      </div>
      <div @click="onClick('InsideYourExam', box.eid)" v-for="box in examsData" :key="box.eid">
        <CardExam 
          @clickSet="clickSetting" v-bind:detail="box"
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
      qlist: [],
      examsData: Object,
      boxlist: 4,
      showSetting: false,
      sortlist: [
        {
          name: "Incoming exam",
          value: "comin"
        },
        {
          name: "Alphabetical",
          value: "alpha"
        },
      ],
    };
  },
  methods: {
    onClick(pageName, eid) {
      this.$router.push({ name: pageName, params: { eid } }).catch(() => true);
    },

    async getExam() {
      const token = this.$cookies.get("username-localhost-8888");
      console.log(token);
      this.examsData = await api.exams().then((res) => res.data);
    },
    clickSetting() {
      this.showSetting = !this.showSetting;
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
