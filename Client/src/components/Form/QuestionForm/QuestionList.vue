<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-row mt-5 justify-start ml-5">
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
              <v-icon
                small
                color="white"
                class="rounded-full hover:white hover:bg-orange-200 ml-1"
                @click="deleteSection(section.id)"
              >
                mdi-close
              </v-icon>
            </v-btn>
          </div>
          <div v-else @click="onClickSelectSection(section.id)">
            <v-btn color="#EF7F4C" large :outlined="true">
              <div>
                Section {{ index + 1 }}
                <v-icon
                  small
                  color="#EF7F4C"
                  class="rounded-full hover:white hover:bg-orange-200"
                  @click="deleteSection(section.id)"
                >
                  mdi-close
                </v-icon>
              </div>
            </v-btn>
          </div>
        </div>
        <!-- eslint-disable max-len -->
        <ActionButton
          class="w-12 h-12 bg-mainColor border border-solid rounded-full shadow-sm font-semilight text-white mt-1 ml-2"
          name="+"
          @on-click="addSection"
        />
        <!-- eslint-enable max-len -->
      </div>
    </div>
    <!-- eslint-disable max-len -->
    <div
      class="flex flex-col justify-center bg-subColor border rounded-xl border-solid border-editorColor shadow-sm md:w-156"
    >
      <!-- eslint-enable max-len -->
      <div class="flex flex-col justify-center">
        <div
          v-for="item in questionList"
          :key="item.id"
          class="bg-white border rounded-xl border-editorColor w-auto ml-20 mr-20 mt-10 shadow-md"
        >
          <div class="flex flex-row justify-center mt-10 mb-10 ml-10 mr-10">
            <MultipleChoice
              v-model="item.questionData"
              v-if="item.type === 'mc'"
            />
            <ShortAnswer
              v-model="item.questionData"
              v-if="item.type === 'sa'"
            />
            <Paragraph v-model="item.questionData" v-if="item.type === 'pa'" />
            <TrueFalse v-model="item.questionData" v-if="item.type === 'tf'" />
            <Matching v-model="item.questionData" v-if="item.type === 'ma'" />
            <CodingQuestion
              v-model="item.questionData"
              v-if="item.type === 'ca'"
            />
            <div class="flex flex-col ml-10">
              <!-- eslint-disable max-len -->
              <select
                class="border rounded-md border-solid border-mainColor border-opacity-40 bg-white px-8 py-3 text-mainColor font-semibold text-center"
                id="type"
                name="type"
                v-model="item.type"
                @change="onChange(item.id, item.type)"
              >
                <!-- eslint-enable max-len -->
                <option
                  v-for="(item, indexO) in questionTypeOptionList"
                  :key="indexO"
                  :value="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
              <!-- eslint-disable max-len -->
              <button
                class="mt-3 bg-white border-orange-200 border border-solid rounded-lg font-semilight text-mainColor"
                @click="deleteQuestion(item.id)"
              >
                <!-- eslint-enable max-len -->
                <span class="material-icons mt-2 text-3xl">
                  delete_outline
                </span>
              </button>
            </div>
          </div>
        </div>
        <!-- eslint-disable max-len -->
        <ActionButton
          class="mt-10 ml-20 mr-20 mb-10 bg-white border-orange-200 border border-solid rounded-lg px-3 py-2 font-semilight text-mainColor shadow-md hover:text-white hover:bg-mainColor"
          name="+ Add a question"
          @on-click="addQuestion"
        />
        <!-- eslint-enable max-len -->
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
      const newQl = this.qlist.filter((e) => e.sectionId !== id);
      this.qlist = newQl;
      this.qlist = this.qlist.map((e) => {
        if (e.sectionId > id) {
          const newData = { ...e };
          newData.sectionId -= 1;
          return newData;
        }
        return e;
      });
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
    copyQuestion(index) {},
    deleteQuestion(id) {
      this.qlist = this.qlist.filter((e) => e.id !== id);
    },
    onChange(id, type) {
      const prototype2 = {
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
          true: true,
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
          lang: 'python',
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
      };
      let indexObject = this.qlist.findIndex((value) => value.id === id);
      this.qlist[indexObject].questionData = prototype2[type];
    },
  },
  created() {
    this.$emit('update:qlist', this.qlist);
  },
  computed: {
    questionList() {
      return this.qlist.filter(
        (question) => question.sectionId === this.selectedSectionId,
      );
    },
  },
  watch: {
    qlist: function (newVal, oldVal) {
      this.$emit('update:qlist', this.qlist);
    },
  },
};
</script>
