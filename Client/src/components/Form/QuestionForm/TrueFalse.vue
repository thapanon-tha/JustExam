<template>
  <div>
    <div class="flex justify-center mb-52">
      <div class="border-l-4 border-mainColor h-10">
        <QuillTextEditor
          placeholder="Question"
          theme="snow"
          width="8/9"
          height="40"
          v-model="question"
        />
      </div>
    </div>
    <div  class="flex flex-col ml-3" >
      <div v-for="item in textValue" :key="item.id" :id="item.id" :text="item.text" class="flex flex-row mb-3" >
        <div class="border-mainColor border-l-4 mb-3 px-4 py-2 w-40 ">
          {{ item.text }}
        </div>
        <div class="ml-20 mt-2" >
          <CheckboxForm
            textCheckbox="correct"
          />
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';

export default {
  name: 'TrueFalse',
  components: {
    QuillTextEditor,
    ActionButton,
    CheckboxForm,
  },
  data() {
    return {
      question: '',
      textValue: [
        {
          id: "true",
          text: "True",
        },
        {
          id: "false",
          text: "False",
        },
      ],
      nextChoiceId: 2,
    };
  },
  methods: {
    //
  },

};

</script>

