<template>
  <div class="mb-60">
    <Header main="Exam channel" current=" > New channel" class="mb-10" />
    <v-container>
      <div class="flex justify-center">
        <form class="ml-20">
          <div class="flex justify-center">
            <div class="flex-col gap-5">
              <h1 class="text-gray-700 font-semibold text-2xl pb-5">
                Channel Information
              </h1>
              <div class="form-control">
                <InputForm
                  inputLabel="Channel Title"
                  type="text"
                  v-model="channelInfo.title"
                />
              </div>
              <div class="form-control">
                <InputForm
                  inputLabel="Channel Description"
                  type="text"
                  v-model="channelInfo.description"
                />
              </div>
              <div class="form-control">
                <DatePicker v-model="channelInfo.datePicked" />
              </div>
              <div class="form-control">
                <div>
                  <label
                    class="inline-block text-gray-700 font-semilight text-xl mb-3 mt-3"
                  >
                    Time Duration
                  </label>
                  <label
                    class="form-label inline-block mb-2 ml-2 text-gray-700 text-opacity-50 font-semilight text-sm"
                  >
                    (24 hours format)
                  </label>
                  <v-row>
                    <v-col cols="11" sm="5">
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="timeStart"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <label
                            class="inline-block text-gray-500 font-semilight text-sm mb-1"
                          >
                            Time Start
                          </label>
                          <input
                            class="w-5/6 px-3 pt-3 pb-3 border border-solid border-mainColor border-opacity-40 text-base font-semilight text-grayColor bg-subColor rounded-md"
                            v-model="timeStart"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            placeholder="Time Start"
                          />
                        </template>
                        <v-time-picker
                          v-if="menu1"
                          v-model="timeStart"
                          full-width
                          @click:minute="$refs.menu1.save(timeStart)"
                          format="24hr"
                          :max="timeEnd"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="11" sm="5">
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="timeEnd"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <label
                            class="inline-block text-gray-500 font-semilight text-sm mb-1"
                          >
                            Time End
                          </label>
                          <input
                            class="w-5/6 px-3 pt-3 pb-3 border border-solid border-mainColor border-opacity-40 text-base font-semilight text-grayColor bg-subColor rounded-md"
                            v-model="timeEnd"
                            label="Time Start At"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            placeholder="Time End"
                          />
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="timeEnd"
                          full-width
                          @click:minute="$refs.menu2.save(timeEnd)"
                          format="24hr"
                          :min="timeStart"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </v-container>
    <v-container>
      <div class="flex justify-center pt-10">
        <ActionButton
          class="bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-grayColor"
          name="Cancel"
          @on-click="onClickCancel"
        />
        <ActionButton
          class="ml-10 bg-white border-orange-200 border border-solid rounded-lg px-6 py-4 font-semilight text-mainColor"
          name="Create"
          @on-click="submitForm"
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
  </div>
</template>

<script>
import ActionButton from '@/components/Button/ActionButton.vue';
import Header from '@/components/Header/Header.vue';
// import ChannelForm from '@/components/Form/ChannelForm/ChannelForm.vue';
import CardAddExam from '@/components/Card/CardAddExam.vue';
import CardSelectedExam from '@/components/Card/CardSelectedExam.vue';
import InputForm from '@/components/Form/InputForm.vue';
import Checkbox3 from '@/components/Form/Checkbox3.vue';
import DatePicker from '@/components/Form/DatePicker.vue';
import TimePicker from '@/components/Form/TimePicker.vue';
import api from '@/services/apis';

export default {
  name: 'NewChannelTeacher',
  components: {
    ActionButton,
    Header,
    // ChannelForm,
    CardAddExam,
    CardSelectedExam,
    InputForm,
    Checkbox3,
    DatePicker,
    TimePicker,
  },
  data() {
    return {
      snackbar: false,
      showModal: false,
      showSelected: false,
      showButton: true,
      timeStart: null,
      timeEnd: null,
      menu1: false,
      menu2: false,
      text: '',
      channelInfo: {
        title: '',
        description: '',
        datePicked: new Date(),
        settingData: {
          randomSec: true,
          randomQuestion: true,
          shuffleChoices: true,
          showCAnswer: false,
          showTotalScore: false,
          cantSubmitEmpty: false,
        },
      },
    };
  },
  methods: {
    onClickAddExam() {
      this.showModal = true;
    },
    updatetimes(v) {
      this.channelInfo.timeStart = v;
    },
    updatetimee(v) {
      this.channelInfo.timeEnd = v;
    },
    clickSelectExam() {
      this.showModal = false;
      this.showSelected = true;
      this.showButton = false;
    },
    clickChangeSelect() {
      this.showModal = true;
    },
    clickScoreExam() {
      this.$router.push({ name: 'ScoreExamPage' }).catch(() => true);
    },
    clickDeleteSelect() {
      this.showButton = true;
      this.showSelected = false;
    },
    convortTime(e) {
      const str = e.split(':');
      return str;
    },
    async submitForm() {
      if (
        this.channelInfo.title === ''
        || this.channelInfo.description === ''
        || this.timeStart === null
        || this.timeEnd === null
      ) {
        this.snackbar = true;
        this.text = `invalid input`;
      } else {
        const startT = this.convortTime(this.timeStart);
        const endT = this.convortTime(this.timeEnd);
        const date = new Date(this.channelInfo.datePicked);
        const start = new Date(this.channelInfo.datePicked);
        const end = new Date(this.channelInfo.datePicked);
        start.setHours(parseInt(startT[0], 10));
        start.setMinutes(parseInt(startT[1], 10));
        start.setMilliseconds(0);
        end.setHours(parseInt(endT[0], 10));
        end.setMinutes(parseInt(endT[1], 10));
        end.setMilliseconds(0);
        const result = await api.createChannel({
          title: this.channelInfo.title,
          description: this.channelInfo.description,
          schedule: date,
          startAt: start,
          endAt: end,
        });
        if (result.status >= 200 && result.status < 300) {
          this.$router
            .push({ name: 'InsideChannelTeacher', params: { cid: result.data.cid } })
            .catch(() => true);
        } else {
          this.snackbar = true;
          this.text = `Create Channel Fail`;
        }
      }
    },
    onClickCancel() {
      this.$router.push({ name: 'ExamChannelTeacher' }).catch(() => true);
    },
    closeModalAddExam() {
      this.showModal = false;
    },
  },
};
</script>
