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
    path: '/examchannel/:cid',
    name: 'InsideChannelTeacher',
    component: () => import('@/views/Teacher/InsideChannelTeacher.vue'),
  },
  {
    path: '/examchannel/test-channel-1/member',
    name: 'MemberChannel',
    component: () => import('@/views/Teacher/MemberChannel.vue'),
  },
  {
    path: '/examchannel/test-channel-1/summary',
    name: 'ExamSummary',
    component: () => import('@/views/Teacher/ExamSummary.vue'),
  },
  {
    path: '/examchannel/test-channel-1/summary/feedback',
    name: 'GradeStudentExam',
    component: () => import('@/views/Teacher/GradeStudentExam.vue'),
  },
  {
    path: '/examchannel/new-channel/score-exam',
    name: 'ScoreExamPage',
    component: () => import('@/views/Teacher/ScoreExamPage.vue'),
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
    path: '/yourexam/new-exam/preview',
    name: 'PreviewExam',
    component: () => import('@/views/Teacher/PreviewExam.vue'),
  },
  {
    path: '/yourexam/:eid',
    name: 'InsideYourExam',
    component: () => import('@/views/Teacher/InsideYourExam.vue'),
  },
  {
    path: '/yourexam/edit-exam',
    name: 'EditExam',
    component: () => import('@/views/Teacher/EditExam.vue'),
  },
  {
    path: '/examhub',
    name: 'ExamHubTeacher',
    component: () => import('@/views/Teacher/ExamHubTeacher.vue'),
  },
  {
    path: '/examchannelstudent',
    name: 'ExamChannelStudent',
    component: () => import('@/views/Student/ExamChannelStudent.vue'),
  },
  {
    path: '/examchannel/:cid/OnExam',
    name: 'ExamChannelOnExam',
    component: () => import('@/views/Student/ExamChannelOnExam.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
