<template>
    <div>
            <div class="flex flex-row mt-5 justify-center">
                <div
                    class="
                        bg-subColor
                        border-orange-200 border border-solid
                        rounded-xl
                        shadow-sm
                        font-semilight
                        text-mainColor
                        mr-2
                        "
                    v-for="(section, index) in sectionlist"
                    :key="index"
                >
                    <div class="flex flex-row" @click="onClickSelectSection(section.id)">
                        <div class="pt-3 pl-3 pr-3">
                            <p>Section {{ index + 1 }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div 
                class="flex flex-col w-screen gap-5 ml-64 mt-5" 
                v-for="item in questionList"
                :key="item.id"
            >
                <div 
                    class="bg-subColor border border-orange-200 rounded-xl w-4/6"
                >
                    <PreMultiple
                    v-if="item.type === 'mc'"
                    :value="item.questionData"
                    />
                    <PreShortAns
                    v-if="item.type === 'sa'"
                    :value="item.questionData"
                    />
                    <PreParagraph
                    v-if="item.type === 'pa'"
                    :value="item.questionData"
                    />
                    <PreTrueFalse
                    v-if="item.type === 'tf'"
                    :value="item.questionData"
                    />
                    <PreMatching
                    v-if="item.type === 'ma'"
                    :value="item.questionData"
                    />
                    <PreCoding
                    v-if="item.type === 'ca'"
                    :value="item.questionData"
                    />
                </div>
            </div>
    </div>
</template>

<script>
import PreMultiple from '@/components/Form/PreviewForm/PreMultiple';
import PreShortAns from '@/components/Form/PreviewForm/PreShortAns';
import PreParagraph from '@/components/Form/PreviewForm/PreParagraph';
import PreMatching from '@/components/Form/PreviewForm/PreMatching';
import PreCoding from '@/components/Form/PreviewForm/PreCoding';
import PreTrueFalse from '@/components/Form/PreviewForm/PreTrueFalse';

export default {
    name: 'PreviewList',
    components: {
        PreMultiple,
        PreShortAns,
        PreParagraph,
        PreMatching,
        PreCoding,
        PreTrueFalse,
    },
    data() {
        return {
            selectedSectionId: 1,
            sectionlist: [
                {
                    id: 1,
                    sectionName: "Section 1",
                },
                {
                    id: 2,
                    sectionName: "Section 2",
                },
                {
                    id: 3,
                    sectionName: "Section 3",
                },
            ],
            qlist: [],
            answermatchlist: [],
        };
    },
    methods: {
        onClickSelectSection(id) {
            this.selectedSectionId = id;
            console.log(this.selectedSectionId);
        },
    },
    computed: {
        questionList() {
            return this.qlist.filter(
                (question) => question.sectionId === this.selectedSectionId
            );
        },
    },
    mounted() {
         this.qlist = [
                {
                    id: 1,
                    type: "mc",
                    sectionId: 1,
                    questionData: {
                        question: "Q 1",
                        answers: [
                        {
                            id: 1,
                            optionData: "ans 1",
                            correct: false,
                        },
                        ],
                    },
                },
                {
                    id: 2,
                    type: "mc",
                    sectionId: 2,
                    questionData: {
                        question: "Q 2",
                        answers: [
                        {
                            id: 1,
                            optionData: "ans 2",
                            correct: false,
                        },
                        ],
                    },
                },
                {
                    id: 3,
                    type: "mc",
                    sectionId: 3,
                    questionData: {
                        question: "Q 3",
                        answers: [
                        {
                            id: 1,
                            optionData: "ans 3",
                            correct: false,
                        },
                        ],
                    },
                },
                {
                    id: 4,
                    type: "mc",
                    sectionId: 1,
                    questionData: {
                        question: "Q 4",
                        answers: [
                        {
                            id: 1,
                            optionData: "ans 4",
                            correct: false,
                        },
                        ],
                    },
                },
                {
                    id: 5,
                    type: "sa",
                    sectionId: 3,
                    questionData: {
                        question: "Describe Game in one word",
                        answer: "",
                    },
                },
                {
                    id: 6,
                    type: "pa",
                    sectionId: 2,
                    questionData: {
                        question: "Describe Prayut",
                        answer: "",
                    },
                },
                {
                    id: 7,
                    type: "mc",
                    sectionId: 1,
                    questionData: {
                        question: "What is Game favorite Food ?",
                        answers: [
                            {
                                id: 1,
                                optionData: "Suki Yaki",
                                correct: false,
                            },
                            {
                                id: 2,
                                optionData: "Moo kra tha",
                                correct: false,
                            },
                        ],
                    },
                },
                {
                    id: 8,
                    type: "ca",
                    sectionId: 3,
                    questionData: {
                        lang: "C#",
                        code: "",
                        question: "Please write C# ",
                        input: "Input feild",
                        output: "Output feild",
                        example: [
                            {
                                id: 1,
                                xampleinput: "ex input feild",
                                xampleoutput: "ex output feild",
                            },
                        ],
                    },
                },
                {
                    id: 9,
                    type: "ma",
                    sectionId: 2,
                    questionData: {
                        question: "Please select the match answer",
                        matchs: [
                            {
                                id: 1,
                                subquestion: "Who is New girlfriend ?",
                                matchanswer: "Game",
                            },
                            {
                                id: 2,
                                subquestion: "A?",
                                matchanswer: "B",
                            },
                        ],
                    },
                },
                {
                    id: 10,
                    type: "tf",
                    sectionId: 3,
                    questionData: {
                        question: "Is New a tree ?",
                        true: false,
                        false: false,
                        },
                }
            ]
        this.answermatchlist = qlist.map((data)=> {
            if (data.type == 'ma') {
                return {
                    id: data.id,
                    type: data.type,
                    sectionId: data.sectionId,
                    matchanswerlist: data.questionData.map((questionData) => {
                        return questionData.matchanswer
                    })
                }
            }
        })
        console.log(this.answermatchlist);
    }

};

</script>