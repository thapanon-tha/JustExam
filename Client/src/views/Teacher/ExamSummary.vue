<template>
    <div class="mb-40">
        <Header 
            main="Exam channel" current="> Inside channel > Exam Summary" class="mb-10"
        >
            <button
                @click="onClickBack"
                class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
            >
                Back
            </button>
            <button
                
                class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
            >
                Export score
            </button>
        </Header>
        <SummaryHead/>
        <div class="ml-36 mt-10 w-5/6 p-2 border border-orange-300 rounded-xl text-center">
            <SummaryTable @clickRespone="clickGiveScore" />
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header/Header';
import SummaryTable from '@/components/Form/ChannelForm/SummaryTable';
import SummaryHead from '@/components/Form/ChannelForm/SummaryHead';

export default {
    name: 'ExamSummary',
    components: {
        Header,
        SummaryTable,
        SummaryHead,
    },
    methods: {
        onClickBack() {
            this.$router.push({ name: "InsideChannelTeacher" }).catch(() => true);
        },
        clickGiveScore() {
            this.$router.push({ name: "ScoreExamPage" }).catch(() => true);
        }
    },
};
</script>