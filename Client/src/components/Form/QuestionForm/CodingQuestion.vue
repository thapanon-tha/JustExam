<template>
  <div>
    <div class="flex justify-center mb-52">
      <div class="border-l-4 border-mainColor h-10">
        <QuillTextEditor
          placeholder="Type Question here"
          theme="snow"
          width="8/9"
          height="40"
          v-model="questionData.question"
          :onChangeFunc="onChange"
        />
      </div>
    </div>
    <div class="ml-3">
      <select
        class="h-10 border rounded-md border-solid border-mainColor border-opacity-40 bg-mainColor px-2 text-white font-semilight text-center"
        id="lang"
        name="lang"
        v-model="questionData.lang"
        :onChangeFunc="onChangeLang()"
      >
        <option
          v-for="(item, index) in language"
          :key="index"
          :value="item.value"
        >
          {{ item.name }}
        </option>
      </select>
      <div class="flex flex-row mb-3">
        <v-col cols="12" class="flex-grow-0 flex-shrink-0">
          <div class="shadow-sm border-mainColor border-l-4">
            <codemirror v-model="questionData.code" :options="cmOptions" />
          </div>
        </v-col>
      </div>
      <div class="flex justify-start">
        <div class="shadow-sm border-mainColor border-l-4 mb-3">
          <QuillTextEditor
            :placeholder="`Input`"
            theme="bubble"
            width="96"
            height="2/4"
            v-model="questionData.input"
            :onChangeFunc="onChange"
          />
        </div>
      </div>
      <div class="flex justify-start">
        <div class="shadow-sm border-mainColor border-l-4 mb-3">
          <QuillTextEditor
            :placeholder="`Output`"
            theme="bubble"
            width="96"
            height="2/4"
            v-model="questionData.output"
            :onChangeFunc="onChange"
          />
        </div>
      </div>
      <h1 class="mt-5 mb-1">Test Case</h1>
      <div
        v-for="(item, index) in questionData.example"
        :key="item.id"
        class="mb-5"
      >
        <div class="flex justify-start">
          <div class="shadow-sm border-mainColor border-l-4 mb-3">
            <QuillTextEditor
              :placeholder="`Testcase Input ${index + 1}`"
              theme="bubble"
              width="96"
              height="2/4"
              :name="`example[${index}][xampleinput]`"
              v-model="item.xampleinput"
              @change="onChange()"
              :onChangeFunc="onChange"
            />
          </div>
          <div class="ml-20">
            <ActionButton
              class="text-mainColor flex justify-end"
              name="x"
              @on-click="deleteExample(index)"
            />
          </div>
        </div>
        <div class="flex justify-start">
          <div class="shadow-sm border-mainColor border-l-4 mb-3">
            <QuillTextEditor
              :placeholder="`Testcase Output ${index + 1}`"
              theme="bubble"
              width="96"
              height="2/4"
              :name="`example[${index}][xampleoutput]`"
              v-model="item.xampleoutput"
              @change="onChange()"
              :onChangeFunc="onChange"
            />
          </div>
        </div>
      </div>
      <ActionButton
        class="mt-3 bg-subColor border-orange-200 border border-solid rounded-lg px-3 py-2 font-semilight text-mainColor"
        name="+ Add an example"
        @on-click="addExample"
      />
    </div>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor.vue';
import ActionButton from '@/components/Button/ActionButton.vue';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-mirage.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/go/go';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/clike/clike';

export default {
  name: 'CodingQuestion',
  components: {
    QuillTextEditor,
    ActionButton,
    codemirror,
  },
  props: ['value'],
  data() {
    return {
      questionData: this.value,
      language: [
        {
          name: 'Javascript',
          mode: 'text/javascript',
          id: 63,
          value: 'javascript',
        },
        {
          name: 'Python',
          mode: 'python',
          id: 71,
          value: 'python',
        },
        {
          name: 'C',
          mode: 'text/x-csrc',
          id: 50,
          value: 'c',
        },
        {
          name: 'C#',
          mode: 'text/x-csharp',
          id: 51,
          value: 'csharp',
        },
        {
          name: 'C++',
          mode: 'text/x-c++src',
          id: 54,
          value: 'cpp',
        },
        {
          name: 'Java',
          mode: 'text/x-java',
          id: 62,
          value: 'java',
        },
        {
          name: 'Kotlin',
          mode: 'text/x-kotlin',
          id: 78,
          value: 'kotlin',
        },
        {
          name: 'Ruby',
          mode: 'ruby',
          id: 72,
          value: 'ruby',
        },
        {
          name: 'Golang',
          mode: 'go',
          id: 60,
          value: 'go',
        },
      ],
      cmOptions: {
        tabSize: 2,
        mode: 'python',
        theme: 'ayu-mirage',
        lineNumbers: true,
        line: true,
      },
    };
  },
  methods: {
    addExample() {
      this.questionData.example.push({
        id: this.questionData.example.length + 1,
        xampleinput: '',
        xampleoutput: '',
      });
    },
    deleteExample(index) {
      this.questionData.example.splice(index, 1);
    },
    onChange() {
      this.$emit('input', this.questionData);
    },
    onChangeLang() {
      this.mappingCodeLanguage(this.questionData.lang);
      this.$emit('input', this.questionData);
    },
    mappingCodeLanguage(numberCode) {
      const codeIndex = this.language.findIndex(
        (item) => item.value === numberCode,
      );
      this.cmOptions.mode = this.language[codeIndex].mode;
      return this.language[codeIndex].name;
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  created() {
    this.questionData.lang = 'python';
  },
};
</script>
