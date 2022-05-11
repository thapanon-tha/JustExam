<template>
  <div class="mb-60">
    <Header main="Exam channel" current="> Inside channel" class="mb-10">
      <button
        @click="onEditChannelInfo"
        class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        <v-icon small> mdi-border-color </v-icon>
        Edit
      </button>
      <button
        @click="onClickMember"
        class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        Member
      </button>
      <button
        @click="onClickSummary"
        class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
      >
        Exam Summary
      </button>
    </Header>
    <v-container class="lighten-5 flex justify-center gap-40">
      <div class="w-4/6">
        <EditChannelForm v-model="channelInfo" />
        <div class="flex flex-row mt-10 gap-40">
          <div>
            <div class="text-gray-700 font-semilight text-xl">Your Invite Code</div>
            <div class="flex flex-wrap mt-5">
              <p
                class="w-60 h-10 bg-subColor border border-outlineColor border-opacity-50 rounded-lg text-center pt-2"
              >
                {{ channelInfo.inviteCode }}
              </p>
              <div
                class="bg-subColor border border-outlineColor border-opacity-50 rounded-lg w-10 h-10"
              >
                <button
                  type="button"
                  v-clipboard:copy="channelInfo.inviteCode"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <v-icon large color="grey darken-1">link</v-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="ml-20">
            <ActionButton
              class="bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor"
              name="+ Add your exam"
              @on-click="onClickAddExam"
              v-if="showButton"
            />
            <CardSelectedExam
              @clickChange="onClickAddExam"
              @clickScore="clickScoreExam"
              @clickDelete="clickDeleteSelect"
              :detail="channelInfo.examChannel"
              :disabled="disabled"
              v-if="showSelected"
            />
            <div class="relative">
              <CardAddExam
                @clikClose="closeModalAddExam"
                @clickSelect="clickSelectExam"
                class="fixed top-52 left-96"
                v-if="showModal"
                :examlist="examlist"
              />
            </div>
          </div>
        </div>
      </div>
    </v-container>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Channel Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label="Channel Title"
                  v-model="channelInfoEdit.title"
                  required
                  color="#EF7F4C"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label="Channel Description"
                  v-model="channelInfoEdit.description"
                  color="#EF7F4C"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu
                  ref="menu1"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="schedule"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="schedule"
                      label="Schdule"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      color="#EF7F4C"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="schedule" color="#EF7F4C" :min="date">
                    <v-spacer></v-spacer>
                    <v-btn text color="#EF7F4C" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="#EF7F4C"
                      @click="$refs.menu1.save(schedule)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="startAt"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="startAt"
                      label="Time Start"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      color="#EF7F4C"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="startAt"
                    full-width
                    format="24hr"
                    color="#EF7F4C"
                    @click:minute="$refs.menu2.save(startAt)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="endAt"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="endAt"
                      label="Time End"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      color="#EF7F4C"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu1"
                    v-model="endAt"
                    full-width
                    format="24hr"
                    color="#EF7F4C"
                    :min="startAt"
                    @click:minute="$refs.menu.save(endAt)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="resetDateFormatt"> Close </v-btn>
          <v-btn color="#EF7F4C" text @click="updateChannelDetail">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      centered
      top
      text
      outlined
      :multi-line="true"
      :timeout="1000"
      :color="snackbarColor"
    >
      {{ snackbarMessage }}
    </v-snackbar>
    <Loading v-model="loading"></Loading>
  </div>
</template>

<script>
import ActionButton from '@/components/Button/ActionButton.vue';
import Header from '@/components/Header/Header.vue';
import EditChannelForm from '@/components/Form/ChannelForm/EditChannelForm.vue';
import CardAddExam from '@/components/Card/CardAddExam.vue';
import CardSelectedExam from '@/components/Card/CardSelectedExam.vue';
import api from '@/services/apis';
import Loading from '@/components/Loading.vue';

export default {
  name: 'InsideChannelTeacher',
  components: {
    ActionButton,
    Header,
    EditChannelForm,
    CardAddExam,
    CardSelectedExam,
    Loading,
  },
  data() {
    return {
      snackbar: false,
      snackbarColor: '',
      snackbarMessage: '',
      switch1: true,
      disabled: false,
      showModal: false,
      showSelected: false,
      showButton: true,
      examlist: [],
      menu: false,
      menu1: false,
      menu2: false,
      dialog: false,
      channelsApiInfo: {},
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      channelInfo: {
        title: '',
        description: '',
        datePicked: '',
        settingData: {
          randomSec: false,
          randomQuestion: false,
          shuffleChoices: false,
          showCAnswer: false,
          showTotalScore: false,
          cantSubmitEmpty: false,
        },
        inviteCode: '',
      },
      channelInfoEdit: {
        title: '',
        description: '',
        startAt: '',
        endAt: '',
        schedule: '',
      },
      schedule: '',
      startAt: '',
      endAt: '',
      loading: false,
    };
  },
  methods: {
    snacbarF(message, color) {
      this.snackbar = true;
      this.snackbarColor = color;
      this.snackbarMessage = message;
    },
    async onEditChannelInfo() {
      this.dialog = true;
    },
    onCopy(e) {
      this.snacbarF(`copied: ${e.text}`,'green')
    },
    onError(e) {
      this.snacbarF(`Failed to copy Invite ID`,'red')
    },
    async onClickAddExam() {
      this.loading = true;
      const Responses = await api.exams().then((res) => res);
      if (Responses.status >= 200 && Responses.status <= 299) {
        this.examlist = Responses.data;
        this.showModal = 1;
        this.loading = false;
      } else if (Responses.status === 404) {
        this.snacbarF('You have no Exam','red')
      }
      this.loading = false;
    },
    clickSelectExam(examData) {
      this.connectChannel(examData);
      this.showModal = false;
      this.showButton = false;
    },
    clickChangeSelect() {
      this.showModal = true;
    },
    clickScoreExam() {
      this.$router
        .push({
          name: 'ScoreExamPage',
          params: {
            cid: this.channelInfo.cid,
            ecid: this.channelInfo.examChannel.ecid,
          },
        })
        .catch(() => true);
    },
    async clickDeleteSelect() {
      this.loading = true;
      const res = await api
        .disconnectExamtoChennal(
          this.channelInfo.cid,
          this.channelInfo.examChannel.ecid,
        )
        .then((res) => res);
      if (res.status === 200) {
        this.showButton = true;
        this.showSelected = false;
        this.loading = false;
      }
    },
    onClickMember() {
      this.$router.push({ name: 'MemberChannel' }).catch(() => true);
    },
    onClickSummary() {
      this.$router.push({ name: 'ExamSummary' }).catch(() => true);
    },
    closeModalAddExam() {
      this.showModal = false;
    },
    resetDateFormatt() {
      this.dialog = false;
      this.channelInfoEdit = { ...this.channelInfo };
      this.schedule = new Date(this.channelInfoEdit.schedule)
        .toISOString()
        .substr(0, 10);
      this.startAt = `${new Date(this.channelInfoEdit.startAt).getHours()}:${
        new Date(this.channelInfoEdit.startAt).getMinutes() >= 10
          ? new Date(this.channelInfoEdit.startAt).getMinutes()
          : `0${new Date(this.channelInfoEdit.startAt).getMinutes()}`
      }`;
      this.endAt = `${new Date(
        this.channelInfoEdit.endAt,
      ).getHours()}:${new Date(this.channelInfoEdit.endAt).getMinutes()}`;
    },
    async apiCall() {
      this.loading = true;
      this.channelsApiInfo = await api
        .channelsDetail(this.$route.params.cid)
        .then((res) => res);
      this.channelInfo = await this.channelsApiInfo[0].data;
      this.resetDateFormatt();
      if (
        this.channelInfo.examChannel !== undefined
        && this.channelInfo.examChannel !== null
      ) {
        this.showButton = false;
        this.showSelected = true;
      } else {
        this.showButton = true;
      }
      const date = new Date(this.channelInfo.startAt);
      if (new Date() > date.setMinutes(date.getMinutes() - 5)) {
        this.disabled = true;
      }
      this.loading = false;
    },
    async connectChannel(detail) {
      const data = {
        cid: this.$route.params.cid,
        title: detail.title,
        description: detail.description,
        eid: detail.eid,
        createDate: detail.createDate,
        updateDate: detail.updateDate,
      };
      this.loading = true;
      const result = await api.connectExamtoChennal(data).then((res) => res);
      if (result.status === 200) {
        const examQuestioneList = await api
          .examList(data.eid)
          .then((res) => api.reverse(res.data))
          .then((data) => api.examMapper(data))
          .then(
            async (data) => await api.createChennalQuestion(
              data,
              this.$route.params.cid,
              result.data.ecid,
            ),
          );
        if (examQuestioneList.status === 201) {
          this.channelInfo.examChannel = result.data;
          this.showSelected = true;
          this.clickScoreExam();
        } else {
          this.clickDeleteSelect();
        }
        this.loading = false;
      }
    },
    convortTime(e) {
      const str = e.split(':');
      return str;
    },
    async updateChannelDetail() {
      this.loading = true;
      this.dialog = false;
      const startT = this.convortTime(this.startAt);
      const endT = this.convortTime(this.endAt);

      const schedule = new Date(this.schedule);
      const start = new Date(this.schedule);
      const end = new Date(this.schedule);

      start.setHours(parseInt(startT[0], 10));
      start.setMinutes(parseInt(startT[1], 10));
      start.setMilliseconds(0);

      end.setHours(parseInt(endT[0], 10));
      end.setMinutes(parseInt(endT[1], 10));
      end.setMilliseconds(0);

      const result = await api.channelUpdate(this.$route.params.cid, {
        title: this.channelInfoEdit.title,
        description: this.channelInfoEdit.description,
        schedule,
        startAt: start,
        endAt: end,
        releaseScoreFlag: this.channelInfo.releaseScoreFlag,
      });

      if (result.status === 200) {
        this.snacbarF(`Success`,'green')
        window.location.reload();
      } else {
        this.dialog = true;
        this.snacbarF(`Error Can't Update Channel Detail`,'red')
      }
      this.loading = false;
    },
  },
  created() {
    this.apiCall();
  },
};
</script>
