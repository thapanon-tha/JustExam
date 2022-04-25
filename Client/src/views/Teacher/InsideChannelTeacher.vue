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
      <div class="w-4/6 ml-48">
        <EditChannelForm v-model="channelInfo" />
      </div>
    </v-container>
    <v-container class="flex justify-center">
      <div class="mt-10">
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

      <ActionButton
        class="ml-48 mt-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor"
        name="+ Add your exam"
        @on-click="onClickAddExam"
        v-if="showButton"
      />
      <CardSelectedExam
        class="ml-48 mt-10"
        @clickChange="onClickAddExam"
        @clickScore="clickScoreExam"
        @clickDelete="clickDeleteSelect"
        :detail="channelInfo.examChannel"
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
    </v-container>

    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edir Channel Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label="Channel Title"
                  v-model="channelInfo.title"
                  required
                  color="#EF7F4C"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label="Channel Description"
                  v-model="channelInfo.description"
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
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="#EF7F4C" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ActionButton from '@/components/Button/ActionButton.vue';
import Header from '@/components/Header/Header.vue';
import EditChannelForm from '@/components/Form/ChannelForm/EditChannelForm.vue';
import CardAddExam from '@/components/Card/CardAddExam.vue';
import CardSelectedExam from '@/components/Card/CardSelectedExam.vue';
import api from '@/services/apis';

export default {
  name: 'InsideChannelTeacher',
  components: {
    ActionButton,
    Header,
    EditChannelForm,
    CardAddExam,
    CardSelectedExam,
  },
  data() {
    return {
      snackbar: false,
      showModal: false,
      showSelected: false,
      showButton: true,
      examlist: [],
      text: '',
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
    };
  },
  methods: {
    async onEditChannelInfo() {
      this.dialog = true;
    },
    onCopy(e) {
      this.snackbar = true;
      this.text = `copied: ${e.text}`;
    },
    onError(e) {
      this.snackbar = true;
      this.text = 'Failed to copy Invite ID';
    },
    async onClickAddExam() {
      const Responses = await api.exams().then((res) => res);
      if (Responses.status >= 200 && Responses.status <= 299) {
        this.examlist = Responses.data;
        this.showModal = 1;
      }
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
      const res = await api
        .disconnectExamtoChennal(
          this.channelInfo.cid,
          this.channelInfo.examChannel.ecid,
        )
        .then((res) => res);
      if (res.status === 200) {
        window.location.reload();
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
    async apiCall() {
      this.channelsApiInfo = await api
        .channelsDetail(this.$route.params.cid)
        .then((res) => res);
      this.channelInfo = await this.channelsApiInfo[0].data;
      this.channelInfoEdit = this.channelInfo;
      this.schedule = new Date(this.channelInfoEdit.schedule)
        .toISOString()
        .substr(0, 10);
      this.startAt = `${new Date(this.channelInfoEdit.startAt).getHours()}:${
        new Date(this.channelInfoEdit.startAt).getMinutes() > 10
          ? new Date(this.channelInfoEdit.startAt).getMinutes()
          : `0${new Date(this.channelInfoEdit.startAt).getMinutes()}`
      }`;
      this.endAt = `${new Date(
        this.channelInfoEdit.endAt,
      ).getHours()}:${new Date(this.channelInfoEdit.endAt).getMinutes()}`;
      if (
        this.channelInfo.examChannel !== undefined
        && this.channelInfo.examChannel !== null
      ) {
        this.showButton = false;
        this.showSelected = true;
      } else {
        this.showButton = true;
      }
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
        } else {
          this.clickDeleteSelect();
        }
      }
    },
  },
  created() {
    this.apiCall();
  },
};
</script>
