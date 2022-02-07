<template>
  <div class="quill-wrap">
    <quill-editor 
    v-model="content" 
    ref="myQuillEditor" 
    :options="editorOption" 
    class="bg-white"
    > </quill-editor>
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
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video'],
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

