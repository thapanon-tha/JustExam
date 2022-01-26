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
    path: '/aboutus',
    name: 'AboutUs',
    component: () => import('@/views/AboutUs.vue'),
  },
  {
    path: '/tour',
    name: 'TakeATour',
    component: () => import('@/views/TakeATour.vue'),
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
