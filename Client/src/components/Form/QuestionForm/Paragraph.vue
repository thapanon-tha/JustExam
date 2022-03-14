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
  </div>
</template>

<script>
import QuillTextEditor from "@/components/TextEditor/QuillTextEditor.vue";

export default {
  name: "Paragraph",
  components: {
    QuillTextEditor,
  },
  props: ["value"],
  data() {
    return {
      questionData: this.value,
    };
  },
  methods: {
    onChange() {
      this.$emit("input", this.questionData);
    },
  },
};
</script>
