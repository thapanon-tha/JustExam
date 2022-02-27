<template>
    <div>
        <div class="flex justify-center mb-52">
            <div class="border-l-4 border-mainColor h-10">
                <QuillTextEditor
                    placeholder="Type code here"
                    theme="snow"
                    width="8/9"
                    height="40"
                    v-model="codehere"
                />
            </div>
        </div>
        <div class="ml-3">
            <div class="flex justify-start">
                <div class="shadow-sm border-mainColor border-l-4 mb-3 ">
                    <QuillTextEditor
                        :placeholder="`Question`"
                        theme="bubble"
                        width="96"
                        height="2/4"
                        v-model="question"
                    />
                </div>
            </div>
            <div class="flex justify-start">
                <div class="shadow-sm border-mainColor border-l-4 mb-3 ">
                    <QuillTextEditor
                        :placeholder="`Input`"
                        theme="bubble"
                        width="96"
                        height="2/4"
                        v-model="input"
                    />
                </div>
            </div>
            <div class="flex justify-start">
                <div class="shadow-sm border-mainColor border-l-4 mb-3 ">
                    <QuillTextEditor
                        :placeholder="`Output`"
                        theme="bubble"
                        width="96"
                        height="2/4"
                        v-model="output"
                    />
                </div>
            </div>
            <h1 class="mt-5 mb-1">Example</h1>
            <div class="mb-5" v-for="(item, index) in example" :key="item.id" :option="item.xampleinput" :option2="item.xampleoutput">
                
                <div class="flex justify-start">
                    <div class="shadow-sm border-mainColor border-l-4 mb-3">
                        <QuillTextEditor
                            :placeholder="`Testcase Input ${index + 1}`"
                            theme="bubble"
                            width="96"
                            height="2/4"
                            :name="`example[${index}][xampleinput]`"
                            v-model="item.xampleinput"
                        /> 
                    </div>
                    <div class="ml-20">
                        <ActionButton
                            class="text-mainColor flex justify-end"
                            name="x"
                            @on-click="deleteExample(index)"
                        />
                    </div>
                </div>
                <div class="flex justify-start">
                    <div class="shadow-sm border-mainColor border-l-4 mb-3">
                        <QuillTextEditor
                            :placeholder="`Testcase Output ${index + 1}`"
                            theme="bubble"
                            width="96"
                            height="2/4"
                            :name="`example[${index}][xampleoutput]`"
                            v-model="item.xampleoutput"
                        /> 
                    </div>
                </div>
                
                
            
        </div>
        <ActionButton
            class="mt-3 bg-subColor border-orange-200
                    border border-solid rounded-lg px-3 py-2
                    font-semilight text-mainColor"
            name="+ Add an example"
            @on-click="addExample"
        />
        </div>

    </div>             
</template>

<script>
import QuillTextEditor from '@/components/TextEditor/QuillTextEditor';
import ActionButton from '@/components/Button/ActionButton.vue';
import CheckboxForm from '@/components/Form/CheckboxForm.vue';

export default {
    name: 'CodingQuestion',
    components: {
        QuillTextEditor,
        ActionButton,
        CheckboxForm,
    },
    data() {
        return {
            codehere: '',
            question: '',
            input: '',
            output: '',
            example: [
                {
                    id: 1,
                    xampleinput: '',
                    xampleoutput: '',
                },
            ],
            nextChoiceId: 2,
        };
    },
    methods: {
        addExample() {
            this.example.push(
                {
                    id: this.nextChoiceId++,
                    xampleinput: this.xampleinput,
                    xampleoutput: this.xampleoutput,
                }
            );
        },
        deleteExample(index) {
            console.log('Delete this index', index);
            console.log(this.example);   
            console.log('Deleting value', this.example[index]);  
            this.example.splice(index, 1);
        },

        
    },

};

</script>

