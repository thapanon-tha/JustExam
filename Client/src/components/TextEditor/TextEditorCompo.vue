<template>
  <div class="quill-wrap">
    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"> </quill-editor>
    <!-- <dev>{{ content }}</dev> -->
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default {
  components: { quillEditor },
  data() {
    return {
      content: '',
      editorOption: {
        readOnly: true,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['formula', 'image', 'video', 'link'],
            ['clean'],
          ],
        },
      },
    };
  },
  mounted() {
    window.katex = katex;
  },
};
</script>
