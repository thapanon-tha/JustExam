<template>
  <div class="ml-15 mt-10 mr-15 mb-10">
    <v-row>
      <v-col>
        <div class="bg-gray-100 rounded-md shadow-md">
          <div class="p-2 text-sm bg-mainColor text-white rounded-t-md">
            Example Input :
          </div>
          <div v-html="questionData.input" class="px-3 py-4"></div>
        </div>
      </v-col>
      <v-col>
        <div class="bg-gray-100 rounded-md shadow-md">
          <div class="p-2 text-sm bg-mainColor text-white rounded-t-md">
            Example Output :
          </div>
          <div v-html="questionData.output" class="px-3 py-4"></div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="rounded-t-md" v-bind:style="{ backgroundColor: '#1f2430' }">
          <p class="px-4 py-2 bg-mainColor rounded-t-md text-white">
            Language :
            {{ questionData.lang }}
          </p>
          <codemirror v-model="questionData.code" :options="cmOptions" />
        </div>
      </v-col>
    </v-row>
    <v-row
      v-for="(testcase, testNo) in questionData.example"
      :key="testcase.id"
    >
      <v-col cols="6">
        <div class="rounded-t-md" v-bind:style="{ backgroundColor: '#1f2430' }">
          <p class="px-4 py-2 bg-mainColor rounded-t-md text-white">
            Testcase Input {{ testNo + 1 }}
          </p>
          <div class="px-3 py-4 rounded-t-md">
            <codemirror
              :value="`${testcase.xampleinput.replace(/(<([^>]+)>)/gi, '')}`"
              :options="{
                tabSize: 2,
                theme: 'ayu-mirage',
                line: true,
                readOnly: true,
              }"
            />
          </div>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="rounded-t-md" v-bind:style="{ backgroundColor: '#1f2430' }">
          <p class="px-4 py-2 bg-mainColor rounded-t-md text-white">
            Testcase Output {{ testNo + 1 }}
          </p>
          <div class="px-3 py-4">
            <codemirror
              :value="`${testcase.xampleoutput.replace(/(<([^>]+)>)/gi, '')}`"
              :options="{
                tabSize: 2,
                theme: 'ayu-mirage',
                line: true,
                readOnly: true,
              }"
            />
          </div>
        </div>
      </v-col>
    </v-row>

    <div class="flex justify-end mt-2">
      <input
        class="w-20 p-2 font-semilight text-center text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-mainColor border-opacity-40 rounded-md transition ease-in-out m-0 focus:text-black focus:mainColor focus:border-opacity-100 focus:outline-none"
        type="number"
        min="0"
        v-model="questionData.point"
        placeholder="Total"
      />
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor.vue';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/go/go';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/clike/clike';

export default {
  name: 'ScoreCoding',
  components: {
    QuillTextEditor,
    codemirror,
  },
  props: ['value'],
  data() {
    return {
      questionData: this.value,
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
    mappingCodeLanguage(numberCode) {
      const codeIndex = this.language.findIndex(
        (item) => item.id === numberCode,
      );
      this.cmOptions.mode = this.language[codeIndex].mode;
      return this.language[codeIndex].name;
    },
  },
};
</script>

<style>
.CodeMirror {
  height: auto;
}
</style>
