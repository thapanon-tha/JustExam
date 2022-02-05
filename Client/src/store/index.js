import Vue from 'vue';
import Vuex from 'vuex';
import auth from '../services/authentications';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isStudent: false,
    isTeacher: false,
    isAuth: false,
  },
  getters: {
    getIsStudent(state) {
      return state.isStudent;
    },
    getIsTeacher(state) {
      return state.isTeacher;
    },
    getIsAuth(state) {
      return state.isAuth;
    },
  },
  mutations: {
    SET_IS_AUTH(state, value) {
      state.isAuth = value;
    },
    SET_IS_TEACHER(state, value) {
      state.isTeacher = value;
    },
    SET_IS_STUDENT(state, value) {
      state.isAuth = value;
    },
  },
  actions: {
    restoreLogin({ commit }) {
      // if token not found that mean is not auth yet
      if (auth.getToken() === '') {
        commit('SET_IS_AUTH', false);
        return;
      }

      // if role not found that mean is not auth yet
      if (auth.getRole() === '') {
        commit('SET_IS_AUTH', false);
        return;
      }

      // User is student
      if (auth.getToken() && auth.getRole() === 'STUDENT') {
        commit('SET_IS_AUTH', true);
        commit('SET_IS_STUDENT', true);
        return;
      }

      // User is teacher
      if (auth.getToken() && auth.getRole() === 'TEACHER') {
        commit('SET_IS_AUTH', true);
        commit('SET_IS_TEACHER', true);
      }
    },
    doLogout({ commit }) {
      auth.removeToken();
      auth.removeRole();
      commit('SET_IS_AUTH', false);
      commit('SET_IS_TEACHER', false);
      commit('SET_IS_STUDENT', false);
    },
  },
});
