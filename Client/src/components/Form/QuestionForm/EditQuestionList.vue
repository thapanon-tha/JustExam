<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-row mt-5 justify-start ml-5">
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
          v-for="item in questionList"
          :key="item.id"
          class="bg-white border rounded-xl border-editorColor w-auto ml-20 mr-20 mt-10 shadow-md"
        >
          <div
            class="flex flex-row justify-center mt-10 mb-10 ml-10 mr-10"
            v-if="showEditQuestion"
          >
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
          <div
            class="flex flex-row justify-center mt-10 mb-10 ml-10 mr-10"
            v-if="showSaveQuestion"
          >
            <PreMultiple v-if="qlist.type === 'mc'" :value="prototype.mc" />
            <PreShortAns v-if="qlist.type === 'sa'" :value="prototype.sa" />
            <PreParagraph v-if="qlist.type === 'pa'" :value="prototype.pa" />
            <PreTrueFalse v-if="qlist.type === 'tf'" :value="prototype.tf" />
            <PreMatching v-if="qlist.type === 'ma'" :value="prototype.ma" />
            <PreCoding v-if="qlist.type === 'ca'" :value="prototype.ca" />
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
    <v-snackbar
      v-model="snackbar"
      centered
      top
      text
      outlined
      :multi-line="true"
      :timeout="1000"
      :color="snackbarColor"
    >
      {{ snackbarMessage }}
    </v-snackbar>
    <Loading v-model="isLoading"></Loading>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import MultipleChoice from '@/components/Form/QuestionForm/MultipleChoice.vue';
import ShortAnswer from '@/components/Form/QuestionForm/ShortAnswer.vue';
import Paragraph from '@/components/Form/QuestionForm/Paragraph.vue';
import Matching from '@/components/Form/QuestionForm/Matching.vue';
import TrueFalse from '@/components/Form/QuestionForm/TrueFalse.vue';
import CodingQuestion from '@/components/Form/QuestionForm/CodingQuestion.vue';
import PreMultiple from '@/components/Form/PreviewForm/PreMultiple.vue';
import PreShortAns from '@/components/Form/PreviewForm/PreShortAns.vue';
import PreParagraph from '@/components/Form/PreviewForm/PreParagraph.vue';
import PreMatching from '@/components/Form/PreviewForm/PreMatching.vue';
import PreCoding from '@/components/Form/PreviewForm/PreCoding.vue';
import PreTrueFalse from '@/components/Form/PreviewForm/PreTrueFalse.vue';
import api from '@/services/apis';

export default {
  name: 'EditQuestionList',
  components: {
    MultipleChoice,
    ShortAnswer,
    Paragraph,
    Matching,
    TrueFalse,
    CodingQuestion,
    PreMultiple,
    PreShortAns,
    PreParagraph,
    PreMatching,
    PreCoding,
    PreTrueFalse,
    ActionButton,
    Loading,
  },
  data() {
    return {
      snackbar: false,
      snackbarColor: '',
      snackbarMessage: '',
      showSaveQuestion: false,
      showEditQuestion: true,
      selectedSectionId: 1,
      isLoading: false,
      sectionlist: [
        {
          id: 1,
          sectionName: 'Section 1',
        },
      ],
      qlist: [],
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
      },
    };
  },
  props: ['value'],
  methods: {
    addQuestion() {
      let tempId;
      if (this.qlist.length === 0) {
        tempId = 1;
      } else {
        tempId = this.qlist[this.qlist.length - 1].id + 1;
      }
      this.qlist.push({
        id: tempId,
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
          const newData = { ...e };
          newData.id -= 1;
          return newData;
        }
        return e;
      });
      this.onClickSelectSection(1);
    },
    deleteQuestion(id) {
      this.qlist = this.qlist.filter((e) => e.id !== id);
    },
    onChange(id, type) {
      const indexObject = this.qlist.findIndex((value) => value.id === id);
      this.qlist[indexObject].questionData = this.prototype[type];
    },
    async callApi() {
      this.isLoading = true;
      const questionsApi = await api
        .examList(this.$route.params.eid)
        .then((res) => res.data);
      this.qlist = api.reverse(questionsApi);
      this.sectionCalo();
      this.isLoading = false;
    },
    sectionCalo() {
      const list = this.qlist.map((data) => data.sectionId);
      const result = list.filter((v, i) => list.indexOf(v) === i);
      if (result.length !== 0) {
        this.sectionlist = result.map((v) => ({
          id: v,
          sectionName: `Section ${v}`,
        }));
      }
      //  eslint-disable no-nested-ternary
      this.sectionlist.sort((a, b) => {
        if (a.id > b.id) return 1;

        if (b.id > a.id) return -1;
        return 0;
      });
      // this.sectionlist.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
    },
  },
  created() {
    this.callApi();
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
    qlist() {
      this.$emit('update:qlist', this.qlist);
    },
  },
};
</script>
