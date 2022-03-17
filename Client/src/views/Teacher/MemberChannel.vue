<template>
    <div>
        <Header 
            main="Exam channel" current="> Inside channel > Member"
        >
            <button
                @click="onClickBack"
                class="mt-3 mr-3 bg-white border-orange-200 border border-solid rounded-lg px-4 py-3 font-semilight text-mainColor"
            >
                Back
            </button>
        </Header>
        <MemberTable/>
    </div>
</template>

<script>
import Header from '@/components/Header/Header';
import MemberTable from '@/components/Form/ChannelForm/MemberTable';

export default {
    name: 'MemberChannel',
    components: {
        Header,
        MemberTable,
    },
    methods: {
        onClickBack() {
            this.$router.push({ name: "InsideChannelTeacher" }).catch(() => true);
        },
    },
};
</script>