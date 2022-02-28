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
                class="bg-subColor border-orange-200
                border border-solid rounded-lg px-10 py-3
                font-semilight text-mainColor"
                name='Sign up for teacher'
                @on-click="onClick('TeacherSignUp')"
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
                class="bg-subColor border-orange-200
                border border-solid rounded-lg px-10 py-3
                font-semilight text-mainColor"
                name='Sign up for student'
                @on-click="onClick('StudentSignUp')"
              />
        </div>
    </ul>
</template>

<script>
import RoleElement from '@/components/Element/RoleElement.vue';
import ActionButton from '@/components/Button/ActionButton.vue';

export default {
  components: {
    RoleElement,
    ActionButton,
  },
  inject: ['topics', 'topics2'],
  methods: {
    onClick(to) {
      this.$router.push({ name: to }).catch(() => true);
    },
  },
};
</script>
