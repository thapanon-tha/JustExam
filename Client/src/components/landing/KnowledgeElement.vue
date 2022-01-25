<template>
    <li>
        <h1>{{ topicName }}</h1>
        <p>{{ description }}</p>
        <button>Read more</button>
    </li>
</template>

<script>
export default {
    props: ['id', 'topicName', 'description'],
};
</script>