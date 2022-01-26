<template>
  <div>
    <knowledge-grid
    ></knowledge-grid>
    
  </div>
  
</template>

<script>
import KnowledgeGrid from '@/components/home/KnowledgeGrid';

export default {
  components: {
    KnowledgeGrid,
  },
  name: 'Home',
  data() {
    return {
      topics: [
        {
          id: 'justexam',
          title: 'Just Exam',
          description: 'A Web Application For Online Exam.',
          fullText:
            `Vue is a great framework and it has a couple of key concepts: Data binding, events, 
            components and reactivity - that should tell you something!`,
        },
      ],
      topics2: [
        {
          id: 'teacher',
          title: 'For Teacher',
          description: 'All features on Just Exam.',
          fullText:
            `Vue is a great framework and it has a couple of key concepts: Data binding, 
            events, components and reactivity - that should tell you something!`,
        },
      ],
      topics3: [
        {
          id: 'student',
          title: 'For Student',
          description: 'All features on Just Exam.',
          fullText:
            `Vue is a great framework and it has a couple of key concepts: Data binding, 
            events, components and reactivity - that should tell you something!`,
        },
      ],
    };
  },
  provide() {
    return {
      topics: this.topics,
      topics2: this.topics2,
      topics3: this.topics3
    };
  },
  methods: {
    //
  },
  mounted() {
    // 
  },
};
</script>
