<template>
    <div class="mb-60">
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
    </div>
</template>

<script>
import Header from '@/components/Header/Header';

export default {
    name: 'ExamSummary',
    components: {
        Header,
    },
    methods: {
        onClickBack() {
            this.$router.push({ name: "InsideChannelTeacher" }).catch(() => true);
        },
    },
};
</script>