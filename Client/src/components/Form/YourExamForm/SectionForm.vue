<template>
    <div>
        <!-- <div v-for="(buton, index) in buttons" :key="index">
            <ActionButton
                class=" bg-subColor border-orange-200 border border-solid rounded-lg font-semilight text-grayColor px-4 py-3 ml-60"
                name="`Section ${index + 1}`"
                @on-cick="clickSection"
            />
        </div>
        <div>
            <ActionButton
                class=" bg-subColor border-orange-200 border border-solid rounded-lg font-semilight text-grayColor px-4 py-3 ml-60"
                name="+"
                @on-cick="clickSection"
            />
        </div> -->
        <QuestionList/>
    </div>
</template>

<script>
import ActionButton from '@/components/Button/ActionButton.vue';
import QuestionList from '@/components/Form/QuestionForm/QuestionList.vue';

export default {
    name: 'SectionForm',
    components: {
        ActionButton,
        QuestionList,
    },
    data() {

    },
    methods: {
        addSection() {
            //
        },
    },
};
</script>