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
    component: () => import('@/views/Login.vue'),
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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  // {
  //   path: '/textEditer',
  //   name: 'About',
  //   component: () => import('@/views/TextEditer.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
