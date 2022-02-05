<template>
  <div>
    <knowledge-grid />
  </div>

</template>

<script>
import KnowledgeGrid from '@/components/home/KnowledgeGrid.vue';

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
          description: 'A Web Application For An Online Exam.',
          fullText:
            'Just Exam is a web application for an online exam that helps a teacher arrang an exam and helps a student take an exam remotely.',
        },
      ],
      topics2: [
        {
          id: 'teacher',
          title: 'For Teacher',
          description: 'All features for teacher on Just Exam.',
          fullText:
            `Vue is a great framework and it has a couple of key concepts: Data binding, 
            events, components and reactivity - that should tell you something!`,
        },
      ],
      topics3: [
        {
          id: 'student',
          title: 'For Student',
          description: 'All features for student on Just Exam.',
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
      topics3: this.topics3,
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
