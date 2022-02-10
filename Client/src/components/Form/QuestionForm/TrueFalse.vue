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
            <div  class="flex flex-row">
                <div class="border-mainColor border-l-4 mb-3 px-9">
                    <h1 class="ml-4">True</h1>
                </div>
                <div class="ml-20">
                    <CheckboxForm
                        textCheckbox="correct"
                    />
                </div>
        
            </div>
            <div  class="flex flex-row">
                <div class="border-mainColor border-l-4 mb-3 px-8">
                    <h1 class="ml-4 mr-1">False</h1>
                </div>
                <div class="ml-20">
                    <CheckboxForm
                        textCheckbox="correct"
                    />
                </div>
            
            </div>
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
  name: 'TrueFalse',
  components: {
    QuillTextEditor,
    ActionButton,
    CheckboxForm,
    SelectQuestion,
  },
  data() {
    return {
      data: {
        question: '',
        answers: [],
      },
      tfvalue: [
            {
                id: 'true',
                name: 'True', 
            },
            {
                id: 'false',
                name: 'False', 
            },
        ],
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
// Solve True/ Flase text Data
</script>

