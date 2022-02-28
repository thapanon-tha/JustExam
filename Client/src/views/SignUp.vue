<template>
  <div class="mt-20 mb-80 text-center">
    <h1 class="text-6xl font-light">Sign up</h1>
    <role-grid></role-grid>
  </div>

</template>

<script>
import RoleGrid from '@/components/Element/RoleGrid.vue';

export default {
  components: {
    RoleGrid,
  },
  name: 'SignUp',
  data() {
    return {
      topics: [
        {
          id: 'teacher',
          title: 'Teacher',
          description: 'Teacher is a role that can organize the exam.',
        },
      ],
      topics2: [
        {
          id: 'student',
          title: 'Student',
          description: 'Student is a role that can join the exam channel and take the exam.',
        },
      ],
    };
  },
  provide() {
    return {
      topics: this.topics,
      topics2: this.topics2,
    };
  },
};
</script>
