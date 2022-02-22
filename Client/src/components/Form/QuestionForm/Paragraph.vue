<template>
  <div>
    <div class="flex justify-center gap-5 mb-20">
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
  </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';

export default {
  name: 'Paragraph',
  components: {
    QuillTextEditor,
  },

  emits: ['delete'],
  data() {
    return {
      question: '',
    };
  },
  methods: {
    //
  },
};
</script>
