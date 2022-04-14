<template>
    <div class="ml-15 mt-10 mr-15 mb-10">
        <div class="mb-5">
            <div>
                <p class="font-semibold text-lg text-mainColor ml-2 text-right"
                >
                    {{ questionData.lang }}
                </p>
                <p class="font-semibold text-lg">Question</p>
            </div>
            <div class="p-3 border-l-4 border-mainColor break-words">
                {{ questionData.question }}
            </div>
        </div>
        <div class="mb-5">
            <p class="font-semibold text-lg">Expected Input</p>
            <div class="p-3 border-l-4 border-mainColor break-words">
                {{ questionData.input }}
            </div>
        </div>
        <div class="mb-5">
            <p class="font-semibold text-lg">Expected Output</p>
            <div class="p-3 border-l-4 border-mainColor break-words">
                {{ questionData.output }}
            </div>
        </div>
        <div>
            <p class="font-semibold text-lg">Code</p>
            <div class="mt-10 mb-10 shadow-md border-l-4 border-mainColor">
                <QuillTextEditor
                    :placeholder="`Type code here`"
                    theme="bubble"
                    width="screen"
                    height="60"
                    v-model="questionData.code"
                />
            </div>
        </div>
        <p class="font-semibold text-lg">Example</p>
        <div class="flex flex-row gap-10">
            <p class="w-80 font-semibold">Testcase input</p>
            <p class="w-80 font-semibold">Testcase output</p>
        </div>
        <div v-for="item in questionData.example" :key="item.id" class="mb-5">
            <div class="flex flex-row gap-10">
                <div class="w-80 break-words border-l-4 border-mainColor p-2">
                    {{ item.xampleinput }}
                </div>
                <div class="w-80 break-words border-l-4 border-mainColor p-2">
                    {{ item.xampleoutput }}
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <input
                class="w-20 p-2 font-semilight text-center text-sm
                text-gray-700 bg-white bg-clip-padding border
                border-solid border-mainColor border-opacity-40
                rounded-md transition ease-in-out m-0 focus:text-black
                focus:mainColor focus:border-opacity-100 focus:outline-none"
                type="number" min="0" v-model="questionData.receivedPoint"
                placeholder="Point"
            >
            <h1 class="text-md">/</h1>
            <div class="text-md">10</div>
        </div>
    </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor.vue';

export default {
  name: 'GradeCoding',
  components: {
    QuillTextEditor,
  },
  props: ['value'],
  data() {
    return {
      questionData: this.value,
    };
  },

};
</script>
