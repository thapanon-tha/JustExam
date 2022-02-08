<template>
  <div>
    <div class="quill-wrap flex flex-row">
      <div class="border-l-4 border-mainColor h-10"></div>
      <quill-editor
        :class="{[`w-${width}`]: width,
                 [`h-${height}`]: height}"
        ref="myQuillEditor"
        :options="editorOption"
        @change="onChange($event)"
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
      value: '',
      editorOption: {
        readOnly: true,
        theme: 'bubble',
        placeholder: this.placeholder,
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
    onChange(event) {
      this.$emit('input', event.html);
    },
  },
};
</script>
