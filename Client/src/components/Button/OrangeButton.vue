<template>
    <button @click="clickButton(to)">
        <div 
        class="bg-mainColor border-orange-200 
        border rounded-lg px-8 py-3 
        font-medium text-white"
        >
            {{ name }}
        </div>
    </button>
</template>

<script>

export default {
    name: 'OrangeButton',
    props: {
        name: {
            type: String,
            default: 'Button',
        },
        to: {
            type: String,
            default: ''
        },
    },
    methods: {
        clickButton(pageName) {
            this.$router.push({ name: pageName }).catch(() => {});
        },
    },
};
</script>