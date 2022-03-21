<template>
  <div class="mb-96">
    <Header main="Exam channel">
      <button
        @click="onClick('NewChannelTeacher')"
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
        + New channel
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
        id="sort"
        name="sort"
        v-model="sort"
      >
        <option disabled value="">Sort by</option>
        <option
          v-for="(item, index) in sortlist"
          :key="index"
          :value="item.value"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
    <div class="grid grid-cols-4 gap-5 ml-40 mr-40 mt-10">
      <div
        v-if="showSetting"
        class="
          w-auto
          bg-white
          border-2 border-orange-200
          rounded-lg
          text-xs
          ml-52
          absolute
        "
      >
        <div
          class="
            p-1
            border-b-2 border-orange-200
            rounded-t-lg
            hover:bg-mainColor hover:text-white
          "
        >
          Edit Channel
        </div>
        <div class="p-1 rounded-b-lg hover:bg-mainColor hover:text-white">
          Delete Channel
        </div>
      </div>
      <div v-for="box in channels" :key="box.cid">
        <div @click="onClick('InsideChannelTeacher')" class="w-60">
          <CardChannel v-bind:detail="box" @clickSet="clickSetting" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import CardChannel from "@/components/Card/CardChannel.vue";
import api from "@/services/apis";

export default {
  name: "ExamChannelTeacher",
  components: {
    Header,
    CardChannel,
  },
  data() {
    return {
      showSetting: false,
      boxlist: 4,
      channels: [],
      sort: "",
      sortlist: [
        {
          name: "Incoming exam",
          value: "comin",
        },
        {
          name: "Alphabetical",
          value: "alpha",
        },
      ],
    };
  },
  methods: {
    onClick(pageName) {
      this.$router.push({ name: pageName }).catch(() => {});
    },
    clickSetting() {
      this.showSetting = !this.showSetting;
    },
    async getChannels() {
      this.channels = await api.channels().then((res) => res.data);
    },
  },
  mounted() {
    //
  },
  created() {
    this.getChannels();
  },
};
</script>
