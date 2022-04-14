<template>
  <div class="mb-52">
    <v-snackbar v-model="finish" :height="200" :centered="true" :timeout="-1" :vertical="true">
      <p class="text-center p-3">{{ textFinish }}</p>
      <template v-if="status !== 'sending'" v-slot:action="{ attrs }">
        <v-btn color="red" text @click="finish = false"> Close </v-btn>
        <v-btn color="green" text v-bind="attrs" @click="onSubmit"> Continuous </v-btn>
      </template>
    </v-snackbar>
    <div v-if="finish" class="h-full w-full fixed top-0 left-0 z-10 bg-black opacity-40" />

    <Header main="Exam channel" current="> On Exam" class="mb-5"> </Header>

    <div v-if="loading" class="m-auto w-5/6">
      <div class="mb-8 flex justify-between items-center">
        <div class="text-2xl font-bold">
          Section
          <span v-if="section.current !== undefined"
            >{{ section.current }} / {{ section.all }}</span
          >
        </div>
        <Countdown v-bind:endTime="time.endTime" v-bind:submit="onSubmit" />
      </div>

      <v-container class="mb-4">
        <v-row justify="center">
          <v-col cols="">
            <Pagination
              v-bind:page="questionData.length"
              v-bind:choice="choice"
              v-bind:answer="answer"
              v-bind:nextPageFunc="nextPage"
              v-bind:prevPageFunc="prevPage"
              v-bind:changeExam="selectExam"
            />
          </v-col>
        </v-row>
      </v-container>

      <div v-if="loading" class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="12">
              <div class="py-10 px-40 border-2 border-mainColor drop-shadow-lg rounded-xl">
                <div class="mb-5 flex text-lg text-left">
                  <span class="mr-2">{{ choice + 1 }})</span>
                  <span v-html="questionData[choice].questionTopic"></span>
                </div>

                <!-------------------- Matching Type -------------------->
                <div v-if="questionData[choice].qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7'">
                  <div
                    class="ml-3 flex justify-start items-start"
                    v-for="(item, index) in questionData[choice].answer"
                    :key="item.qamcid"
                  >
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <div v-html="item.textQ" class="mt-3"></div>
                        </v-col>
                        <v-col cols="1">
                          <div class="mt-3 font-bold">:</div>
                        </v-col>
                        <v-col>
                          <div class="w-64">
                            <v-select
                              :items="item.textA"
                              :label="answer[choice].answer[index] || 'Select your Answer'"
                              solo
                              v-model="answer[choice].answer[index]"
                              @change="storeData"
                            ></v-select>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                </div>

                <!-------------------- Short-Answer Type -------------------->
                <div
                  v-else-if="questionData[choice].qtid === '5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1'"
                  class="flex justify-start"
                >
                  <input
                    class="ml-3 w-52 p-1 rounded-md focus:ring focus:ring-yellow-300 focus:outline-none"
                    type="text"
                    placeholder="Answer"
                    v-bind:style="{ border: '1px solid rgba(245, 158, 11, 0.6)' }"
                    v-model="answer[choice].answer"
                    @input="storeData"
                  />
                </div>

                <!-------------------- Paragraph Type -------------------->
                <div
                  v-else-if="questionData[choice].qtid === '5edad656-83b9-4de0-ab94-f7d40cea3354'"
                >
                  <textarea
                    class="ml-3 w-full h-52 p-1 rounded-md resize-none focus:ring focus:ring-yellow-300 focus:outline-none"
                    type="text"
                    placeholder="Answer"
                    v-bind:style="{ border: '1px solid rgba(245, 158, 11, 0.6)' }"
                    v-model="answer[choice].answer"
                    @input="storeData"
                  />
                </div>

                <!-------------------- Codeing Type -------------------->
                <div
                  v-else-if="questionData[choice].qtid === '7190c532-3ccc-4ed7-ae77-6ffd967bf87c'"
                  class="text-left"
                >
                  <v-container>
                    <v-row>
                      <v-col>
                        <div class="bg-gray-100 rounded-md shadow-md">
                          <div class="p-2 text-sm bg-mainColor text-white rounded-t-md">
                            Example Input :
                          </div>
                          <div
                            v-html="questionData[choice].answer[0].exInput"
                            class="px-3 py-4"
                          ></div>
                        </div>
                      </v-col>
                      <v-col>
                        <div class="bg-gray-100 rounded-md shadow-md">
                          <div class="p-2 text-sm bg-mainColor text-white rounded-t-md">
                            Example Output :
                          </div>
                          <div
                            v-html="questionData[choice].answer[0].exOutput"
                            class="px-3 py-4"
                          ></div>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <div class="rounded-t-md" v-bind:style="{ backgroundColor: '#1f2430' }">
                          <p class="px-4 py-2 bg-mainColor rounded-t-md text-white">
                            Language :
                            {{ mappingCodeLanguage(questionData[choice].answer[0].clid) }}
                          </p>
                          <codemirror
                            v-model="answer[choice].answer"
                            :options="cmOptions"
                            @input="storeData"
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>

                <!-------------------- Multiple-Choice Type -------------------->
                <div
                  v-else-if="questionData[choice].qtid === '74fbc3a5-0217-4892-9aba-70b612fc1a0e'"
                >
                  <div
                    class="ml-5"
                    v-for="(item, itemIdex) in questionData[choice].answer"
                    :key="item.qamccid"
                  >
                    <v-checkbox
                      class=""
                      color="#FB8C00"
                      v-model="answer[choice].answer[itemIdex]"
                      hide-details
                      :label="`${item.textA.replace(/(<([^>]+)>)/gi, '')}`"
                      :value="item.qamccid"
                      @change="storeData"
                    ></v-checkbox>
                  </div>
                </div>

                <!-------------------- True/False Type -------------------->
                <div
                  v-else-if="questionData[choice].qtid === 'b3037171-640a-4077-bf17-10b23a52c386'"
                >
                  <v-radio-group class="ml-3" v-model="answer[choice].answer">
                    <v-radio
                      color="#FB8C00"
                      v-for="item in [
                        { name: 'True', value: true },
                        { name: 'False', value: false },
                      ]"
                      :key="item.name"
                      :label="`${item.name}`"
                      :value="item.value"
                      @change="storeData"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-------------------- Submit Button -------------------->
          <v-row justify="center">
            <v-col cols="">
              <div class="flex justify-end">
                <button
                  class="py-3 px-10 text-white rounded-lg bg-green-500 hover:bg-green-600"
                  @click="checkAnswerExam"
                >
                  Submit
                </button>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>

    <div v-else>
      <p class="text-center">กำลังโหลดคำถาม กรุณารอสักครู่</p>
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import api from '@/services/apis';

import QuillTextEditor from '@/components/TextEditor/QuillTextEditor.vue';
import Header from '@/components/Header/Header.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import Countdown from '@/components/Countdown/Countdown.vue';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/go/go';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/clike/clike';

export default {
  name: 'ExamChannelOnExam',
  components: {
    Header,
    Pagination,
    QuillTextEditor,
    Countdown,
    codemirror,
  },
  data: () => ({
    loading: false,
    questionData: [],
    time: {},
    section: {},
    finish: false,
    status: '',
    textFinish: '',
    choice: 0,
    chanel: [],
    answer: [],
    language: [
      { name: 'Javascript', mode: 'text/javascript', id: 63 },
      { name: 'Python', mode: 'python', id: 71 },
      { name: 'C', mode: 'text/x-csrc', id: 50 },
      { name: 'C#', mode: 'text/x-csharp', id: 51 },
      { name: 'C++', mode: 'text/x-c++src', id: 54 },
      { name: 'Java', mode: 'text/x-java', id: 62 },
      { name: 'Kotlin', mode: 'text/x-kotlin', id: 78 },
      { name: 'Ruby', mode: 'ruby', id: 72 },
      { name: 'Golang', mode: 'go', id: 60 },
    ],
    cmOptions: {
      tabSize: 2,
      mode: 'text/javascript',
      theme: 'ayu-mirage',
      lineNumbers: true,
      line: true,
    },
  }),
  methods: {
    nextPage() {
      if (this.choice < this.questionData.length - 1) {
        this.choice += 1;
        this.autoFillAnswer();
      }
    },
    prevPage() {
      if (this.choice > 0) {
        this.choice -= 1;
        this.autoFillAnswer();
      }
    },
    selectExam(number) {
      this.choice = number - 1;
      this.autoFillAnswer();
    },
    selectAnswer(item, id) {
      const arrayIndex = this.answer.findIndex((obj) => obj.qecid === id);
      this.answer[arrayIndex].answer = item;
    },
    selectAnswerGroup(item, id, max, position) {
      const arrayIndex = this.answer.findIndex((obj) => obj.qecid === id);
      const arrayResult = new Array(max).fill('');
      arrayResult[position] = item;

      if (Array.isArray(this.answer[arrayIndex].answer)) this.answer[arrayIndex].answer[position] = item;
      else this.answer[arrayIndex].answer = arrayResult;
    },
    autoFillAnswer() {
      if (this.answer[this.choice].answer === undefined) {
        if (
          this.questionData[this.choice].qtid === '74fbc3a5-0217-4892-9aba-70b612fc1a0e'
          || this.questionData[this.choice].qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7'
        ) this.selectAnswer([null], this.questionData[this.choice].qecid);
        else this.selectAnswer('', this.questionData[this.choice].qecid);
      }
    },
    mappingCodeLanguage(numberCode) {
      const codeIndex = this.language.findIndex((item) => item.id === numberCode);
      this.cmOptions.mode = this.language[codeIndex].mode;
      return this.language[codeIndex].name;
    },
    storeData() {
      localStorage.setItem('justExam', JSON.stringify(this.answer));
    },
    checkAnswerExam() {
      this.status = 'Checking';
      const notFinish = [];

      this.answer.forEach((item, index) => {
        if (item.answer === undefined) notFinish.push(index);
        else if (item.answer === '') notFinish.push(index);
        else if (Array.isArray(item.answer)) {
          if (item.answer.length === 0) notFinish.push(index);
          else if (item.answer.length === 1 && item.answer[0] === null) notFinish.push(index);
        }
      });

      this.finish = true;

      if (notFinish.length > 0) {
        this.textFinish = `คุณยังไม่ได้ทำข้อสอบข้อที่ ${notFinish
          .map((value) => value + 1)
          .join(', ')}`;
      } else this.onSubmit();
    },
    onSubmit() {
      this.finish = true;
      this.textFinish = 'กำลังส่งคำตอบ';
      this.status = 'sending';

      const submitAnswer = this.answer;

      // Fill answer for submit when this question no answer
      submitAnswer.forEach((item, index) => {
        if (item.answer === undefined) {
          if (this.questionData[index].qtid === '74fbc3a5-0217-4892-9aba-70b612fc1a0e') submitAnswer[index].answer = [null];
          else if (this.questionData[index].qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7') {
            submitAnswer[index].answer = this.questionData[index].answer.map((value) => ({
              qamcid: value.qamcid,
              value: null,
            }));
          } else submitAnswer[index].answer = '';
        } else if (
          item.answer !== undefined
          && this.questionData[index].qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7'
        ) {
          submitAnswer[index].answer = this.answer[index].answer.map((value, indexs) => ({
            qamcid: this.questionData[index].answer[indexs].qamcid,
            value,
          }));
        }
      });

      api.postExamAnswer(submitAnswer, this.$route.params.cid).then((res) => {
        if (res.status >= 202 && res.status <= 300) {
          this.finish = false;
          localStorage.removeItem('justExam');
          this.$router.push({ name: 'ExamChannelStudent' }).catch(() => {});
        } else if (res.status === 200) {
          localStorage.removeItem('justExam');
          this.textFinish = 'ส่งคำตอบสำเร็จ กำลังโหลดข้อสอบชุดต่อไป';
          this.loading = false;

          setTimeout(() => {
            this.callApi().then((res) => {
              this.finish = false;
              if (res === 'next') {
                this.loading = true;
              }
            });
          }, 1000);
        } else {
          this.textFinish = 'ส่งคำตอบไม่สำเร็จ ลองใหม่อีกครั้ง';
          this.status = '';
        }
      });
    },
    async callApi() {
      const result = await api.getExamChannel(this.$route.params.cid);
      const data = await result.data;

      this.answer = [];
      this.questionData = [];
      this.choice = 0;

      this.questionData = data.questions;

      if (this.questionData.length === 0) {
        this.$router.push({ name: 'ExamChannelLobby', params: { cid: this.$route.params.cid } });
      }

      this.questionData.forEach((item, index) => {
        if (item.qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7') {
          const answer = item.answer.map((value) => value.textA.replace(/(<([^>]+)>)/gi, ''));
          this.questionData[index].answer.forEach((element, aIndex) => {
            this.questionData[index].answer[aIndex].textA = answer;
          });
        }
      });

      if (JSON.parse(localStorage.getItem('justExam'))) {
        this.answer = JSON.parse(localStorage.getItem('justExam'));
      } else if (this.answer.length === 0) {
        this.questionData.forEach((item) => {
          this.answer.push({
            ecid: item.ecid,
            qecid: item.qecid,
          });
        });
      }

      this.autoFillAnswer();
      this.loading = true;

      this.time = { endTime: data.channel.endAt };
      this.section = {
        current: data.Section.current,
        all: data.Section.number,
      };

      return 'next';
    },
  },
  created() {
    this.callApi();
  },
  mounted() {},
  watch: {},
};
</script>
