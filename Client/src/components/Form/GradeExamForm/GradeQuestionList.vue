<template>
  <v-container>
    <div class="flex">
      <div class="d-flex justify-start m-1" v-for="(section, index) in sectionlist" :key="index">
        <div v-if="selectedSectionId === index + 1" @click="onClickSelectSection(section.id)">
          <v-btn class="white--text" color="#EF7F4C" large :outlined="false">
            Section {{ index + 1 }}
          </v-btn>
        </div>
        <div v-else @click="onClickSelectSection(section.id)">
          <v-btn color="#EF7F4C" large :outlined="true"> Section {{ index + 1 }} </v-btn>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col w-screen gap-5 mt-5"
      v-for="(item, itemIndex) in questionList"
      :key="item.id"
    >
      <v-card color="#FFFBFA">
        <v-card-text>
          <div class="flex text-xl text-left">
            <span class="mr-2">{{ itemIndex + 1 }})</span>
            <span v-html="item.questionTopic"></span>
          </div>
          <!-------------------- Multiple-Choice Type -------------------->
          <div v-if="item.qtid === '74fbc3a5-0217-4892-9aba-70b612fc1a0e'">
            <div class="ml-5" v-for="answer in item.answer" :key="answer.qamccid">
              <v-checkbox
                v-if="
                  item.studentAnswer.findIndex(function (key) {
                    return key === answer.qamccid;
                  }) >= 0
                "
                color="#FB8C00"
                hide-details
                :label="`${answer.textA.replace(/(<([^>]+)>)/gi, '')}`"
                input-value="true"
                value
                disabled
              ></v-checkbox>
              <v-checkbox
                v-else
                color="#FB8C00"
                hide-details
                :label="`${answer.textA.replace(/(<([^>]+)>)/gi, '')}`"
                value
                disabled
              ></v-checkbox>
            </div>
          </div>
          <!-------------------- True/False Type -------------------->
          <div v-else-if="item.qtid === 'b3037171-640a-4077-bf17-10b23a52c386'">
            <v-radio-group class="ml-3" v-model="item.studentAnswer" disabled>
              <v-radio
                color="#EF7F4C"
                v-for="item in [
                  { name: 'True', value: true },
                  { name: 'False', value: false },
                ]"
                :key="item.name"
                :label="`${item.name}`"
                :value="item.value"
              ></v-radio>
            </v-radio-group>
          </div>

          <!-------------------- Matching Type -------------------->
          <div v-else-if="item.qtid === 'd284c3d2-e1d2-4b8b-94c6-58248fdf27e7'">
            <div
              class="ml-3 flex justify-start items-start"
              v-for="answer in item.answer"
              :key="answer.qamcid"
            >
              <v-container>
                <v-row>
                  <v-col cols="3">
                    <div v-html="answer.textQ" class="mt-3"></div>
                  </v-col>
                  <v-col cols="1">
                    <div class="mt-3 font-bold">:</div>
                  </v-col>
                  <v-col>
                    <div
                      v-if="
                        item.studentAnswer
                          .filter((e) => e !== null)
                          .find((element) => element.qamcid === answer.qamcid)
                      "
                      class="mt-3"
                    >
                      {{
                        item.studentAnswer
                          .filter((e) => e !== null)
                          .find((element) => element.qamcid === answer.qamcid).value
                      }}
                    </div>
                    <div v-else   class="mt-3">---------------</div>

                    <!-- <div v-else class="mt-3">
                        <div v-if="textIndex === 1" class="mt-3">
                          ---------
                        </div>
                      </div> -->
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>

          <!-------------------- Short-Answer Type -------------------->
          <div
            v-else-if="item.qtid === '5b3f9f23-bc46-4247-9e3d-3ebb5d5cd1c1'"
            class="flex justify-start"
          >
            <input
              class="m-5 w-52 p-1 rounded-md focus:ring focus:ring-yellow-300 focus:outline-none"
              type="text"
              placeholder="Answer"
              v-model="item.studentAnswer"
              v-bind:style="{ border: '1px solid rgba(245, 158, 11, 0.6)' }"
              disabled
            />
          </div>
          <!-------------------- Paragraph Type -------------------->
          <div v-else-if="item.qtid === '5edad656-83b9-4de0-ab94-f7d40cea3354'">
            <textarea
              class="m-5 w-full h-52 p-1 rounded-md resize-none focus:ring focus:ring-yellow-300 focus:outline-none"
              type="text"
              placeholder="Answer"
              :value="item.studentAnswer"
              v-bind:style="{ border: '1px solid rgba(245, 158, 11, 0.6)' }"
            />
          </div>
          <!-------------------- Codeing Type -------------------->
          <div v-else-if="item.qtid === '7190c532-3ccc-4ed7-ae77-6ffd967bf87c'" class="text-left">
            <v-container>
              <v-row>
                <v-col>
                  <div class="bg-gray-100 rounded-md shadow-md">
                    <div class="p-2 text-sm bg-mainColor text-white rounded-t-md">
                      Example Input :
                    </div>
                    <div v-html="item.answer[0].exInput" class="px-3 py-4"></div>
                  </div>
                </v-col>
                <v-col>
                  <div class="bg-gray-100 rounded-md shadow-md">
                    <div class="p-2 text-sm bg-mainColor text-white rounded-t-md">
                      Example Output :
                    </div>
                    <div v-html="item.answer[0].exOutput" class="px-3 py-4"></div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="rounded-t-md" v-bind:style="{ backgroundColor: '#1f2430' }">
                    <p class="px-4 py-2 bg-mainColor rounded-t-md text-white">
                      Language :
                      {{ mappingCodeLanguage(item.answer[0].clid) }}
                    </p>
                    <codemirror v-model="item.studentAnswer" :options="cmOptions" />
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <!------------------------------- Endddddddd -------------------------------->
        </v-card-text>
        <v-card-actions>
          <v-list-item class="grow">
            <v-row>
              <v-col align="center" justify="end">
                <div class="flex justify-end align-center">
                  <input
                    v-if="item.answerQuestionScores[0] !== undefined"
                    class="w-20 p-2 font-semilight text-center text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:mainColor focus:border-opacity-100 focus:outline-none"
                    type="number"
                    :max="item.point"
                    v-model="item.answerQuestionScores[0].pointReviceve"
                    placeholder="Point"
                  />
                  <input
                    v-else
                    class="w-20 p-2 font-semilight text-center text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:mainColor focus:border-opacity-100 focus:outline-none"
                    type="number"
                    :max="item.point"
                    :value="0"
                    placeholder="Point"
                  />
                  <h1 class="text-md ml-3 mr-3">/</h1>
                  <div class="text-md">{{ item.point }}</div>
                </div>
              </v-col>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { codemirror } from 'vue-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/go/go';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/clike/clike';

export default {
  name: 'GradeQuestionList',
  components: {
    codemirror,
  },
  props: ['value', 'loading'],
  data() {
    return {
      selectedSectionId: 1,
      questionData: this.value,
      sectionlist: [
        {
          id: 1,
          sectionName: 'Section 1',
        },
      ],
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
        readOnly: true,
      },
    };
  },
  methods: {
    onClickSelectSection(id) {
      this.selectedSectionId = id;
    },
    mappingCodeLanguage(numberCode) {
      const codeIndex = this.language.findIndex((item) => item.id === numberCode);
      this.cmOptions.mode = this.language[codeIndex].mode;
      return this.language[codeIndex].name;
    },
    sectionCalo() {
      const list = this.value.map((data) => parseInt(data.sectionName, 10));
      const result = list.filter((v, i) => list.indexOf(v) === i);
      if (result.length !== 0) {
        this.sectionlist = result.map((v) => ({
          id: v,
          sectionName: `Section ${v}`,
        }));
      }
      this.sectionlist.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
    },
    preparedate() {},
  },
  computed: {
    questionList() {
      return this.value.filter(
        (question) => parseInt(question.sectionName, 10) === this.selectedSectionId,
      );
    },
  },
  watch: {
    loading(newVal, oldVal) {
      this.sectionCalo();
    },
  },
  created() {
    this.sectionCalo()
  },
};
</script>
