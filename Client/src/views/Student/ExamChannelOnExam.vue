<template>
  <div class="mb-60">
    <v-snackbar
      v-model="finish"
      :height="200"
      :centered="true"
      :timeout="-1"
      :vertical="true"
    >
      <p class="text-center p-3">{{ textFinish }}</p>
      <template v-if="status !== 'sending'" v-slot:action="{ attrs }">
        <v-btn color="red" text @click="finish = false"> Close </v-btn>
        <v-btn color="green" text v-bind="attrs" @click="onSubmit">
          Continuous
        </v-btn>
      </template>
    </v-snackbar>
    <div
      v-if="finish"
      class="h-full w-full fixed top-0 left-0 z-10 bg-black opacity-40"
    />

    <Header main="Exam channel" current="> On Exam" class="mb-5"> </Header>
    <Countdown
      class="mb-10"
      v-bind:endTime="'2022-12-12T11:16:43.000Z'"
      v-bind:submit="onSubmit"
    />

    <v-container class="mb-4">
      <v-row justify="center">
        <v-col cols="8">
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

    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <div class="py-10 px-40 border border-yellow-500 rounded-xl">
              <div class="mb-5 text-lg text-left">
                <span class="mr-2">{{ choice + 1 }})</span>
                <span>{{ questionData[choice].questionTopic }}</span>
              </div>

              <!-------------------- Matching Type -------------------->
              <div
                v-if="
                  questionData[choice].qtid ===
                  'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7'
                "
              >
                <div
                  class="ml-3 flex justify-start items-start"
                  v-for="(item, index) in questionData[choice].answer"
                  :key="item.qamcid"
                >
                  <span class="mr-5 mt-3">{{ item.textQ }} :</span>
                  <div class="w-64">
                    <v-select
                      :items="item.textA"
                      label="Select Your Answer"
                      solo
                      v-model="answer[choice].answer[index]"
                      @change="storeData"
                    ></v-select>
                  </div>
                </div>
              </div>

              <!-------------------- Short-Answer Type -------------------->
              <div
                v-else-if="
                  questionData[choice].qtid ===
                  '5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1'
                "
                class="flex justify-start"
              >
                <input
                  class="
                    ml-3
                    w-52
                    p-1
                    rounded-md
                    focus:ring focus:ring-yellow-300 focus:outline-none
                  "
                  type="text"
                  placeholder="Answer"
                  v-bind:style="{ border: '1px solid rgba(245, 158, 11, 0.6)' }"
                  v-model="answer[choice].answer"
                  @input="storeData"
                />
              </div>

              <!-------------------- Paragraph Type -------------------->
              <div
                v-else-if="
                  questionData[choice].qtid ===
                  '5edad656-83b9-4de0-ab94-f7d40cea3354'
                "
              >
                <textarea
                  class="
                    ml-3
                    w-full
                    h-52
                    p-1
                    rounded-md
                    resize-none
                    focus:ring focus:ring-yellow-300 focus:outline-none
                  "
                  type="text"
                  placeholder="Answer"
                  v-bind:style="{ border: '1px solid rgba(245, 158, 11, 0.6)' }"
                  v-model="answer[choice].answer"
                  @input="storeData"
                />
              </div>

              <!-------------------- Codeing Type -------------------->
              <div
                v-else-if="
                  questionData[choice].qtid ===
                  '7190c532-3ccc-4ed7-ae77-6ffd967bf87c'
                "
                class="text-left"
              >
                <v-container>
                  <v-row>
                    <v-col>
                      <div class="bg-gray-100 rounded-md shadow-md">
                        <div
                          class="
                            p-2
                            text-sm
                            bg-mainColor
                            text-white
                            rounded-t-md
                          "
                        >
                          Example Input :
                        </div>
                        <div class="px-3 py-4">
                          {{ questionData[choice].answer[0].exInput }}
                        </div>
                      </div>
                    </v-col>
                    <v-col>
                      <div class="bg-gray-100 rounded-md shadow-md">
                        <div
                          class="
                            p-2
                            text-sm
                            bg-mainColor
                            text-white
                            rounded-t-md
                          "
                        >
                          Example Output :
                        </div>
                        <div class="px-3 py-4">
                          {{ questionData[choice].answer[0].exOutput }}
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div
                        class="rounded-t-md"
                        v-bind:style="{ backgroundColor: '#1f2430' }"
                      >
                        <p
                          class="px-4 py-2 bg-mainColor rounded-t-md text-white"
                        >
                          Language :
                          {{
                            mappingCodeLanguage(
                              questionData[choice].answer[0].clid
                            )
                          }}
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
                v-else-if="
                  questionData[choice].qtid ===
                  '74fbc3a5-0217-4892-9aba-70b612fc1a0e'
                "
              >
                <div
                  class="ml-3"
                  v-for="(item, itemIdex) in questionData[choice].answer"
                  :key="item.qamccid"
                >
                  <v-checkbox
                    class="border"
                    color="#FB8C00"
                    v-model="answer[choice].answer[itemIdex]"
                    :label="`${item.textA}`"
                    :value="item.qamccid"
                    @change="storeData"
                  ></v-checkbox>
                </div>
              </div>

              <!-------------------- True/False Type -------------------->
              <div
                v-else-if="
                  questionData[choice].qtid ===
                  'b3037171-640a-4077-bf17-10b23a52c386'
                "
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
          <v-col cols="8">
            <div class="flex justify-end">
              <button
                class="
                  py-3
                  px-10
                  text-white
                  rounded-lg
                  bg-green-500
                  hover:bg-green-600
                "
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
</template>

<script>
import katex from "katex";
import api from "@/services/apis";

import QuillTextEditor from "@/components/TextEditor/QuillTextEditor.vue";
import Header from "@/components/Header/Header.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import Countdown from "@/components/Countdown/Countdown.vue";

import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/go/go";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/clike/clike";

export default {
  name: "ExamChannelOnExam",
  components: {
    Header,
    Pagination,
    QuillTextEditor,
    Countdown,
    codemirror,
  },
  data: () => ({
    questionData: [
      {
        qecid: "4fcd48bd-200c-402b-93fa-f1ce7fdd4036",
        questionTopic: "Matching",
        sectionName: "2",
        point: 0,
        createdAt: "2022-04-09T13:31:34.000Z",
        updatedAt: "2022-04-09T13:31:34.000Z",
        qtid: "d284c3d2-e1d2-4b8b-94c6-58248fdf27e7",
        ecid: "32161d9f-a10b-49ed-a9b5-cbfbcd4f1da6",
        answer: [
          {
            qamcid: "95eef063-620e-461e-976c-a333cd86ab05",
            textA: "2",
            textQ: "B",
          },
          {
            qamcid: "44a4ef28-8594-4ed4-a2bc-ca11daaf025e",
            textA: "1",
            textQ: "A",
          },
        ],
      },
      {
        qecid: "51526f07-928c-4824-9dfb-e7aa085600a4",
        questionTopic: "Short Answer",
        sectionName: "2",
        point: 0,
        createdAt: "2022-04-09T13:31:34.000Z",
        updatedAt: "2022-04-09T13:31:34.000Z",
        qtid: "5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1",
        ecid: "32161d9f-a10b-49ed-a9b5-cbfbcd4f1da6",
      },
      {
        qecid: "9de2a849-524e-40f4-b0a8-cfc2651ac070",
        questionTopic: "Coding",
        sectionName: "2",
        point: 0,
        createdAt: "2022-04-09T13:31:34.000Z",
        updatedAt: "2022-04-09T13:31:34.000Z",
        qtid: "7190c532-3ccc-4ed7-ae77-6ffd967bf87c",
        ecid: "32161d9f-a10b-49ed-a9b5-cbfbcd4f1da6",
        answer: [
          {
            qaccid: "710aeb02-3c31-4d61-b8be-a71d851c2196",
            code: "example Code",
            exInput: "Example input",
            exOutput: "Example Output",
            clid: 63,
          },
        ],
      },
      {
        qecid: "0c243218-85c6-4ce7-9ca6-aef4b588452f",
        questionTopic: "Multiple Choice",
        sectionName: "1",
        point: 0,
        createdAt: "2022-04-09T08:48:44.000Z",
        updatedAt: "2022-04-09T08:48:44.000Z",
        qtid: "74fbc3a5-0217-4892-9aba-70b612fc1a0e",
        ecid: "70abd6ef-088b-4c77-a02e-54668cb5e3d5",
        answer: [
          {
            qamccid: "08fe4854-a1b5-461b-8184-e9834781c634",
            textA: "example Answer4",
          },
          {
            qamccid: "2ffcfa85-4a3d-4f8f-b822-ffce2b621e01",
            textA: "example Answer3",
          },
          {
            qamccid: "880e4fce-f04c-490b-b1ca-a49f3e2aca58",
            textA: "example Answer1",
          },
          {
            qamccid: "c291257a-d86b-4c1f-96b1-59e4a3e006d7",
            textA: "example Answer",
          },
          {
            qamccid: "e6c63f76-84ea-4f78-acef-3343dd29a3f3",
            textA: "example Answer2",
          },
        ],
      },
      {
        qecid: "273bec3d-136f-4d15-a9c2-8b71c3a72661",
        questionTopic: "Paragraph",
        sectionName: "1",
        point: 0,
        createdAt: "2022-04-09T08:48:44.000Z",
        updatedAt: "2022-04-09T08:48:44.000Z",
        qtid: "5edad656-83b9-4de0-ab94-f7d40cea3354",
        ecid: "70abd6ef-088b-4c77-a02e-54668cb5e3d5",
      },
      {
        qecid: "4acc3a3b-dff4-4473-bfe7-bae8f2c1eaf2",
        questionTopic: "T/F",
        sectionName: "3",
        point: 0,
        createdAt: "2022-04-09T13:31:34.000Z",
        updatedAt: "2022-04-09T13:31:34.000Z",
        qtid: "b3037171-640a-4077-bf17-10b23a52c386",
        ecid: "32161d9f-a10b-49ed-a9b5-cbfbcd4f1da6",
      },
    ],
    finish: false,
    status: "",
    textFinish: "",
    choice: 0,
    chanel: [],
    answer: [],
    language: [
      { name: "Javascript", mode: "text/javascript", id: 63 },
      { name: "Python", mode: "python", id: 71 },
      { name: "C", mode: "text/x-csrc", id: 50 },
      { name: "C#", mode: "text/x-csharp", id: 51 },
      { name: "C++", mode: "text/x-c++src", id: 54 },
      { name: "Java", mode: "text/x-java", id: 62 },
      { name: "Kotlin", mode: "text/x-kotlin", id: 78 },
      { name: "Ruby", mode: "ruby", id: 72 },
      { name: "Golang", mode: "go", id: 60 },
    ],
    cmOptions: {
      tabSize: 2,
      mode: "text/javascript",
      theme: "ayu-mirage",
      lineNumbers: true,
      line: true,
    },
  }),
  methods: {
    nextPage: function () {
      if (this.choice < this.questionData.length - 1) {
        this.choice = this.choice + 1;
        this.autoFillAnswer();
      }
    },
    prevPage: function () {
      if (this.choice > 0) {
        this.choice = this.choice - 1;
        this.autoFillAnswer();
      }
    },
    selectExam: function (number) {
      this.choice = number - 1;
      this.autoFillAnswer();
    },
    selectAnswer: function (item, id) {
      const arrayIndex = this.answer.findIndex((obj) => obj.qecid === id);
      this.answer[arrayIndex].answer = item;
    },
    selectAnswerGroup: function (item, id, max, position) {
      const arrayIndex = this.answer.findIndex((obj) => obj.qecid === id);
      const arrayResult = new Array(max).fill("");
      arrayResult[position] = item;

      if (Array.isArray(this.answer[arrayIndex].answer))
        this.answer[arrayIndex].answer[position] = item;
      else this.answer[arrayIndex].answer = arrayResult;
    },
    autoFillAnswer: function () {
      if (this.answer[this.choice].answer === undefined) {
        if (
          this.questionData[this.choice].qtid ===
            "74fbc3a5-0217-4892-9aba-70b612fc1a0e" ||
          this.questionData[this.choice].qtid ===
            "d284c3d2-e1d2-4b8b-94c6-58248fdf27e7"
        )
          this.selectAnswer([], this.questionData[this.choice].qecid);
        else this.selectAnswer("", this.questionData[this.choice].qecid);
      }
    },
    mappingCodeLanguage: function (numberCode) {
      const codeIndex = this.language.findIndex(
        (item) => item.id === numberCode
      );
      this.cmOptions.mode = this.language[codeIndex].mode;
      return this.language[codeIndex].name;
    },
    storeData: function () {
      localStorage.setItem("justExam", JSON.stringify(this.answer));
    },
    checkAnswerExam: function () {
      this.status = "Checking";
      const notFinish = [];

      this.answer.forEach((item, index) => {
        if (item.answer === undefined) notFinish.push(index);
        else if (item.answer === "") notFinish.push(index);
        else if (Array.isArray(item.answer)) {
          if (item.answer.length === 0) notFinish.push(index);
          else if (item.answer.length === 1 && item.answer[0] === null)
            notFinish.push(index);
        }
      });

      this.finish = true;

      if (notFinish.length > 0)
        this.textFinish =
          "คุณยังไม่ได้ทำข้อสอบข้อที่ " +
          notFinish.map((value) => value + 1).join(", ");
      else this.onSubmit();
    },
    onSubmit: function () {
      this.finish = true;
      this.textFinish = "กำลังส่งคำตอบ";
      this.status = "sending";

      setTimeout(() => {
        localStorage.removeItem('justExam')
        this.finish = false;
      }, 3000);
    },
  },
  created() {
    this.questionData.forEach((item, index) => {
      if (item.qtid === "d284c3d2-e1d2-4b8b-94c6-58248fdf27e7") {
        const answer = item.answer.map((value) => value.textA);
        this.questionData[index].answer.forEach((element, aIndex) => {
          this.questionData[index].answer[aIndex].textA = answer;
        });
      }
    }),
      this.questionData.forEach((item) => {
        this.answer.push({
          ecid: item.ecid,
          qecid: item.qecid,
        });
      }),
      this.autoFillAnswer();
  },
  mounted() {
    this.answer = JSON.parse(localStorage.getItem("justExam")) || this.answer;
  },
  watch: {},
};
</script>
