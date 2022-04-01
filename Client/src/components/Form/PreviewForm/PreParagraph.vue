<template>
    <div class="ml-10 mt-10 mr-10 mb-10">
        <div class="break-words p-3 mb-3">
            {{ questionData.question }}
        </div>
        <textarea 
             class="ml-5 w-5/6 h-40 px-3 py-3 font-semilight text-gray-700 bg-white bg-clip-padding
            border-2 border-solid border-mainColor border-opacity-70 rounded-md transition ease-in-out m-0 
            focus:text-black focus:bg-white focus:mainColor focus:border-opacity-100 focus:outline-none"
            v-model="questionData.answer" 
            placeholder="Type answer here"
        ></textarea>
    </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';

export default {
    name: 'PreParagraph',
    components: {
        QuillTextEditor,
    },
    props: ["value"],
    data() {
        return {
            questionData: this.value,
        };
    },
};
</script>