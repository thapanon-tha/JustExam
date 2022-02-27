<template>
  <div class="flex flex-col justify-center w-3/5">
    <div
      class="flex flex-col justify-center bg-subColor
             border rounded-xl border-solid border-editorColor"
    >
      <div class="flex flex-col justify-center ">
        <div
          v-for="(item, index) in qlist" :key="index"
          class="bg-white shadow-sm border rounded-xl
                  border-editorColor mt-10 ml-10 mr-10"
        >
          <div class="flex flex-row justify-center mt-5 ml-10 mr-10 mb-10">
            <MultipleChoice v-model="item.data" v-if="item.type === 'mc'"/>
            <ShortAnswer v-model="item.data" v-if="item.type === 'sa'" />
            <Paragraph v-model="item.data" v-if="item.type === 'pa'" />
            <TrueFalse v-model="item.data" v-if="item.type === 'tf'"/>
            <Matching v-model="item.data" v-if="item.type === 'ma'"/>
            <CodingQuestion v-model="item.data" v-if="item.type === 'ca'"/>
            <div class="flex flex-col ml-10 mt-10">
              <select
                class=" border rounded-md border-solid border-mainColor
                        border-opacity-40 bg-white px-8 py-3
                      text-mainColor font-semilight"
                id="type"
                name="type"
                v-model="item.type"
              >
                <option
                  v-for="(item, indexO) in questionTypeOptionList" :key="indexO"
                  :value="item.value"
                >
                  {{item.name}}
                </option>
              </select>
              <ActionButton
                class="mt-3 bg-white border-orange-200
                    border border-solid rounded-lg px-3 py-3
                    font-semilight text-mainColor"
                name="Copy exam"
                @on-click="copyQuestion(index)"
              />
              <ActionButton
                class="mt-3 bg-white border-orange-200
                        border border-solid rounded-lg px-4 py-3
                        font-semilight text-mainColor"
                name="Delete"
                @on-click="deleteQuestion(index)"
              />
            </div>
          </div>
        </div>
      </div>
      <ActionButton
        class="  mt-10 ml-13 mr-13 mb-10 bg-white
                border-orange-200 border border-solid
                rounded-lg px-3 py-2 font-semilight
                text-mainColor"
        name="+ Add a question"
        @on-click="addQuestion"
      />
    </div>
    <div class="flex flex-row-reverse gap-10 mt-10">
      <ActionButton
        class="bg-white border-orange-200
                border border-solid rounded-lg px-6 py-4
                font-semilight text-grayColor"
        name="Cancle"
        @on-click="onClickCancel()"
      />
      <ActionButton
        class="ml-10 bg-white border-orange-200
              border border-solid rounded-lg px-6
              py-4 font-semilight text-mainColor"
        name="Create"
        @on-click="onClickCreate()"
      />
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
      qlist: [
        {
          id: 1,
          type: 'mc',
          data: 'dwd',
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
          name: 'True/Falsee',
          value: 'tf',
        },
        {
          name: 'Matching',
          value: 'ma',
        },
        {
          name: 'Code',
          value: 'ca',
        },
      ],
    };
  },
  methods: {
    addQuestion() {
      this.qlist.push(
        {
          id: this.qlist.length + 1,
          type: 'mc',
          data: '',
        },
      );
    },
    copyQuestion(index) {
      console.log(this.qlist[index]);
    },
    deleteQuestion(index) {
      this.qlist.splice(index, 1);
    },
    onClickCancel() {
      this.$router.push({ name: 'YourExam' }).catch(() => true);
    },
    onClickCreate() {
      // Integrate with API with form validator
      console.log(this.qlist);
    },
  },
};

</script>
