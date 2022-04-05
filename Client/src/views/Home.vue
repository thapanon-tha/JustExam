<template>
  <div>
    <div v-for="topic in topics" :key="topic.id">
      <CardWithPicture
        :title="topic.title"
        :subtitle="topic.description"
        :fullText="topic.fullText"
        to="Test"
        :imageLeft="topic.imageLeft"
      />
    </div>
  </div>
</template>

<script>
import CardWithPicture from "@/components/Card/CardWithPicture.vue";

export default {
  components: {
    CardWithPicture,
  },
  name: "Home",
  data() {
    return {
      topics: [
        {
          id: "justexam",
          title: "Just Exam",
          image:
            "https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          description: "A Web Application For An Online Exam.",
          imageLeft: false,
          fullText: `Just Exam is a web application for an online exam that helps a teacher \n
             arrang an exam and helps a student take an exam remotely.`,
        },
        {
          id: "teacher",
          title: "For Teacher",
          image:
            "https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          description: "All features for teacher on Just Exam.",
          imageLeft: true,
          fullText: `Vue is a great framework and it has a couple of key concepts: Data binding,
            events, components and reactivity - that should tell you something!`,
        },
        {
          id: "student",
          image:
            "https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          title: "For Student",
          description: "All features for student on Just Exam.",
          imageLeft: false,
          fullText: `Vue is a great framework and it has a couple of key concepts: Data binding,
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
