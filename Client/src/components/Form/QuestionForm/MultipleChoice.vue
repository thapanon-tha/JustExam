<template>
  <div>
    <div class="flex justify-center mb-52">
      <div class="border-l-4 border-mainColor h-10">
        <QuillTextEditor
          placeholder="Question"
          theme="snow"
          width="8/9"
          height="40"
          v-model="questionData.question"
          :onChangeFunc=onChange
        />
      </div>
    </div>
    <div v-for="(item, index) in questionData.answers" :key="item.id"
      class="flex flex-row ml-3"
    >
      <div class="shadow-sm border-mainColor border-l-4 mb-3">
        <QuillTextEditor
          class="bg-mainColor"
          :placeholder="`Option ${index + 1}`"
          theme="bubble"
          width="96"
          height="2/4"
          :name="`answers[${index}][optionData]`"
          v-model="item.optionData"
          @change="onChange()"
          :onChangeFunc=onChange
        />
      </div>
      <div class="ml-20">
        <CheckboxForm
          v-model=item.correct
          label="correct"
        />
      </div>
      <div class="ml-20">
        <ActionButton
          class="text-mainColor"
          name="x"
          @on-click="deleteChoice(index)"
        />
      </div>
    </div>
    <ActionButton
      class="mt-3 ml-3 bg-subColor border-orange-200
                  border border-solid rounded-lg px-3 py-2
                  font-semilight text-mainColor"
      name="+ Add an option"
      @on-click="addChoice"
    />
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';

export default {
  name: 'MultipleChoice',
  components: {
    QuillTextEditor,
    ActionButton,
    CheckboxForm,
  },
  data() {
    return {
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
    };
  },
  methods: {
    addChoice() {
      this.questionData.answers.push(
        {
          id: this.questionData.answers.length + 1,
          optionData: '',
          correct: false,
        },
      );
    },
    deleteChoice(index) {
      this.questionData.answers.splice(index, 1);
    },
    onChange() {
      this.$emit('input', this.questionData);
    },
  },

};

</script>
