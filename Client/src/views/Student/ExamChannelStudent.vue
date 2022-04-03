<template>
  <div class="mb-96">
    <Header main="Exam channel">
      <button
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
        Join channel
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
    <div class="grid grid-cols-4 gap-5 ml-40 mr-40 mt-10">
      <div v-for="box in channels" :key="box.cid">
        <div class="w-60">
          <CardStudentChannel
            v-bind:detail="box"
            @onClick="onClick('InsideChannelStudent', box.cid)"
            @clickDelete="onClickDeleteChannel()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import CardStudentChannel from '@/components/Card/CardStudentChannel.vue';
// import api from '@/services/apis';

export default {
  name: 'ExamChannelTeacher',
  components: {
    Header,
    CardStudentChannel,
  },
  data() {
    return {
      channels: [],
      sortlist: [
        {
          name: 'Sort by uncoming',
          value: 'comin',
        },
        {
          name: 'Sort by alphabet',
          value: 'alpha',
        },
      ],
    };
  },
  methods: {
    onClick(pageName, cid) {
      this.$router.push({ name: pageName, params: { cid } }).catch(() => {});
    },
    onClickLeaveChannel() {
      //
    },
    // async getChannels() {
    //   this.channels = await api.channels().then((res) => res.data);
    // },
  },
  mounted() {
    //
  },
  // created() {
  //   this.getChannels();
  // },
};
</script>
