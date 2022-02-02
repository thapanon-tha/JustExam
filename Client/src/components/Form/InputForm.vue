<template>
    <div>
        <div class="mb-3 xl:w-96">
            <label 
                class="form-label inline-block mb-2 
                text-gray-700 
                font-semilight 
                text-xl">
                {{ input_label }}
            </label>
            <input
                type=type
                class="
                    form-control
                    flex w-5/6
                    px-3
                    py-3
                    text-base
                    font-light
                    text-gray-700
                    bg-subColor bg-clip-padding
                    border border-solid border-mainColor border-opacity-40
                    rounded-md
                    transition
                    ease-in-out
                    m-0
                    focus:text-black focus:bg-subColor focus:mainColor focus:border-opacity-100 focus:outline-none"
                :placeholder=input_label
            />
        </div>
    </div>
</template>

<script>

export default {
    name: 'InputForm',
    props: {
        input_label: {
            type: String,
            default: 'Text',
        },
        type: {
            type: String,
            default: 'text',
        }
    },
};
</script>