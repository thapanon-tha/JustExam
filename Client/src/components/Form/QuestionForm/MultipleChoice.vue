<template>
  <div>
      <QuillEditorComponent
        placeholder="Question"
        height="40"
        width="screen"
        v-model="data.question"
      />
      <div class="flex flex-row" v-for="(item, index) in loop" :key="index">
        <QuillEditorComponent
          :placeholder="`Answer ${index + 1}`"
          width="40"
          height="20"
          v-model="data.answers[index]"
        />
        <CheckboxForm
          textCheckbox="correct"
        />
        <button @click="onClickDelete">x</button>
      </div>
      <ActionButton
        name="Add an option"
        :onClick="onClickAdd"
      />
  </div>
</template>

<script>
import QuillEditorComponent from '@/components/TextEditor/QuillEditorComponent.vue';
// import SelectQuestion from '@/components/Form/SelectQuestion.vue';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';

export default {
  name: 'MultipleChoice',
  components: {
    QuillEditorComponent,
    ActionButton,
    CheckboxForm,
  },
  data() {
    return {
      loop: 3,
      data: {
        question: '',
        answers: [],
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
