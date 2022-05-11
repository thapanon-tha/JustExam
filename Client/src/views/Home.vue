<template>
  <div>
    <div v-for="topic in topics" :key="topic.id">
      <CardWithPicture
        :title="topic.title"
        :image="topic.image"
        :subtitle="topic.description"
        :fullText="topic.fullText"
        to="Test"
        :imageLeft="topic.imageLeft"
      />
    </div>
  </div>
</template>

<script>
import CardWithPicture from '@/components/Card/CardWithPicture.vue';

export default {
  components: {
    CardWithPicture,
  },
  name: 'Home',
  data() {
    return {
      topics: [
        {
          id: 'justexam',
          title: 'Just Exam',
          image:
            'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          description: 'Web application for online exams',
          imageLeft: false,
          fullText: `Just Exam is a web application for an online exam that helps a teacher
             arrange an exam and helps a student take an exam remotely.`,
        },
        {
          id: 'teacher',
          title: 'For Teacher',
          image:
            'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          description: 'Features for teacher on Just Exam',
          imageLeft: true,
          fullText: `Teachers can create an exam channel where the online exam will take place.
          In the exam channel, teachers can set the date and time of the exam. They can also 
          create the exam and add to the exam channel.`,
        },
        {
          id: 'student',
          image:
            'https://images.pexels.com/photos/4144144/pexels-photo-4144144.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          title: 'For Student',
          description: 'Features for student on Just Exam',
          imageLeft: false,
          fullText: `Students can join the exam channel via an invite code and take an exam at the required date.`,
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
  mounted() {
    //
  },
};
</script>
