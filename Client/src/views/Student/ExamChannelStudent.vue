<template>
  <div class="mb-96">
    <Header main="Exam channel">
      <button
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
        @click="dialog = true"
      >
        Join channel
      </button>
    </Header>
    <v-container>
      <v-tabs v-model="tap" color="#EF7F4C">
        <v-tab href="#tab-1" v-if="disableTap" @click="channelmenu(1)"
          >IN PROGRESS</v-tab
        >
        <v-tab href="#tab-2" @click="channelmenu(3)">UP COMING</v-tab>
        <v-tab href="#tab-3" @click="channelmenu(2)">FINISH</v-tab>
        <v-tab href="#tab-4" @click="channelmenu(4)">TA</v-tab>
      </v-tabs>
    </v-container>
    <div class="grid grid-cols-4 gap-5 ml-40 mr-40 mt-10">
      <div v-for="box in channels" :key="box.id">
        <div class="w-60">
          <CardStudentChannel
            v-bind:detail="box"
            @onClick="onClick('ExamChannelLobby', box.cid)"
            @clickLeave="onClickDeleteChannel(box.cid)"
          />
        </div>
      </div>
    </div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="420">
        <v-card>
          <v-card-title class="text-h6"> Enter your invite code </v-card-title>
          <div class="flex flex-row ml-10 mt-5 mb-5">
            <label class="text-sm">Invite code</label>
            <input
              type="text"
              v-model="inviteCode"
              class="ml-4 px-3 py-2 text-sm font-semilight text-gray-700 bg-subColor bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100 focus:outline-none"
              placeholder="Invite code"
            />
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange darken-1" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn color="orange darken-1" text @click="searchChannel">
              Join
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="loading" persistent max-width="420">
        <v-card>
          <v-card-title class="text-h6"> Loading </v-card-title>
          <v-card-text>
            <div class="text-center">
              <v-progress-circular
                indeterminate
                color="red"
              ></v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog2" persistent max-width="420">
        <v-card>
          <v-card-title class="text-h6"> Enter your student ID </v-card-title>
          <div class="flex flex-row ml-10 mt-5">
            <CardChannel v-bind:detail="channelsresult" />
          </div>
          <div class="flex flex-row ml-10 mt-5">
            <label>Student ID</label>
            <input
              type="text"
              v-model="studentID"
              class="ml-5 px-3 py-2 text-sm font-semilight text-gray-700 bg-subColor bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100 focus:outline-none"
              placeholder="Student ID"
            />
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="orange darken-1" text @click="dialog2 = false">
              Cancel
            </v-btn>
            <v-btn color="orange darken-1" text @click="joinChannel">
              Join
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-snackbar v-model="snackbar" :multi-line="true" :top="true">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          v-bind:color="isSuccess === 1 ? 'success' : 'error'"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <Loading v-model="isLoading"></Loading>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
import CardStudentChannel from '@/components/Card/CardStudentChannel.vue';
import CardSelectedExam from '@/components/Card/CardSelectedExam.vue';
import CardChannel from '@/components/Card/CardChannel.vue';
import Loading from '@/components/Loading.vue';
import api from '@/services/apis';

export default {
  name: 'ExamChannelTeacher',
  components: {
    Header,
    CardStudentChannel,
    CardSelectedExam,
    CardChannel,
    Loading,
  },
  data() {
    return {
      channelsAll: [],
      disableTap: true,
      tap: 0,
      isLoading: false,
      inviteCode: '',
      channelsresult: {},
      studentID: '',
      dialog: false,
      dialog2: false,
      loading: false,
      snackbar: false,
      channels: [],
      isSuccess: 0,
      snackbarMessage: '',
    };
  },
  methods: {
    onClick(pageName, cid) {
      const index = this.channels.findIndex((e) => e.cid === cid);
      if (
        this.channels[index].members[0].rid
        === '1297e88a-0d46-4f5d-a5bf-69ecbcc541b5'
      ) this.$router.push({ name: pageName, params: { cid } }).catch(() => {});
      else {
        this.$router
          .push({ name: 'ExamSummary', params: { cid } })
          .catch(() => {});
      }
    },
    onClickLeaveChannel() {
      //
    },
    async searchChannel() {
      this.loading = true;
      const result = await api
        .channels({ inviteCode: this.inviteCode })
        .then((e) => ({ ...e.data, status: e.status }));
      if (result.status >= 200 && result.status < 300) {
        this.dialog = false;
        this.dialog2 = true;
        this.loading = false;
        this.isSuccess = 1;
        this.snackbarMessage = 'Success';
        this.channelsresult = result;
      } else {
        this.snackbar = true;
        this.isSuccess = 0;
        this.snackbarMessage = 'Channel Not Found';
        this.loading = false;
        this.dialog = true;
      }
    },
    async joinChannel() {
      const response = await api
        .memberJoin(this.channelsresult.cid, {
          sid: this.studentID,
        })
        .then((e) => ({ ...e.data, status: e.status }));
      if (response.status < 300) {
        this.$router
          .push({
            name: 'ExamChannelLobby',
            params: { cid: this.channelsresult.cid },
          })
          .catch(() => {});
      }
    },
    async onClickDeleteChannel(cid) {
      this.isLoading = true;
      await api.leaveChannel(cid).then((res) => {
        if (res.status === 200) {
          this.callapi();
        }
      });
    },
    async callapi() {
      this.isLoading = true;
      const response = await api.channels().then((e) => e);
      if (response.status < 300) {
        this.channels = response.data;
        this.channelsAll = this.channels
        this.channelmenu(1);
        this.isLoading = false;
      }
    },

    channelmenu(menu) {
      // inprogress
      if (menu === 1) {
        this.channels = this.channelsAll.filter((e) => {
          const date = new Date();
          const start = new Date(e.startAt);
          const end = new Date(e.endAt);
          return start < date && end > date && e.members[0].rid!=='3a7c4d99-c414-44b8-bdd8-d7d625a99437';
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
          return end < date && e.members[0].rid!=='3a7c4d99-c414-44b8-bdd8-d7d625a99437';
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
          return start > date && e.members[0].rid!=='3a7c4d99-c414-44b8-bdd8-d7d625a99437';
        });
        this.channels.sort((a, b) => {
          const startA = new Date(a.startAt);
          const startB = new Date(b.startAt);
          return startB - startA;
        });
        this.channels.reverse();
      }

      if (menu === 4) {
        this.channels = this.channelsAll.filter((e) => {
          return e.members[0].rid==='3a7c4d99-c414-44b8-bdd8-d7d625a99437';
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
  mounted() {
    //
  },
  created() {
    this.callapi();
  },
};
</script>
