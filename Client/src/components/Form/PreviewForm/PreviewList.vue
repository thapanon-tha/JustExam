<template>
  <v-container>
    <div class="flex">
      <div
        class="d-flex justify-start m-1"
        v-for="(section, index) in sectionlist"
        :key="index"
      >
        <div
          v-if="selectedSectionId === index + 1"
          @click="onClickSelectSection(section.id)"
        >
          <v-btn class="white--text" color="#EF7F4C" large :outlined="false">
            Section {{ index + 1 }}
          </v-btn>
        </div>
        <div v-else @click="onClickSelectSection(section.id)">
          <v-btn color="#EF7F4C" large :outlined="true">
            Section {{ index + 1 }}
          </v-btn>
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
          <div class="flex text-xl text-left black--text">
            <span class="mr-2">{{ itemIndex + 1 }})</span>
            <span v-html="item.questionData.question"></span>
          </div>
          <!-------------------- Multiple-Choice Type -------------------->
          <div v-if="item.type === 'mc'">
            <div
              class="ml-5"
              v-for="answer in item.questionData.answers"
              :key="answer.id"
            >
              <v-checkbox
                color="#FB8C00"
                hide-details
                :label="`${answer.optionData.replace(/(<([^>]+)>)/gi, '')}`"
                value
                disabled
              ></v-checkbox>
            </div>
          </div>
          <!-------------------- True/False Type -------------------->
          <div v-else-if="item.type === 'tf'">
            <v-radio-group class="ml-3" disabled>
              <v-radio
                color="#EF7F4C"
                v-for="item in [
                  { name: 'True', value: true },
                  { name: 'False', value: false },
                ]"
                :key="item.name"
                :label="`${item.name}`"
              ></v-radio>
            </v-radio-group>
          </div>

          <!-------------------- Matching Type -------------------->
          <div v-else-if="item.type === 'ma'">
            <div
              class="ml-3 flex justify-start items-start"
              v-for="answer in item.questionData.matchs"
              :key="answer.id"
            >
              <v-container>
                <v-row>
                  <v-col cols="3">
                    <div v-html="answer.subquestion" class="mt-3"></div>
                  </v-col>
                  <v-col cols="1">
                    <div class="mt-3 font-bold">:</div>
                  </v-col>
                  <v-col>
                    <div class="w-64">
                      <v-select
                        :label="'Select your Answer'"
                        :items="matchCal(item.questionData.matchs)"
                        solo
                      ></v-select>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </div>

          <!-------------------- Short-Answer Type -------------------->
          <div v-else-if="item.type === 'sa'" class="flex justify-start">
            <input
              class="m-5 w-52 p-1 rounded-md focus:ring focus:ring-yellow-300 focus:outline-none"
              type="text"
              placeholder="Answer"
              v-bind:style="{ border: '1px solid rgba(245, 158, 11, 0.6)' }"
              disabled
            />
          </div>
          <!-------------------- Paragraph Type -------------------->
          <div v-else-if="item.type === 'pa'">
            <textarea
              class="m-5 w-full h-52 p-1 rounded-md resize-none focus:ring focus:ring-yellow-300 focus:outline-none"
              type="text"
              placeholder="Answer"
              v-bind:style="{ border: '1px solid rgba(245, 158, 11, 0.6)' }"
            />
          </div>
          <!-------------------- Codeing Type -------------------->
          <div v-else-if="item.type === 'ca'" class="text-left">
            <v-container>
              <v-row>
                <v-col>
                  <div class="bg-gray-100 rounded-md shadow-md">
                    <div
                      class="p-2 text-sm bg-mainColor text-white rounded-t-md"
                    >
                      Example Input :
                    </div>
                    <div
                      v-html="item.questionData.input"
                      class="px-3 py-4"
                    ></div>
                  </div>
                </v-col>
                <v-col>
                  <div class="bg-gray-100 rounded-md shadow-md">
                    <div
                      class="p-2 text-sm bg-mainColor text-white rounded-t-md"
                    >
                      Example Output :
                    </div>
                    <div
                      v-html="item.questionData.output"
                      class="px-3 py-4"
                    ></div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div
                    class="rounded-t-md"
                    v-bind:style="{ backgroundColor: '#1f2430' }"
                  >
                    <p class="px-4 py-2 bg-mainColor rounded-t-md text-white">
                      Language :
                      {{ mappingCodeLanguage(item.questionData.lang) }}
                    </p>
                    <codemirror
                      v-model="item.questionData.code"
                      :options="cmOptions"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <!------------------------------- Endddddddd -------------------------------->
        </v-card-text>
      </v-card>
    </div>
    <!-- <div
      class="flex flex-col w-screen gap-5 mt-5"
      v-for="item in questionList"
      :key="item.id"
    >
      <div class="bg-subColor border border-orange-200 rounded-xl w-4/6">
        <PreMultiple v-if="item.type === 'mc'" :value="item.questionData" />
        <PreShortAns v-if="item.type === 'sa'" :value="item.questionData" />
        <PreParagraph v-if="item.type === 'pa'" :value="item.questionData" />
        <PreTrueFalse v-if="item.type === 'tf'" :value="item.questionData" />
        <PreMatching v-if="item.type === 'ma'" :value="item.questionData" />
        <PreCoding v-if="item.type === 'ca'" :value="item.questionData" />
      </div>
    </div> -->
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
  name: 'PreviewList',
  components: {
    codemirror,
  },
  props: ['value'],
  data() {
    return {
      selectedSectionId: 1,
      sectionlist: [
        {
          id: 1,
          sectionName: 'Section 1',
        },
      ],
      qlist: [],
      language: [
        { name: 'Javascript', mode: 'text/javascript', id: 'javascript' },
        { name: 'Python', mode: 'python', id: 'python' },
        { name: 'C', mode: 'text/x-csrc', id: 'c' },
        { name: 'C#', mode: 'text/x-csharp', id: 'csharp' },
        { name: 'C++', mode: 'text/x-c++src', id: 'cpp' },
        { name: 'Java', mode: 'text/x-java', id: 'java' },
        { name: 'Kotlin', mode: 'text/x-kotlin', id: 'kotlin' },
        { name: 'Ruby', mode: 'ruby', id: 'ruby' },
        { name: 'Golang', mode: 'go', id: 'go' },
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
      const codeIndex = this.language.findIndex(
        (item) => item.id === numberCode,
      );
      this.cmOptions.mode = this.language[codeIndex].mode;
      return this.language[codeIndex].name;
    },
    sectionCalo() {
      const list = this.qlist.map((data) => parseInt(data.sectionId, 10));
      const result = list.filter((v, i) => list.indexOf(v) === i);
      if (result.length !== 0) {
        this.sectionlist = result.map((v) => ({
          id: v,
          sectionName: `Section ${v}`,
        }));
      }
      this.sectionlist.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
    },
    matchCal(element) {
      return element.map((e) => e.matchanswer.replace(/(<([^>]+)>)/gi, ''));
    },
  },
  computed: {
    questionList() {
      return this.qlist.filter(
        (question) => question.sectionId === this.selectedSectionId,
      );
    },
  },
  mounted() {},
  created() {
    this.qlist = this.value;
    this.sectionCalo();
  },
  watch: {
    value() {
      this.qlist = this.value;
      this.sectionCalo();
    },
  },
};
</script>
