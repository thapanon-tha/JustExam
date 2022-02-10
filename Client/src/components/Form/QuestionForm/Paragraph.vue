<template>
  <div class="flex justify-center">
    <form class="bg-white shadow-sm border rounded-xl border-editorColor mt-10">
    <div class="ml-10 mr-10 mt-10 mb-10"> 
      <div class="flex justify-center gap-5 mb-20">
        <div class="border-l-4 border-mainColor h-10">
          <QuillTextEditor
            placeholder="Question"
            theme="snow"
            width="8/9"
            height="40"
            v-model="data.question"
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
    </div>
    </form>
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';
import SelectQuestion from '@/components/Form/QuestionForm/SelectQuestion.vue';
import ActionButton from '@/components/Button/ActionButton.vue';

export default {
  name: 'Paragraph',
  components: {
    QuillTextEditor,
    SelectQuestion,
    ActionButton,
  },
  data() {
    return {
      loop: 1,
      data: {
        question: '',
        keys: [],
      },
    };
  },
  methods: {
    onClickDelete() {
      console.log('Delete');
    },
    onClickAdd() {
      console.log(this.data);
    },
  },
};
</script>
