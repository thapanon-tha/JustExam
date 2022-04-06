<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-row mt-5 justify-start ml-5">
      <div
        class="bg-subColor border-orange-200 border border-solid rounded-xl shadow-sm font-semilight text-mainColor mr-2"
        v-for="(section, index) in sectionlist"
        :key="index"
      >
        <div class="flex flex-row" @click="onClickSelectSection(section.id)">
          <div class="pt-3 pl-3 pr-3">
            <p>Section {{ index + 1 }}</p>
          </div>
          <div class="pt-3 pr-3">
            <v-icon
              small
              color="orange darken-2"
              class="rounded-full hover:white hover:bg-orange-200"
              @click="deleteSection(section.id)"
            >
              mdi-close
            </v-icon>
          </div>
        </div>
      </div>

      <ActionButton
        class="w-12 h-12 bg-mainColor border border-solid rounded-full shadow-sm font-semilight text-white mt-1 ml-2"
        name="+"
        @on-click="addSection"
      />
    </div>
    <div
      class="flex flex-col justify-center bg-subColor border rounded-xl border-solid border-editorColor shadow-sm md:w-156"
    >
      <div class="flex flex-col justify-center">
        <div
          v-for="(item, index) in questionList"
          :key="item.id"
          class="bg-white border rounded-xl border-editorColor w-auto ml-20 mr-20 mt-10 shadow-md"
        >
          <div class="flex flex-row justify-center mt-10 mb-10 ml-10 mr-10">
            <MultipleChoice v-model="item.questionData" v-if="item.type === 'mc'" />
            <ShortAnswer v-model="item.questionData" v-if="item.type === 'sa'" />
            <Paragraph v-model="item.questionData" v-if="item.type === 'pa'" />
            <TrueFalse v-model="item.questionData" v-if="item.type === 'tf'" />
            <Matching v-model="item.questionData" v-if="item.type === 'ma'" />
            <CodingQuestion v-model="item.questionData" v-if="item.type === 'ca'" />
            <div class="flex flex-col ml-10">
              <select
                class="border rounded-md border-solid border-mainColor border-opacity-40 bg-white px-8 py-3 text-mainColor font-semibold text-center"
                id="type"
                name="type"
                v-model="item.type"
                @change="onChange(item.id, item.type)"
              >
                <option
                  v-for="(item, indexO) in questionTypeOptionList"
                  :key="indexO"
                  :value="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
              <button
                class="mt-3 bg-white border-orange-200 border border-solid rounded-lg font-semilight text-mainColor p-1"
                @click="copyQuestion(index)"
              >
                <span class="material-icons mt-2"> content_copy </span>
              </button>
              <button
                class="mt-3 bg-white border-orange-200 border border-solid rounded-lg font-semilight text-mainColor"
                @click="deleteQuestion(item.id)"
              >
                <span class="material-icons mt-2 text-3xl"> delete_outline </span>
              </button>
            </div>
          </div>
        </div>
        <ActionButton
          class="mt-10 ml-20 mr-20 mb-10 bg-white border-orange-200 border border-solid rounded-lg px-3 py-2 font-semilight text-mainColor shadow-md hover:text-white hover:bg-mainColor"
          name="+ Add a question"
          @on-click="addQuestion"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from '@/components/Button/ActionButton.vue';
import MultipleChoice from '@/components/Form/QuestionForm/MultipleChoice.vue';
import ShortAnswer from '@/components/Form/QuestionForm/ShortAnswer.vue';
import Paragraph from '@/components/Form/QuestionForm/Paragraph.vue';
import Matching from '@/components/Form/QuestionForm/Matching.vue';
import TrueFalse from '@/components/Form/QuestionForm/TrueFalse.vue';
import CodingQuestion from '@/components/Form/QuestionForm/CodingQuestion.vue';

export default {
  /* eslint-disable */
  name: 'QuestionList',
  components: {
    MultipleChoice,
    ShortAnswer,
    Paragraph,
    Matching,
    TrueFalse,
    CodingQuestion,
    ActionButton,
  },
  data() {
    return {
      seeModal: false,
      selectedSectionId: 1,
      sectionlist: [
        {
          id: 1,
          sectionName: 'Section 1',
        },
      ],
      qlist: [
        {
          id: 1,
          type: 'mc',
          sectionId: 1,
          questionData: {
            question: '',
            answers: [
              {
                id: 1,
                optionData: '',
                correct: false,
              },
            ],
          },
        },
      ],
      questionTypeOptionList: [
        {
          name: 'Multiple Choice',
          value: 'mc',
        },
        {
          name: 'Short Answer',
          value: 'sa',
        },
        {
          name: 'Paragraph Answer',
          value: 'pa',
        },
        {
          name: 'True/False',
          value: 'tf',
        },
        {
          name: 'Matching',
          value: 'ma',
        },
        {
          name: 'Coding',
          value: 'ca',
        },
      ],
      //* this is prototype for new question
      prototype: {
        mc: {
          question: '',
          answers: [
            {
              id: 1,
              optionData: '',
              correct: false,
            },
          ],
        },
        sa: {
          question: '',
          keylist: [
            {
              id: 1,
              keyans: '',
            },
          ],
        },
        pa: {
          question: '',
        },
        tf: {
          question: '',
          true: false,
          false: false,
        },
        ma: {
          question: '',
          matchs: [
            {
              id: 1,
              subquestion: '',
              matchanswer: '',
            },
          ],
        },
        ca: {
          lang: '',
          code: '',
          question: '',
          input: '',
          output: '',
          example: [
            {
              id: 1,
              xampleinput: '',
              xampleoutput: '',
            },
          ],
        },
      },
    };
  },
  props: {
    value: {
      type: Boolean,
      defaultf: false,
    },
  },
  methods: {
    addQuestion() {
      let _id;
      if (this.qlist.length === 0) {
        _id = 1;
      } else {
        _id = this.qlist[this.qlist.length - 1].id + 1;
      }
      this.qlist.push({
        id: _id,
        sectionId: this.selectedSectionId,
        type: 'mc',
        data: '',
        questionData: {
          question: '',
          answers: [
            {
              id: 1,
              optionData: '',
              correct: false,
            },
          ],
        },
      });
    },
    addSection() {
      this.sectionlist.push({
        id: this.sectionlist.length + 1,
        sectionName: `Section ${this.sectionlist.length + 1}`,
      });
    },
    onClickSelectSection(id) {
      this.selectedSectionId = id;
    },
    clickToSee() {
      this.seeModal = !this.seeModal;
    },
    deleteSection(id) {
      this.selectedSectionId = id;
      this.qlist = this.qlist.filter((e) => e.sectionId !== id);
      this.sectionlist = this.sectionlist.filter((e) => e.id !== id);
      this.sectionlist = this.sectionlist.map((e) => {
        if (e.id > id) {
          const newS = e;
          newS.id = newS.id - 1;
          return newS;
        } else {
          return e;
        }
      });
      this.seeModal = false;
    },
    copyQuestion(index) {
      console.log(this.qlist[index]);
    },
    deleteQuestion(id) {
      this.qlist = this.qlist.filter((e) => e.id !== id);
    },
    onChange(id, type) {
      let indexObject = this.qlist.findIndex((value) => value.id === id);
      this.qlist[indexObject].questionData = this.prototype[type];
    },
  },
  created() {
    this.$emit('update:qlist', this.qlist);
  },
  computed: {
    questionList() {
      return this.qlist.filter((question) => question.sectionId === this.selectedSectionId);
    },
  },
  watch: {
    qlist: function (newVal, oldVal) {
      this.$emit('update:qlist', this.qlist);
    },
  },
};
</script>
