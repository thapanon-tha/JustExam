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
            <main-button
            name='Sign up for teacher'
            to="TeacherSignUp"
            ></main-button>
        </div>
        <div>
            <role-element
            v-for="topic in topics2"
            :key="topic.id"
            :id="topic.id"
            :topic-name="topic.title"
            :description="topic.description"
            ></role-element>
            <main-button
            name='Sign up for student'
            to="StudentSignUp"
            ></main-button>
        </div>
    </ul>
</template>

<script>
import RoleElement from '@/components/signup/RoleElement';
import MainButton from '@/components/Button/MainButton';
export default {
    components: {
        RoleElement,
        MainButton
    },
    inject: ['topics', 'topics2'],
    // emits: ['reveal-text'],
};
</script>