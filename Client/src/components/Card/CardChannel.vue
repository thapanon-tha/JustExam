<template>
    <div>
        <div class="flex flex-col">
            <label class="text-xl font-semilight">
                Title
            </label>
            <div class="mt-1 box-border h-40 w-60 p-4 rounded-xl text-white bg-gradient-to-tl from-gray-800 via-gray-800 to-orange-700"> 
                <section class="border-r-4 rounded-md border-red-600">
                    <div class="mb-10 gap-20">
                        <h1 class="text-md font-semilight">Title</h1>
                        <div class="mt-15">
                            <h2 class="text-md font-semilight">Date</h2>
                            <h2 class="text-md font-semilight">Time</h2>
                        </div>
                        
                    </div>
                </section>
            
            </div>
        </div>
    </div>
    
</template>

<script>

export default {
    name: 'CardChannel',
    data() {
    },
    props: {
        to: {
            type: String,
            default: 'ExamChannelTeacher',
        },
    },
    methods: {
        //background: linear-gradient(109.42deg, rgba(255, 0, 0, 0.2) 1.04%, rgba(0, 0, 0, 0) 100%), #3F454C; 

    },
    props: [],
};
</script>