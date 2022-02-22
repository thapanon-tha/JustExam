<template>
    <div class="flex justify-center">
        <section class="bg-white shadow-sm border rounded-xl border-editorColor flex justify-center">
            <div class="flex flex-col ml-10 mr-10 mt-10 mb-10 "> 
                <h1 class="text-mainColor font-semilight text-l mb-3">{{ no }}</h1>
                <div class="flex flex-row">
                    <div>
                        <div v-if="type === 'multi'">
                            <MultipleChoice/>
                        </div>
                        <div v-else-if="type === 'short'">
                            <ShortAnswer/>
                        </div>
                        <div v-else-if="type === 'para'">
                            <Paragraph/>
                        </div>
                        <div v-else-if="type === 'tf'">
                            <TrueFalse/>
                        </div>
                        <div v-else-if="type === 'match'">
                            <Matching/>
                        </div>
                        <div v-else-if="type === 'code'">
                            <CodingQuestion/>
                        </div>
                        
                    </div>
                    <div class="flex justify-center mb-20 ml-10">
                        <div class="flex flex-col">
                            <div>
                                <select 
                                    class="border rounded-md border-solid border-mainColor 
                                            border-opacity-40 bg-white px-8 py-3
                                            text-mainColor font-semilight"
                                    id="type" name="type" v-model="type" @click="clickSelect()"
                                >
                                    <option value="multi">Multiple Choice</option>
                                    <option value="short">Short Answer</option>
                                    <option value="para">Paragraph</option>
                                    <option value="tf">True/False</option>
                                    <option value="match">Matching</option>
                                    <option value="code">Coding</option>
                                </select>
                            </div>
                            <ActionButton
                                class="mt-3 bg-white border-orange-200
                                    border border-solid rounded-lg px-3 py-3
                                    font-semilight text-mainColor"
                                name="Copy exam"
                                @on-cick="copyQuestion"
                            />
                            <ActionButton
                                class="mt-3 bg-white border-orange-200
                                    border border-solid rounded-lg px-4 py-3
                                    font-semilight text-mainColor"
                                name="Delete"
                                @on-cick="$emit('delete')"
                            />
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    </div>
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';
import MultipleChoice from '@/components/Form/QuestionForm/MultipleChoice';
import ShortAnswer from '@/components/Form/QuestionForm/ShortAnswer.vue';
import Paragraph from '@/components/Form/QuestionForm/Paragraph.vue';
import Matching from '@/components/Form/QuestionForm/Matching.vue';
import TrueFalse from '@/components/Form/QuestionForm/TrueFalse.vue';
import CodingQuestion from '@/components/Form/QuestionForm/CodingQuestion';

export default {
    name: 'QuestionList',
    components: {
        MultipleChoice,
        ShortAnswer,
        Paragraph,
        Matching,
        TrueFalse,
        CodingQuestion,
        QuillTextEditor,
        ActionButton,
        CheckboxForm,
    },
    emits: ['delete'],
    data() {
        return {
            type: 'multi'
        };
    },
    methods: {
        //
    },
};

</script>

