<template>
    <div class="ml-15 mt-10 mr-15 mb-10">
        <div class="mb-5">
            <div class="flex flex-row">
                <p class="font-semibold text-lg">Coding Question:</p>
                <p class="font-semibold text-lg text-mainColor ml-2">{{ lang }}</p>
            </div>
            <div class="p-3 border-l-4 border-mainColor break-words">
                {{ question }}
            </div>
        </div>
        <div class="mb-5">
            <p class="font-semibold text-lg">Expected Input</p>
            <div class="p-3 border-l-4 border-mainColor break-words">
                {{expectedInput }}
            </div>
        </div>
        <div class="mb-5">
            <p class="font-semibold text-lg">Expected Output</p>
            <div class="p-3 border-l-4 border-mainColor break-words">
                {{ expectedOutput }}
            </div>
        </div>
        <div class="mt-10 mb-10 shadow-md border-l-4 border-mainColor">
            <QuillTextEditor
                :placeholder="`Type code here`"
                theme="bubble"
                width="screen"
                height="60"
                v-model="code"
            />
        </div>
        <p class="font-semibold text-lg">Example</p>
        <div class="flex flex-row gap-10">
            <p class="w-80 font-semibold">Testcase input</p>
            <p class="w-80 font-semibold">Testcase output</p>
        </div>
        <div v-for="xample in xamplelist" :key="xample.id" class="mb-5">
            <div class="flex flex-row gap-10">
                <div class="w-80 break-words border-l-4 border-mainColor p-2">
                    {{ xamplelist.xampleInput }}
                </div>
                <div class="w-80 break-words border-l-4 border-mainColor p-2">
                    {{ xamplelist.xampleOutput }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';

export default {
    name: 'PreCoding',
    components: {
        QuillTextEditor,
    },
    data() {
        return {
            lang: 'Python',
            code: '',
            question: 'Question Data',
            expectedInput: 'Example Input Data',
            expectedOutput: 'Example Output Data',
            xamplelist: {
                xampleInput: 'Example Input Data',
                xampleOutput: 'Example Output Data',
            }

        };
    },

};
</script>