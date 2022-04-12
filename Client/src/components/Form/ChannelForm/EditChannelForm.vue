<template>
  <form>
    <div class="flex justify-center gap-40">
      <div class="flex flex-col gap-5">
        <h1 class="text-gray-700 font-semibold text-2xl">Channel Information</h1>
        <div>
          <label class="form-label inline-block text-gray-700 font-semilight text-xl">
            Channel Title
          </label>
        </div>
        <div class="form-control flex flex-row">
          <input
            type="text"
            v-model="value.title"
            ref="channel_title"
            placeholder="Channel Title"
            :disabled="!isEditing"
            class="w-11/12 px-3 py-3 text-lg font-semilight text-text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:bg-subColor focus:mainColor focus:border-opacity-100 focus:outline-none"
            :class="{ view: !isEditing }"
          />
        </div>
        <div>
          <label class="form-label inline-block text-gray-700 font-semilight text-xl">
            Channel Description
          </label>
        </div>
        <div class="form-control flex flex-row">
          <input
            type="text"
            v-model="value.description"
            ref="channel_description"
            placeholder="Channel Description"
            :disabled="!isEditing"
            class="w-11/12 px-3 py-3 text-lg font-semilight text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:bg-subColor focus:mainColor focus:border-opacity-100 focus:outline-none"
            :class="{ view: !isEditing }"
          />
        </div>
        <div class="form-control">
          <div>
            <label class="form-label inline-block mb-2 text-gray-700 font-semilight text-xl">
              Schedule
            </label>
            <label
              class="form-label inline-block mb-2 ml-2 text-gray-700 text-opacity-50 font-semilight text-sm"
            >
              (DD/MM/YYYY)
            </label>
          </div>
          <div class="flex flex-row">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <input
                  v-if="isEditing"
                  class="w-5/6 px-3 pt-3 pb-3 border border-solid border-mainColor border-opacity-40 text-base font-semilight text-grayColor bg-subColor rounded-md"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  v-model="value.schedule"
                  ref="channel_schedule"
                  :disabled="!isEditing"
                  :class="{ view: !isEditing }"
                />
                <div v-if="!isEditing" class="flex flex-row">
                  <div
                    class="w-5/6 px-3 pt-3 pb-3 border border-solid border-mainColor border-opacity-40 text-base font-semilight text-grayColor bg-subColor rounded-md"
                    readonly
                    :class="{ view: true }"
                  >
                    {{ value.schedule | moment('D / MM / YYYY') }}
                  </div>
                </div>
              </template>

              <v-date-picker
                v-model="value.schedule"
                @input="menu = false"
                color="orange darken-4"
              ></v-date-picker>
            </v-menu>
          </div>
        </div>
        <div class="form-control">
          <div>
            <label class="inline-block text-gray-700 font-semilight text-xl mb-3">
              Time Duration
            </label>
            <label
              class="form-label inline-block mb-2 ml-2 text-gray-700 text-opacity-50 font-semilight text-sm"
            >
              (24 hours format)
            </label>
          </div>
          <div class="flex flex-nowrap">
            <div class="mr-2">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="value.startAt"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <label class="inline-block text-gray-500 font-semilight text-sm mb-1 mr-1">
                    Time Start:
                  </label>
                  <input
                    v-if="isEditing"
                    class="w-5/6 px-3 pt-3 pb-3 border border-solid border-mainColor border-opacity-40 text-base font-semilight text-grayColor bg-subColor rounded-md"
                    v-model="value.startAt"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    placeholder="Time start"
                    ref="time_start"
                    :disabled="!isEditing"
                    :class="{ view: !isEditing }"
                  />
                  <div v-if="!isEditing" class="flex flex-row">
                    <div
                      class="w-5/6 px-3 pt-3 pb-3 border border-solid border-mainColor border-opacity-40 text-base font-semilight text-grayColor bg-subColor rounded-md"
                      readonly
                      :class="{ view: true }"
                    >
                      {{ value.startAt | moment('H:mm:ss') }}
                    </div>
                  </div>
                </template>
                <v-time-picker
                  v-if="menu1"
                  v-model="value.startAt"
                  full-width
                  @click:minute="$refs.menu1.save(value.startAt)"
                  format="24hr"
                  :max="timeEnd"
                ></v-time-picker>
              </v-menu>
            </div>
            <div>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="value.endAt"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <label class="inline-block text-gray-500 font-semilight text-sm mb-1 mr-1">
                    Time End:
                  </label>
                  <input
                    v-if="isEditing === true"
                    class="w-5/6 px-3 pt-3 pb-3 border border-solid border-mainColor border-opacity-40 text-base font-semilight text-grayColor bg-subColor rounded-md"
                    v-model="value.endAt"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    placeholder="Time end"
                    ref="time_end"
                    :disabled="!isEditing"
                    :class="{ view: !isEditing }"
                  />
                  <div v-if="isEditing === false" class="flex flex-row">
                    <div
                      class="w-5/6 px-3 pt-3 pb-3 border border-solid border-mainColor border-opacity-40 text-base font-semilight text-grayColor bg-subColor rounded-md"
                      readonly
                      :class="{ view: true }"
                    >
                      {{ value.endAt | moment('H:mm:ss') }}
                    </div>
                  </div>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="value.endAt"
                  full-width
                  @click:minute="$refs.menu2.save(value.endAt)"
                  format="24hr"
                  :min="timeStart"
                ></v-time-picker>
              </v-menu>
            </div>
          </div>
        </div>
      </div>
      <div class="form-control">
        <div class="flex flex-col justify-center gap-5">
          <h1 class="text-gray-700 font-semibold text-2xl mb-5">Exam setting</h1>
          <div>
            <Checkbox3 textRight="Random sections" v-model="settingData.randomSec" />
          </div>
          <div>
            <Checkbox3
              textRight="Random questions in section"
              v-model="settingData.randomQuestion"
            />
          </div>
          <div>
            <Checkbox3 textRight="Shuffle choices" v-model="settingData.shuffleChoices" />
          </div>
          <div>
            <Checkbox3
              textRight="Show correct answers after submit the exam"
              v-model="settingData.showCAnswer"
            />
          </div>
          <div>
            <Checkbox3
              textRight="Show total scores after submit the exam"
              v-model="settingData.showTotalScore"
            />
          </div>
          <div>
            <Checkbox3
              textRight="Cannot submit the exam if there are missed answers"
              v-model="settingData.cantSubmitEmpty"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import Checkbox3 from '@/components/Form/Checkbox3.vue';

export default {
  name: 'EditChannelForm',
  components: {
    Checkbox3,
  },
  props: ['value'],
  data() {
    return {
      menu: false,
      menu1: false,
      menu2: false,
      isEditing: false,
      title: this.value.title,
      description: this.value.description,
      timeStart: this.value.timeStart,
      timeEnd: this.value.timeStart,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      datePicked: this.value.date,
      settingData: {
        randomSec: true,
        randomQuestion: true,
        shuffleChoices: true,
        showCAnswer: false,
        showTotalScore: false,
        cantSubmitEmpty: false,
      },
    };
  },
  methods: {
    saveTitle() {
      this.title = this.$refs.channel_title.value;
      this.isEditing = !this.isEditing;
    },
    saveDescription() {
      this.description = this.$refs.channel_description.value;
      this.isEditing = !this.isEditing;
    },
    saveSchedule() {
      this.date = this.$refs.channel_schedule.value;
      this.isEditing = !this.isEditing;
    },
    saveTime() {
      this.timeStart = this.$refs.time_start.value;
      this.timeEnd = this.$refs.time_end.value;
      this.isEditing = !this.isEditing;
    },
  },
};
</script>

<style>
.view {
  border-color: transparent;
  background-color: initial;
  color: #ef7f4c;
}
</style>
