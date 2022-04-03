<template>
  <div>
    <div class="flex justify-center gap-5 mb-52">
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
    <div  class="flex flex-row ml-3" v-for="(item, index) in questionData.keylist" :key="item.id">
      <div class="shadow-sm border-mainColor border-l-4 mb-3 ">
        <QuillTextEditor
          class="bg-mainColor"
          :placeholder="`Key answer ${index + 1}`"
          theme="bubble"
          width="60"
          height="2/4"
          :name="`keylist[${index}][keyans]`"
          v-model="item.keyans"
          @change="onChange()"
          :onChangeFunc="onChange"
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
      name="+ Add a key answer"
      @on-click="addKey"
    />
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor.vue';
import ActionButton from '@/components/Button/ActionButton.vue';

export default {
  name: 'ShortAnswer',
  components: {
    QuillTextEditor,
    ActionButton,
  },
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },
  methods: {
    addKey() {
      this.questionData.keylist.push(
        {
          id: this.questionData.keylist.length + 1,
          keyans: '',
        },
      );
    },
    deleteChoice(index) {
      this.questionData.keylist.splice(index, 1);
    },
    onChange() {
      this.$emit('input', this.questionData);
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  created() {
    console.log(this.value);
  },
};

</script>
