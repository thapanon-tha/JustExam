import Vue from 'vue';
import VueRouter from 'vue-router';
import jwtDecode from 'jwt-decode';
import api from '@/services/apis';
import auth from '@/services/authentications';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {},
  },
  {
    path: '/contactus',
    name: 'ContactUs',
    component: () => import('@/views/ContactUs.vue'),
    meta: {},
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginT.vue'),
    meta: {},
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
    meta: {},
  },
  {
    path: '/signup/teacher',
    name: 'TeacherSignUp',
    component: () => import('@/views/TeacherSignUp.vue'),
    meta: {},
  },
  {
    path: '/signup/student',
    name: 'StudentSignUp',
    component: () => import('@/views/StudentSignUp.vue'),
    meta: {},
  },

  //
  {
    path: '/examchannel',
    name: 'ExamChannelTeacher',
    component: () => import('@/views/Teacher/ExamChannelTeacher.vue'),
    meta: { authorize: ['teacher'] },
  },
  {
    path: '/examchannel/new-channel',
    name: 'NewChannelTeacher',
    component: () => import('@/views/Teacher/NewChannelTeacher.vue'),
    meta: { authorize: ['teacher'] },
  },
  {
    path: '/examchannel/:cid',
    name: 'InsideChannelTeacher',
    component: () => import('@/views/Teacher/InsideChannelTeacher.vue'),
    meta: { authorize: ['teacher'] },
  },
  {
    path: '/examchannel/:cid/member',
    name: 'MemberChannel',
    component: () => import('@/views/Teacher/MemberChannel.vue'),
    meta: { authorize: ['teacher'] },
  },
  {
    path: '/examchannel/:cid/summary',
    name: 'ExamSummary',
    component: () => import('@/views/Teacher/ExamSummary.vue'),
    meta: { authorize: ['teacher', 'TA'] },
  },
  {
    path: '/examchannel/:cid/member/:mid/feedback',
    name: 'GradeStudentExam',
    component: () => import('@/views/Teacher/GradeStudentExam.vue'),
    meta: { authorize: ['teacher', 'TA'] },
  },
  {
    path: '/examchannel/:cid/questions/:ecid/score-exam',
    name: 'ScoreExamPage',
    component: () => import('@/views/Teacher/ScoreExamPage.vue'),
    meta: { authorize: ['teacher'] },
  },
  {
    path: '/yourexam',
    name: 'YourExam',
    component: () => import('@/views/Teacher/YourExam.vue'),
    meta: { authorize: ['teacher'] },
  },
  {
    path: '/yourexam/new-exam',
    name: 'NewExam',
    component: () => import('@/views/Teacher/NewExam.vue'),
    meta: { authorize: ['teacher'] },
  },
  {
    path: '/yourexam/:eid',
    name: 'InsideYourExam',
    component: () => import('@/views/Teacher/InsideYourExam.vue'),
    meta: { authorize: ['teacher'] },
  },
  {
    path: '/yourexam/edit-exam',
    name: 'EditExam',
    component: () => import('@/views/Teacher/EditExam.vue'),
    meta: { authorize: ['teacher'] },
  },
  {
    path: '/examhub',
    name: 'ExamHubTeacher',
    component: () => import('@/views/Teacher/ExamHubTeacher.vue'),
    meta: { authorize: ['teacher', 'student'] },
  },
  {
    path: '/examhub/:eid',
    name: 'Examhub',
    component: () => import('@/views/Examhub.vue'),
    meta: { authorize: ['teacher', 'student'] },
  },
  {
    path: '/examchannelstudent',
    name: 'ExamChannelStudent',
    component: () => import('@/views/Student/ExamChannelStudent.vue'),
    meta: { authorize: ['student'] },
  },
  {
    path: '/examchannel/:cid/OnExam',
    name: 'ExamChannelOnExam',
    component: () => import('@/views/Student/ExamChannelOnExam.vue'),
    meta: { authorize: ['student'] },
  },
  {
    path: '/examchannel/:cid/lobby',
    name: 'ExamChannelLobby',
    component: () => import('@/views/Student/ExamChannelLobby.vue'),
    meta: { authorize: ['student'] },
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;

  if (authorize) {
    const token = auth.getToken();
    if (token === '') {
      // not logged in so redirect to login page with the return url
      return next({ path: '/login', query: { returnUrl: to.path } });
    }
    const decoded = jwtDecode(token);

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(decoded.type)) {
      // role not authorised so redirect to home page
      if (!authorize.includes('TA')) {
        return next({ path: '/' });
      }
    }
    if (authorize.includes('TA')) {
      api.isTA(to.params.cid).then((e) => {
        if (e.data.isTA === false) {
          return next({ path: '/' });
        }
      });
    }
  }

  return next();
});

const DEFAULT_TITLE = 'JustExam';
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
