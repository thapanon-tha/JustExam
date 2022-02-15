<template>
  <div class="flex justify-center">
    <form class="bg-white shadow-sm border rounded-xl border-editorColor mt-10">
    <div class="ml-10 mr-10 mt-10 mb-10"> 
      <div class="flex justify-center gap-5 mb-20">
        <div class="border-l-4 border-mainColor h-10">
          <QuillTextEditor
            placeholder="Main Question"
            theme="snow"
            width="8/9"
            height="40"
            v-model="data.mainquestion"
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
      <div  class="flex flex-row" v-for="(item, index) in loop" :key="index">
        <div class="shadow-sm border-mainColor border-l-4 mb-3 ">
          <QuillTextEditor
            class="bg-mainColor"
            :placeholder="`Sub-question ${index + 1}`"
            theme="bubble"
            width="80"
            height="2/4"
            v-model="data.subquestion[index]"
        />
        </div>
        <div class="shadow-sm border-mainColor border-l-4 ml-10 mb-3">
          <QuillTextEditor
            class="bg-mainColor"
            :placeholder="`Matched Answer ${index + 1}`"
            theme="bubble"
            width="80"
            height="2/4"
            v-model="data.matchanswer[index]"
        />
        </div>
        <div class="ml-20">
          <button @click="onClickDelete" class="text-mainColor">x</button>
        </div>
      </div>
      <ActionButton
        class="mt-3 bg-subColor border-orange-200
                border border-solid rounded-lg px-3 py-2
                font-semilight text-mainColor"
        name="+ Add a match"
        :on-click="onClickAdd"
      />
    </div>
    </form>
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';
import SelectQuestion from '@/components/Form/QuestionForm/SelectQuestion.vue';

export default {
  name: 'Matching',
  components: {
    QuillTextEditor,
    ActionButton,
    CheckboxForm,
    SelectQuestion,
  },
  data() {
    return {
      loop: 3,
      data: {
        mainquestion: '',
        subquestion: [],
        matchanswer: [],
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

