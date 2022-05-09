<template>
  <div class="mb-96">
    <Header main="Exam channel"> </Header>
    <body>
      <v-container class="text-xl-h4" fluid>
        <v-row class="justify-center m-2"> This examinations will begin </v-row>
        <v-row class="justify-center m-2"> on the scheduled </v-row>
        <v-row class="justify-center m-2">
          {{ channels.schedule | moment('Do  MMMM  YYYY') }}
        </v-row>
        <v-row class="justify-center m-2">
          {{ channels.startAt | moment('H:mm') }} -
          {{ channels.endAt | moment('H:mm') }}
        </v-row>
        <div v-if="showTime">
          <Countdown
            v-if="isDisable"
            class="justify-center"
            v-bind:endTime="channels.startAt"
            v-bind:submit="onTime"
            v-bind:text="text"
          />
          <Countdown
            v-if="!isDisable"
            class="justify-center"
            v-bind:endTime="channels.endAt"
            v-bind:submit="onTime"
            v-bind:text="text2"
          />
        </div>
        <v-row
          class="justify-center m-2 text-xl"
          v-if="channels.members[0].state === 'FINISH'"
        >
          <h1 class="text-red-500">you have finish this examination</h1>
        </v-row>
        <div v-else>
          <v-row class="justify-center m-2 text-xl">
            This webside will save your answers to storage ( Only On This
            browser )
          </v-row>
          <v-row class="justify-center m-2 text-xl">
            If you disconnect you rejoin to continue examination
          </v-row>
        </div>

        <v-row class="flex justify-center">
          <v-btn
            color="mainColor"
            elevation="2"
            :loading="isLoading"
            large
            class="m-3"
            @click="backMenu"
            >back</v-btn
          >
          <v-btn
            v-if="isFinish"
            color="orange darken-1"
            elevation="2"
            :loading="isLoading"
            large
            :disabled="isDisable"
            class="m-3"
            @click="onClickStart"
            >{{ startButton }}</v-btn
          >
        </v-row>
      </v-container>
    </body>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import Countdown from '@/components/Countdown/Countdown.vue';
import api from '@/services/apis';

export default {
  name: 'ExamChannelLobby',
  components: {
    Header,
    Countdown,
  },
  data() {
    return {
      isLoading: false,
      isDisable: true,
      isFinish: false,
      showTime: true,
      channels: {},
      text: 'Start In',
      text2: 'End In',
      startButton: 'start',
    };
  },
  methods: {
    backMenu() {
      this.$router.push({ name: 'ExamChannelStudent' }).catch(() => {});
    },
    onClickStart() {
      this.$router
        .push({
          name: 'ExamChannelOnExam',
          params: { cid: this.$route.params.cid },
        })
        .catch(() => {});
    },
    onClickLeaveChannel() {
      //
    },
    onTime() {
      const now = new Date();
      const start = new Date(this.channels.startAt);
      const end = new Date(this.channels.endAt);
      if (
        now > start
        && now < end
        && this.channels.members[0].state !== 'FINISH'
      ) {
        this.isDisable = false;
        this.isFinish = true;
      } else {
        this.isDisable = true;
      }
    },
    async callapi() {
      const response = await api
        .channelsDetail(this.$route.params.cid)
        .then((e) => e[0]);
      if (response.status < 300) {
        this.channels = response.data;
        const now = new Date();
        const start = new Date(this.channels.startAt);
        const end = new Date(this.channels.endAt);
        if (response.data.members.state === 'IN PROCESS') {
          this.startText = 'continue';
        }
        if (now > start && this.channels.members[0].state !== 'FINISH') {
          this.isFinish = true;
          this.isDisable = false;
        } else {
          this.isDisable = true;
          this.isFinish = false;
        }
        if (now > end) {
          this.isFinish = false;
          this.showTime = false;
        } else {
          this.showTime = true;
        }
        if (this.channels.members[0].state === 'FINISH') {
          this.showTime = false;
        }
      }
    },
  },
  mounted() {
    //
  },
  created() {
    this.callapi();
  },
};
</script>
