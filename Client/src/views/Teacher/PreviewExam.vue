<template>
    <div>
        <Header 
        main="Your exam" current="> Preview Exam"
        >
            <button
                @click="onClickBack"
                class="mt-3 bg-white border-orange-200 border border-solid rounded-lg px-8 py-3 font-semilight text-mainColor"
            >
                Back
            </button>
        </Header>
        <div>
            <div class="ml-60 mt-10">
                <!-- <h1 class="font-semibold text-xl mb-2">Exam title</h1> -->
                <p class="ml-3 font-semibold text-lg text-black w-4/5 break-all">{{ examTitle }}</p>
                <!-- <h1 class="font-semibold text-xl mb-2">Exam description</h1> -->
                <p class="ml-3 font-semibold text-lg text-black  w-4/5 break-all">{{ description }}</p>
            </div>
            <div>
                <PreviewList/>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header/Header';
import PreMultiple from '@/components/Form/PreviewForm/PreMultiple';
import PreShortAns from '@/components/Form/PreviewForm/PreShortAns';
import PreParagraph from '@/components/Form/PreviewForm/PreParagraph';
import PreMatching from '@/components/Form/PreviewForm/PreMatching';
import PreCoding from '@/components/Form/PreviewForm/PreCoding';
import PreTrueFalse from '@/components/Form/PreviewForm/PreTrueFalse';
import PreviewList from '@/components/Form/PreviewForm/PreviewList';

export default {
    name: 'PreviewExam',
    components: {
        Header,
        PreMultiple,
        PreShortAns,
        PreParagraph,
        PreMatching,
        PreCoding,
        PreTrueFalse,
        PreviewList,
    },
    data() {
        return {
            examTitle: 'Exam Title Data',
            description: 'Exam Description Data',
        };
    },
    methods: {
        onClickBack() {
            this.$router.push({ name: "NewExam" }).catch(() => true); 
            //
            //ทำให้กด Back แล้วหน้า New Exam ยัง Save Data
        },
    },
};

</script>