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
          :onChangeFunc="onChange"
        />
      </div>
    </div>
    <div  class="flex flex-col ml-3" >
      <div
        class="flex flex-row mb-3"
      >
        <div class="ml-2" >
          <Checkbox2
            v-model="questionData.true"
            label="True"
            text="True"
            @onChange="onChange()"
            :onChangeFunc="onChange"
          />
          <Checkbox2
            v-model="questionData.false"
            label="False"
            text="False"
            @onChange="onChange()"
            :onChangeFunc="onChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor.vue';
import Checkbox2 from '@/components/Form/Checkbox2.vue';

export default {
  name: 'TrueFalse',
  components: {
    QuillTextEditor,
    Checkbox2,
  },
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },
  methods: {
    onChange() {
      this.$emit('input', this.questionData);
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  created() {
  },
};

</script>
