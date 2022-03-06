import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/contactus',
    name: 'ContactUs',
    component: () => import('@/views/ContactUs.vue'),
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: () => import('@/views/Tutorial.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginT.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
  },
  {
    path: '/signup/teacher',
    name: 'TeacherSignUp',
    component: () => import('@/views/TeacherSignUp.vue'),
  },
  {
    path: '/signup/student',
    name: 'StudentSignUp',
    component: () => import('@/views/StudentSignUp.vue'),
  },
  {
    path: '/examchannel',
    name: 'ExamChannelTeacher',
    component: () => import('@/views/Teacher/ExamChannelTeacher.vue'),
  },
  {
    path: '/examchannel/new-channel',
    name: 'NewChannelTeacher',
    component: () => import('@/views/Teacher/NewChannelTeacher.vue'),
  },
  {
    path: '/examchannel/test-channel-1',
    name: 'InsideChannelTeacher',
    component: () => import('@/views/Teacher/InsideChannelTeacher.vue'),
  },
  {
    path: '/yourexam',
    name: 'YourExam',
    component: () => import('@/views/Teacher/YourExam.vue'),
  },
  {
    path: '/yourexam/new-exam',
    name: 'NewExam',
    component: () => import('@/views/Teacher/NewExam.vue'),
  },
  {
    path: `/yourexam/:eid`,
    name: 'InsideYourExam',
    component: () => import('@/views/Teacher/InsideYourExam.vue'),
  },
  {
    path: '/examhub',
    name: 'ExamHubTeacher',
    component: () => import('@/views/Teacher/ExamHubTeacher.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
