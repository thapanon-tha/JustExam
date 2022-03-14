<template>
    <div class="ml-10 mt-10 mr-10 mb-10">
        <div class="break-words p-3 mb-3">
            Multiple Choice
        </div>
        <div class="ml-5 break-normal" v-for="choice in choicelist" :key="choice.id">
            <input
            type="checkbox"
            class="h-4 w-4 mr-2"
            v-model="valueCorrect"
            @change="onChange($event)"
            />
            <label class="break-all">
            {{ label }}
            </label>
        </div>
    </div>
</template>

<script>

export default  {
    name: 'PreMultiple',
    props: {
        label: {
            type: String,
            default: 'label',
        },
    },
    data()  {
        return  {
            choicelist: 4,
        };
    },
};

</script>