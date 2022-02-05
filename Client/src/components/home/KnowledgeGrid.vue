<template>
    <ul class="ml-40 mr-40 mt-32">
        <div class="flex justify-between">
            <knowledge-element
            class="mr-15"
            v-for="topic in topics"
            :key="topic.id"
            :id="topic.id"
            :topic-name="topic.title"
            :description="topic.description"
            :text="topic.fullText"
            ></knowledge-element>
            <img
            class="border rounded-md w-64.5 h-96"
            src="https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            />
        </div>
        <div class="flex justify-start mt-56">
            <img
            class="border rounded-md w-64.5 h-96"
            src="https://images.pexels.com/photos/4491477/pexels-photo-4491477.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            />
            <knowledge-element
            class="ml-15"
            v-for="topic in topics2"
            :key="topic.id"
            :id="topic.id"
            :topic-name="topic.title"
            :description="topic.description"
            :text="topic.fullText"
            ></knowledge-element>
        </div>
        <div class="flex justify-between mt-56 mb-56">
            <knowledge-element
            class="mr-15"
            v-for="topic in topics3"
            :key="topic.id"
            :id="topic.id"
            :topic-name="topic.title"
            :description="topic.description"
            :text="topic.fullText"
            ></knowledge-element>
            <img
            class="border rounded-md w-64.5 h-96"
            src="https://images.pexels.com/photos/4144531/pexels-photo-4144531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
        </div>

    </ul>
</template>

<script>
import KnowledgeElement from '@/components/home/KnowledgeElement.vue';

export default {
  components: {
    KnowledgeElement,
  },
  inject: ['topics', 'topics2', 'topics3'],
  // emits: ['reveal-text'],
};
</script>
