<template>
    <li class="text-center mt-20">
        <h3 class="text-5xl font-light text-gray-900">{{ topicName }}</h3>
        <div class="font-light mt-6 mb-10">
            <p>{{ description }}</p>
        </div>
    </li>
</template>

<script>
export default {
    props: ['id', 'topicName', 'description'],    
};
</script>