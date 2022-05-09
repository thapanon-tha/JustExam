<template>
  <div class="mb-96">
    <Header main="Exam channel">
      <button
        @click="onClick('NewChannelTeacher')"
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
      >
        + New channel
      </button>
    </Header>
    <v-container>
      <v-tabs v-model="tap" color="#EF7F4C">
        <v-tab href="#tab-1" v-if="disableTap" @click="channelmenu(1)">IN PROGRESS</v-tab>
        <v-tab href="#tab-2" @click="channelmenu(3)">UP COMING</v-tab>
        <v-tab href="#tab-3" @click="channelmenu(2)">FINISH</v-tab>
      </v-tabs>
    </v-container>
    <div class="grid grid-cols-4 gap-10 ml-40 mr-40 mt-10">
      <div v-for="box in channels" :key="box.cid">
        <div class="w-60">
          <CardChannel
            v-bind:detail="box"
            @onClick="onClick('InsideChannelTeacher', box.cid)"
            @clickDelete="onClickDeleteChannel(box.cid)"
          />
        </div>
      </div>
    </div>
    <Loading v-model="isLoading"></Loading>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import CardChannel from '@/components/Card/CardChannel.vue';
import api from '@/services/apis';
import Loading from '@/components/Loading.vue';

export default {
  name: 'ExamChannelTeacher',
  components: {
    Header,
    CardChannel,
    Loading,
  },
  data() {
    return {
      channels: [],
      channelsAll: [],
      isLoading: false,
      disableTap: true,
      tap: 0,
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
    async onClickDeleteChannel(cid) {
      await api.deleteChannel(cid).then((res) => {
        if (res.status === 200) {
          this.getChannels();
        }
      });
    },
    async getChannels() {
      this.isLoading = true;
      this.channels = await api.channels().then((res) => res.data);
      this.channelsAll = this.channels;
      this.channelmenu(1);
      this.isLoading = false;
    },
    channelmenu(menu) {
      // inprogress
      if (menu === 1) {
        this.channels = this.channelsAll.filter((e) => {
          const date = new Date();
          const start = new Date(e.startAt);
          const end = new Date(e.endAt);
          return start < date && end > date;
        });
        this.channels.sort((a, b) => {
          const startA = new Date(a.endAt);
          const startB = new Date(b.endAt);
          return startB - startA;
        });
        this.channels.reverse();
        if (this.channels.length === 0) {
          this.tap = 0;
          this.channelmenu(3);
          this.disableTap = false;
        }
      }
      // finish
      if (menu === 2) {
        this.channels = this.channelsAll.filter((e) => {
          const date = new Date();
          const end = new Date(e.endAt);
          return end < date;
        });
        this.channels.sort((a, b) => {
          const startA = new Date(a.startAt);
          const startB = new Date(b.startAt);
          return startB - startA;
        });
      }
      // upcumming
      if (menu === 3) {
        this.channels = this.channelsAll.filter((e) => {
          const date = new Date();
          const start = new Date(e.startAt);
          return start > date;
        });
        this.channels.sort((a, b) => {
          const startA = new Date(a.startAt);
          const startB = new Date(b.startAt);
          return startB - startA;
        });
        this.channels.reverse();
      }
    },
  },
  watch: {
    channels(newVal, oldVal) {
      if (newVal.length === 0) {
      }
    },
  },
  created() {
    this.getChannels();
  },
};
</script>
