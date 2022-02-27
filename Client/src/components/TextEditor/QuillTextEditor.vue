<template>
  <div>
    <div class="quill-wrap flex flex-row">
      <quill-editor
        class="bg-white"
        :class="{[`w-${width}`]: width,
                 [`h-${height}`]: height}"
        ref="myQuillEditor"
        :options="editorOption"
        v-model="content"
        @change="onChange()"
      />
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default {
  components: { quillEditor },
  props: {
    placeholder: {
      type: String,
      default: 'Text',
    },
    theme: {
      type: String,
      default: 'snow',
    },
    width: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      content: '',
      editorOption: {
        readOnly: true,
        placeholder: this.placeholder,
        theme: this.theme,
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
  methods: {
    onChange() {
      this.$emit('input', this.content);
      // this.$emit('input', content.html);
    },
  },
};

</script>
