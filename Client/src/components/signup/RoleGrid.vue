<template>
    <ul class="flex justify-center gap-48 mb-40">
        <div>
            <role-element
              v-for="topic in topics"
              :key="topic.id"
              :id="topic.id"
              :topic-name="topic.title"
              :description="topic.description"
              ></role-element>
              <ActionButton
                name='Sign up for teacher'
                to="TeacherSignUp"
              />
        </div>
        <div>
            <role-element
              v-for="topic in topics2"
              :key="topic.id"
              :id="topic.id"
              :topic-name="topic.title"
              :description="topic.description"
              ></role-element>
              <ActionButton
                name='Sign up for student'
                to="StudentSignUp"
              />
        </div>
    </ul>
</template>

<script>
import RoleElement from '@/components/signup/RoleElement.vue';
import ActionButton from '@/components/Button/ActionButton.vue';

export default {
  components: {
    RoleElement,
    ActionButton,
  },
  inject: ['topics', 'topics2'],
  // emits: ['reveal-text'],
};
</script>
