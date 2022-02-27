<template>
  <div class="flex justify-center">
    <section class="bg-white shadow-sm border rounded-xl border-editorColor mt-10">
    <div class="ml-10 mr-10 mt-10 mb-10">
      <h1 class="text-mainColor font-semilight text-l mb-3">{{ no }}</h1>
      <div class="flex justify-center gap-5 mb-20">
        <div class="border-l-4 border-mainColor h-10">
          <QuillTextEditor
            placeholder="Question"
            theme="snow"
            width="8/9"
            height="40"
            v-model="question"
          />
        </div>
        <div class="flex flex-col">
          <SelectQuestion
          />
          <ActionButton
            class="mt-3 bg-white border-orange-200
                  border border-solid rounded-lg px-4 py-3
                  font-semilight text-mainColor"
            name="Copy exam"
          />
          <ActionButton
            class="mt-3 bg-white border-orange-200
                  border border-solid rounded-lg px-4 py-3
                  font-semilight text-mainColor"
            name="Delete"
          />
        </div>
      </div>
      <div  class="flex flex-row" v-for="(answer, index) in answersOption" :key="index">
        <div class="shadow-sm border-mainColor border-l-4 mb-3 ">
          <QuillTextEditor
            :name="`answersOption[${index}][value]`"
            class="bg-mainColor"
            :placeholder="`Option ${index + 1}`"
            theme="bubble"
            width="80"
            height="2/4"
            v-model="answer.value"
        />
        </div>
        <div class="ml-20">
          <CheckboxForm
            textCheckbox="correct"
          />
        </div>
        <div class="ml-20">
          <ActionButton
            class="text-mainColor"
            name="X"
            @on-click="deleteChoice(index)"
          />
        </div>
      </div>

      <ActionButton
        class="mt-3 bg-subColor border-orange-200
                border border-solid rounded-lg px-3 py-2
                font-semilight text-mainColor"
        name="+ Add an option"
        @on-click="addChoice"
      />
    </div>
    </section>
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';
import SelectQuestion from '@/components/Form/QuestionForm/SelectQuestion.vue';

export default {
  name: 'MultipleChoice',
  components: {
    QuillTextEditor,
    ActionButton,
    CheckboxForm,
    SelectQuestion,
  },
  props: {
    no: {
      type: String,
      default: 'no',
    },
  },
  emits: ['delete'],
  data() {
    return {
      question: '',
      answersOption: [],
    };
  },
  methods: {
    deleteChoice(index) {
      if (index > -1) { this.answersOption.splice(index, 1); }
    },
    addChoice() {
      this.answersOption.push({
        value: '',
        correct: false,
      });
    },
  },
  computed: {
    getAnswersOption: () => this.answersOption,
  },
};

</script>
