<template>
  <div>
    <div class="flex justify-center mb-52">
      <div class="border-l-4 border-mainColor h-10">
        <QuillTextEditor
          placeholder="Main Question"
          theme="snow"
          width="8/9"
          height="40"
          v-model="questionData.question"
          :onChangeFunc="onChange"
        />
      </div>
    </div>
    <div
      v-for="(item, index) in questionData.matchs" :key="item.id"
      class= "mb-5 ml-3"
    >
      <div class="flex justify-start">
        <div class="shadow-sm border-mainColor border-l-4 mb-3 ">
          <QuillTextEditor
            :placeholder="`Sub-question ${index + 1}`"
            theme="bubble"
            width="96"
            height="2/4"
            :name="`match[${index}][subquestion]`"
            v-model="item.subquestion"
            @change="onChange()"
            :onChangeFunc="onChange"
          />
        </div>
        <div class="ml-20">
          <ActionButton
            class="text-mainColor"
            name="x"
            @on-click="deleteMatch(index)"
          />
        </div>
      </div>
      <div class="flex justify-start">
        <div class="shadow-sm border-mainColor border-l-4 mb-3">
          <QuillTextEditor
            :placeholder="`Matched Answer ${index + 1}`"
            theme="bubble"
            width="96"
            height="2/4"
            :name="`match[${index}][matchanswer]`"
            v-model="item.matchanswer"
            @change="onChange()"
            :onChangeFunc="onChange"
          />
        </div>
      </div>
    </div>
    <ActionButton
      class="mt-3 ml-3 bg-subColor border-orange-200
            border border-solid rounded-lg px-3 py-2
            font-semilight text-mainColor"
      name="+ Add a match"
      @on-click="addMatch"
    />
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor.vue';
import ActionButton from '@/components/Button/ActionButton.vue';

export default {
  name: 'Matching',
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
    addMatch() {
      this.questionData.matchs.push(
        {
          id: this.questionData.matchs.length + 1,
          subquestion: '',
          matchanswer: '',
        },
      );
    },
    deleteMatch(index) {
      this.questionData.matchs.splice(index, 1);
    },
    onChange() {
      this.$emit('input', this.questionData);
    },
  },
  model: {
    prop: 'value', // บอกว่า v-model ให้เข้า value
    event: 'input', // บอกว่า event ที่จะยิงออกไปหาคือตอน blur
  },
  created() {
    console.log(this.value);
  },

};

</script>
