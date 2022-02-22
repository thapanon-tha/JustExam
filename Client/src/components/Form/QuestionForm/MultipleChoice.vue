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
    <div  class="flex flex-row ml-3" v-for="(item, index) in answers" :key="item.id" :option="item.option">
      <div class="shadow-sm border-mainColor border-l-4 mb-3">
        <QuillTextEditor
          class="bg-mainColor"
          :placeholder="`Option ${index + 1}`"
          theme="bubble"
          width="96"
          height="2/4"
          :name="`answers[${index}][option]`"
          v-model="item.option"
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
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';

export default {
  name: 'MultipleChoice',
  components: {
    QuillTextEditor,
    ActionButton,
    CheckboxForm,
  },
  props: {

    no: {
          type: String,
          default: 'no'
        },
  },
  emits: ['delete'],
  data() {
    return {
      question: '',
      answers: [
        {
          id: 1,
          option: "A",
        },
      ],
      nextChoiceId: 2,
    };
  },
  methods: {
    addChoice() {
      this.answers.push(
        {
          id: this.nextChoiceId++,
          option: this.option,
        }
      );
    },
    deleteChoice(index) {
      console.log('Delete this index', index);
      console.log(this.answers);   
      console.log('Deleting value', this.answers[index]);  
      this.answers.splice(index, 1);
    },

    
  },

};

</script>

