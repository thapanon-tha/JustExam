<template>
    <ul>
        <knowledge-element
            v-for="topic in topics"
            :key="topic.id"
            :topic-name="topic.title"
            :description="topic.description"
        ></knowledge-element>
    </ul>
</template>

<script>
export default {
    inject: ['topic'],
}
</script>