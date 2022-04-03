<template>
  <div class="mb-60">
    <Header main="Exam channel" current="> Inside channel" class="mb-10">
      <button
        @click="onClickMember"
        class="
          mt-3
          mr-3
          bg-white
          border-orange-200 border border-solid
          rounded-lg
          px-4
          py-3
          font-semilight
          text-mainColor
        "
      >
        Member
      </button>
    </Header>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
// import api from '@/services/apis';

export default {
  name: 'InsideChannelStudent',
  components: {
    Header,
  },
  data() {
    return {
      channelsApiInfo: {},
      channelInfo: {
        title: '',
        description: '',
        datePicked: '',
      },
    };
  },
  methods: {
    onClickMember() {
      this.$router.push({ name: 'MemberChannel' }).catch(() => true);
    },
    // async apiCall() {
    //   this.channelsApiInfo = await api
    //     .channelsDetail(this.$route.params.cid)
    //     .then((res) => res.data);
    //   this.channelInfo = this.channelsApiInfo;
    // },
  },
//   created() {
//     this.apiCall();
//   },
};
</script>
