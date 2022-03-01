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
    <div  class="flex flex-col ml-3" >
      <div
        class="flex flex-row mb-3"
      >
        <div class="border-mainColor border-l-4 mb-3 px-4 py-2 w-40 "> Is this correct ? </div>
        <div class="ml-20 mt-2" >
          <CheckboxForm
            v-model="questionData.correct"
            label="True or False"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';

export default {
  name: 'TrueFalse',
  components: {
    QuillTextEditor,
    CheckboxForm,
  },
  prop: ['value'],
  data() {
    return {
      questionData: this.value
    };
  },
  methods: {
    onChange() {
      this.$emit('input', this.questionData);
    },
  },
};

</script>
