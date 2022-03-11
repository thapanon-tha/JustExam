<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-row mt-5 justify-center">
      <div
        class="bg-subColor border-orange-200 border border-solid rounded-md shadow-sm font-semilight text-mainColor px-5 py-2 ml-3 hover:text-white hover:bg-mainColor"
        v-for="(section, index) in sectionlist"
        :key="index"
        @click="onClickSelectSection(section.id)"
      >
        <h1>Section {{ index + 1 }}</h1>
      </div>
      <ActionButton
        class="bg-mainColor border border-solid rounded-full shadow-sm font-semilight text-white px-4 py-2 ml-3"
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
          <div class="flex flex-row justify-center mt-10 mb-10">
            <MultipleChoice v-model="item.questionData" v-if="item.type === 'mc'" />
            <ShortAnswer v-model="item.questionData" v-if="item.type === 'sa'" />
            <Paragraph v-model="item.questionData" v-if="item.type === 'pa'" />
            <TrueFalse v-model="item.questionData" v-if="item.type === 'tf'" />
            <Matching v-model="item.questionData" v-if="item.type === 'ma'" />
            <CodingQuestion v-model="item.questionData" v-if="item.type === 'ca'" />
            <div class="flex flex-col ml-10">
              <select
                class="border rounded-md border-solid border-mainColor border-opacity-40 bg-white px-8 py-3 text-mainColor font-semilight"
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
              <ActionButton
                class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-3 py-3 font-semilight text-mainColor"
                name="Copy exam"
                @on-click="copyQuestion(index)"
              />
              <ActionButton
                class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
                name="Delete"
                @on-click="deleteQuestion(item.id)"
              />
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
import ActionButton from "@/components/Button/ActionButton.vue";
import MultipleChoice from "@/components/Form/QuestionForm/MultipleChoice.vue";
import ShortAnswer from "@/components/Form/QuestionForm/ShortAnswer.vue";
import Paragraph from "@/components/Form/QuestionForm/Paragraph.vue";
import Matching from "@/components/Form/QuestionForm/Matching.vue";
import TrueFalse from "@/components/Form/QuestionForm/TrueFalse.vue";
import CodingQuestion from "@/components/Form/QuestionForm/CodingQuestion.vue";

export default {
  name: "QuestionList",
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
      selectedSectionId: 1,
      sectionlist: [
        {
          id: 1,
          sectionName: "Section 1",
        },
      ],
      qlist: [
        {
          id: 1,
          type: "mc",
          sectionId: 1,
          questionData: {
            question: "",
            answers: [
              {
                id: 1,
                optionData: "",
                correct: false,
              },
            ],
          },
        },
      ],
      questionTypeOptionList: [
        {
          name: "Multiple Choice",
          value: "mc",
        },
        {
          name: "Short Answer",
          value: "sa",
        },
        {
          name: "Paragraph Answer",
          value: "pa",
        },
        {
          name: "True/False",
          value: "tf",
        },
        {
          name: "Matching",
          value: "ma",
        },
        {
          name: "Coding",
          value: "ca",
        },
      ],
      //* this is prototype for new question
      prototype: {
        mc: {
          question: "",
          answers: [
            {
              id: 1,
              optionData: "",
              correct: false,
            },
          ],
        },
        sa: {
          question: "",
          keylist: [
            {
              id: 1,
              keyans: "",
            },
          ],
        },
        pa: {
          question: "",
        },
        tf: {
          question: "",
          true: false,
          false: false,
        },
        ma: {
          question: "",
          matchs: [
            {
              id: 1,
              subquestion: "",
              matchanswer: "",
            },
          ],
        },
        ca: {
          code: "",
          question: "",
          input: "",
          output: "",
          example: [
            {
              id: 1,
              xampleinput: "",
              xampleoutput: "",
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
        type: "mc",
        data: "",
        questionData: {
          question: "",
          answers: [
            {
              id: 1,
              optionData: "",
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
      console.log(this.selectedSectionId);
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
  computed: {
    questionList() {
      return this.qlist.filter((question) => question.sectionId === this.selectedSectionId);
    },
  },
  watch: {
    qlist: function (newVal, oldVal) {
      this.$emit("update:qlist", this.qlist);
    },
  },
};
</script>
