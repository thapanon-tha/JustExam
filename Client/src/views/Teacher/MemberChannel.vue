<template>
  <div>
    <Header main="Exam channel" current="> Inside channel > Member">
      <button
        @click="onClickBack"
        class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        Back
      </button>
    </Header>
    <MemberTable v-if="!isLoaging" :members="members" />
    <Loading v-if="isLoaging"></Loading>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import MemberTable from '@/components/Form/ChannelForm/MemberTable.vue';
import api from '@/services/apis';
import Loading from '@/components/Loading.vue';

export default {
  name: 'MemberChannel',
  components: {
    Header,
    MemberTable,
    Loading,
  },
  data() {
    return {
      isLoaging: false,
      members: [],
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
    async getMember(cid) {
      this.isLoaging = true;
      const data = await api.getMember(cid).then((res) => res);
      if (data.status === 200) {
        this.members = data.data;
        this.members = this.members.map((e) => ({
          cid: e.cid,
          mid: e.mid,
          rid: e.rid,
          sid: e.sid,
          state: e.state,
          uid: e.uid,
          createdAt: e.createdAt,
          updatedAt: e.updatedAt,
          role: e.role.name,
          name: `${e.user.firstname} ${e.user.surname}`,
        }));
      }
      this.isLoaging = false;
    },
  },
  created() {
    this.getMember(this.$route.params.cid);
  },
};
</script>
