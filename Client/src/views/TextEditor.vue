<template>
  <div>
    <text-editor-compo
    ></text-editor-compo>
  </div>
</template>

<script>
import { Quill } from 'vue-quill-editor';
import { ImageExtend } from 'quill-image-extend-module';
import katex from 'katex';
import TextEditorCompo from '@/components/TextEditor/TextEditorCompo.vue';

Quill.register('modules/ImageExtend', ImageExtend);
export default {
  name: 'TextEditor',
  components: { TextEditorCompo },
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
          theme: 'snow',
        },
      },
    };
  },
  // mounted() {
  //   window.katex = katex;
  // },
};
</script>
